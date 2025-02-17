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
exports.UsuarioControlador = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioModel_1 = require("../../database/models/usuarioModel");
class UsuarioControlador {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const erros = (0, express_validator_1.validationResult)(req);
            if (!erros.isEmpty()) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ erros: erros.array() });
                return;
            }
            const { nome, email, senha } = req.body;
            try {
                const usuarioExiste = yield usuarioModel_1.UsuarioModel.emailEstaCadastrado(email);
                if (usuarioExiste) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ mensagem: 'Já existe usuário cadastrado com esse e-mail' });
                    return;
                }
                const senhaHash = yield bcryptjs_1.default.hash(senha, 10);
                const novoUsuario = yield usuarioModel_1.UsuarioModel.criarUsuario(nome, email, senhaHash);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    mensagem: 'Usuário criado com sucesso',
                    usuario: {
                        id: novoUsuario.id,
                        nome: novoUsuario.nome,
                        email: novoUsuario.email,
                    }
                });
            }
            catch (erro) {
                console.error(erro);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    mensagem: 'Erro ao criar o usuário', erro
                });
            }
        });
    }
}
exports.UsuarioControlador = UsuarioControlador;
