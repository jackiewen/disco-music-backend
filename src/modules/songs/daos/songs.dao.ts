import SongModel, { ISong } from '@models/song.model';
import debug from 'debug';

const log: debug.IDebugger = debug('app:songs-dao');

class SongsDao {
    private static instance: SongsDao;

    constructor() {
        log('Create new instance of SongsDao');
    }

    static getInstance(): SongsDao {
        if (!SongsDao.instance) {
            SongsDao.instance = new SongsDao();
        }
        return SongsDao.instance;
    }

    async getSongs(limit: number, page: number, filter = {}) {
        return await SongModel.paginate(limit, page, filter);
    }

    async addSong(song: ISong) {
        const songModel = new SongModel(song);
        songModel.save(function(err: any): any {
            if (err) return false;
        });
        return songModel._id;
    }
}

export default SongsDao.getInstance();