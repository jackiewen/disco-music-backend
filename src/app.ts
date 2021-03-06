import express from 'express';
import * as http from 'http';
import * as bodyparse from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from '@common/common.routes.config';
import { UsersRoutes } from '@users/users.routes.config';
import { SongsRoutes } from '@songs/songs.routes.config';
import debug from 'debug';

import * as db from '@common/db.config';
import Locale from '@common/locale.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 5000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

Locale.init();

db.connect();

app.use(bodyparse.json());
app.use(cors());
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

routes.push(
    new UsersRoutes(app),
    new SongsRoutes(app)
);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.get('/', (req: express.Request, res: express.Response,) => {
    res.status(200).send(`Server up and running!`);
});

server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    })
});