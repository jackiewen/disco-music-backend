import UserModel, { IUser } from '@models/user.model';
import debug from 'debug';


const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
    private static instance: UsersDao;

    constructor() {
        log('Create new instance of UsersDao');
    }

    static getInstance(): UsersDao {
        if (!UsersDao.instance) {
            UsersDao.instance = new UsersDao();
        }
        return UsersDao.instance;
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
        let currentUser = await UserModel.findOne({ email: email }).exec();
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
}

export default UsersDao.getInstance();