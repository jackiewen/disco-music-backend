import usersDao from '@users/daos/users.dao';
import { CRUD } from '@common/interfaces/crud.interface';
import { IUser } from '@models/user.model';

class UsersService implements CRUD {
    private static instance: UsersService;

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    async create(resource: IUser) {
        return await usersDao.addUser(resource);
    }

    async deleteById(resourceId: string) {
    }

    async list(limit: number, page: number, filter = {}) {
        return await usersDao.getUsers(limit, page, filter);
    }

    async patchById(resource: IUser) {
    }

    async readById(resourceId: string) {
    };

    async updateById(resource: IUser) {
    };

    async getUserByEmail(email: string) {
        return usersDao.getUserByEmail(email);
    }
}

export default UsersService.getInstance();