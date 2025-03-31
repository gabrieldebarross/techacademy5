"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./routes/userRoutes");
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const priorityRoutes_1 = __importDefault(require("./routes/priorityRoutes"));
const server = (0, express_1.default)();
exports.server = server;
server.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
server.options('*', (0, cors_1.default)());
server.use(express_1.default.json());
server.use(userRoutes_1.routerUser);
server.use(categoryRoutes_1.default);
server.use(taskRoutes_1.default);
server.use(commentRoutes_1.default);
server.use(priorityRoutes_1.default);
