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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_validator_1 = require("express-validator");
const UserModel_1 = require("../../database/models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authUtils_1 = __importDefault(require("../../utils/authUtils"));
class UserController {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const SECRET_KEY = process.env.SECRET_KEY;
            try {
                const { email, password } = req.body;
                const user = yield UserModel_1.UserModel.findOne({ where: { email } });
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
                const token = yield authUtils_1.default.generateToken(user);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: 'Usuário Logado com sucesso',
                    token: token
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
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const erros = (0, express_validator_1.validationResult)(req);
            if (!erros.isEmpty()) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    erros: erros.array()
                });
                return;
            }
            const { name, email, password } = req.body;
            try {
                const userExists = yield UserModel_1.UserModel.emailIsRegistered(email);
                if (userExists) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        message: 'Já existe usuário cadastrado com esse e-mail'
                    });
                    return;
                }
                const newUser = yield UserModel_1.UserModel.createUser(name, email, password);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    message: 'Usuário criado com sucesso',
                    usuario: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                    }
                });
            }
            catch (erro) {
                console.error(erro);
                if (erro instanceof Error) {
                    if (erro.name === 'SequelizeUniqueConstraintError') {
                        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                            message: 'Já existe um usuário com este e-mail',
                        });
                    }
                    else {
                        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                            message: 'Erro ao criar o usuário',
                            erro: erro.message,
                        });
                    }
                }
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel_1.UserModel.findAll({
                    attributes: { exclude: ['password'] }
                });
                res.status(http_status_codes_1.StatusCodes.OK).json(users);
            }
            catch (erro) {
                console.log(erro);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Erro ao buscar os usuários',
                    erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
                });
            }
        });
    }
    static getUsersWithFilters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email } = req.query;
                const whereConditions = {};
                if (id)
                    whereConditions.id = Number(id);
                if (name)
                    whereConditions.name = String(name);
                if (email)
                    whereConditions.email = String(email);
                const users = yield UserModel_1.UserModel.findAll({
                    where: whereConditions,
                    attributes: { exclude: ['password'] },
                });
                if (users.length === 0) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        message: 'Nenhum usuário foi encontrado com os filtros fornecidos',
                    });
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(users);
            }
            catch (erro) {
                console.log(erro);
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Erro ao buscar os usuários',
                    erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
                });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, password } = req.body;
                const user = yield UserModel_1.UserModel.findByPk(id);
                if (!user) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        message: 'Usuário não encontrado'
                    });
                }
                if (email) {
                    const emailExist = yield UserModel_1.UserModel.emailIsRegistered(email);
                    if (emailExist) {
                        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                            message: 'Já possui um usuário cadastrado com esse email'
                        });
                    }
                    user.email = email;
                }
                user.name = name || user.name;
                if (password) {
                    user.password = yield bcryptjs_1.default.hash(password, 10);
                }
                yield user.save();
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: 'Usuário atualizado com sucesso'
                });
            }
            catch (erro) {
                console.log(erro);
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Erro ao atualizar o usuário',
                    erro: erro instanceof Error ? erro.message : 'Erro desconhecido'
                });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const userId = Number(id);
            if (isNaN(userId)) {
                return res.send(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'ID inválido'
                });
            }
            try {
                const userDelete = yield UserModel_1.UserModel.destroy({
                    where: { id: userId }
                });
                if (userDelete === 0) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        message: 'Usuário não encontrado'
                    });
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: 'Usuário excluido com sucesso'
                });
            }
            catch (erro) {
                console.log(erro);
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: 'Erro ao excluir o usuário',
                    erro: erro instanceof Error ? erro.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.UserController = UserController;
