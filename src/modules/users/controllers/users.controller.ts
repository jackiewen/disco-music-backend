import express from 'express';
import usersService from '@users/services/users.service';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

interface abc {
    page: any,
    query: any
}

class UsersController {
    private static instance: UsersController;

    static getInstance(): UsersController {
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }

    async listUsers(req: express.Request, res: express.Response) {
        const {page, ...query} = req.query;
        console.log(page, query);
        const pageNum = parseInt(page?.toString() || '0');
        const users = await usersService.list(100, pageNum, query);
        res.status(200).send(users);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersService.create(req.body);
        res.status(201).send({id: userId});
    }
}

export default UsersController.getInstance();