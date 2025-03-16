"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authUtils_1 = __importDefault(require("../utils/authUtils"));
const http_status_codes_1 = require("http-status-codes");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            message: 'Acesso negado',
            error: 'Token não encontrado'
        });
        return;
    }
    try {
        const decoded = yield authUtils_1.default.verifyToken(token);
        req.body.user = decoded.user;
        console.log("Token válido! Usuário autenticado:", decoded.payloadUser);
        return next();
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            message: 'Acesso negado',
            error: 'Token inválido'
        });
        return;
    }
});
exports.authMiddleware = authMiddleware;
