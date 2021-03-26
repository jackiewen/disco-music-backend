import UserModel, { IUser } from '@models/user.model';
import debug from 'debug';


const log: debug.IDebugger = debug('app:in-memory-dao');

class UserDao {
    private static instance: UserDao;
    users: Array<IUser> = [];

    constructor() {
        log('Create new instance of UsersDao');
    }

    static getInstance(): UserDao {
        if (!UserDao.instance) {
            UserDao.instance = new UserDao();
        }
        return UserDao.instance;
    }

    async getUsers(limit: number, page: number, filter = {}) {
        return await UserModel.paginate(limit, page, filter);
    }

    async addUser(user: IUser) {
        const userModel = new UserModel(user);
        userModel.save(function(err: any): any {
            if (err) return false;
        });
        return userModel._id;
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex((obj: { email: string; }) => obj.email === email);
        let currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default UserDao.getInstance();