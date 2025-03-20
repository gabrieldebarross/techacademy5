import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { routerUser } from './routes/userRoutes';

const server = express();

server.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
server.options('*', cors());

server.use(express.json());
server.use(routerUser);


export { server };
