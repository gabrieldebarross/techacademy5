"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const userRoutes_1 = require("./routes/userRoutes");
const server = (0, express_1.default)();
exports.server = server;
server.use(express_1.default.json());
server.use(userRoutes_1.routerUser);
