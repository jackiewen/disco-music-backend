import express from 'express';
import usersDao from '@users/daos/users.dao';

class UsersMiddleware {
    async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({error: `Missing required fields: email and/or password`});
        }
    }

    async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await usersDao.getUserByEmail(req.body.email);
        console.log('user', user);
        if (user) {
            res.status(400).send({error: `User email already exists`});
        } else {
            next();
        }
    }
}

export default new UsersMiddleware();