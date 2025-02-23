import express from 'express';
import 'dotenv/config';

import { routerUser } from './routes/userRoutes';

const server = express();

server.use(express.json());
server.use(routerUser);

export { server };
