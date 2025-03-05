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
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const UserModel_1 = require("../../database/models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield UserModel_1.UserModel.emailIsRegistered(email);
                if (!user) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        message: 'Usuário não encontrado'
                    });
                    return;
                }
                const passwordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!passwordValid) {
                    res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        message: 'Senha inválida'
                    });
                    return;
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: 'Usuário Logado com sucesso',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
            catch (erro) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Erro ao realizar o login',
                    error: erro
                });
            }
        });
    }
}
exports.AuthController = AuthController;
