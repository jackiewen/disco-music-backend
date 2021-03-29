import express from 'express';
import usersDao from '@users/daos/users.dao';
import argon2 from 'argon2';
import debug from 'debug';
import { getLang } from '@common/locale.config';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
    private static instance: UsersController;

    static getInstance(): UsersController {
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }

    async listUsers(req: express.Request, res: express.Response) {
        console.log(getLang('validate:required'));
        const {page, ...query} = req.query;
        const pageNum = parseInt(page?.toString() || '0');
        const users = await usersDao.getUsers(100, pageNum, query);
        res.status(200).send(users);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersDao.addUser(req.body);
        res.status(201).send({id: userId});
    }
}

export default UsersController.getInstance();