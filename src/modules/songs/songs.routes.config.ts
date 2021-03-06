import express from 'express';
import { CommonRoutesConfig } from '@common/common.routes.config';
import SongsController from '@songs/controllers/song.controller';

export class SongsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SongsRoutes');
    }
    configRoutes() {
        this.app.route(`/songs`)
        .get(SongsController.listSongs);
        
        return this.app;
    }
}