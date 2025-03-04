import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { routerUser } from './routes/userRoutes';

const server = express();

server.use(express.json());
server.use(routerUser);
server.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

export { server };
