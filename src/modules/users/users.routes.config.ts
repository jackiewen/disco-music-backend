import express from 'express';
import { CommonRoutesConfig } from '@common/common.routes.config';
import UsersController from '@users/controllers/users.controller';
import UsersMiddleware from '@users/middleware/users.middleware';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoute');
    }
    configRoutes() {
        this.app.route(`/users`)
            .get(UsersController.listUsers)
            .post(UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser);

        return this.app;
    }
}