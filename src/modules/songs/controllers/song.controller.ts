import express from 'express';
import songsDao from '@songs/daos/songs.dao';
import debug from 'debug';

const log: debug.IDebugger = debug('app:songs-controller');

class SongsController {
    private static instance: SongsController;

    static getInstance(): SongsController {
        if (!SongsController.instance) {
            SongsController.instance = new SongsController();
        }
        return SongsController.instance;
    }

    async listSongs(req: express.Request, res: express.Response) {
        const {page, ...query} = req.query;
        const pageNum = parseInt(page?.toString() || '0');
        const songs = await songsDao.getSongs(100, pageNum, query);
        res.status(200).send(songs);
    }

    async createSong(req: express.Request, res: express.Response) {
        const songId = await songsDao.addSong(req.body);
        res.status(201).send({ id: songId});
    }
}

export default SongsController.getInstance();