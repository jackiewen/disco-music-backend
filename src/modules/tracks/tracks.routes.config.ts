import express from 'express';
import { CommonRoutesConfig } from '@common/common.routes.config';

export class SongsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SongsRoutes');
    }
    configRoutes() {
        this.app.route(`/tracks`);
        return this.app;
    }
}