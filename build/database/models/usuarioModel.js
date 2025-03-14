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
exports.UsuarioModel = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
;
class UsuarioModel extends sequelize_1.Model {
    static emailEstaCadastrado(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UsuarioModel.findOne({
                where: {
                    email
                }
            });
        });
    }
    static criarUsuario(nome, email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const bcrypt = require('bcryptjs');
            const senhaCriptografada = yield bcrypt.hash(senha, 10);
            return yield UsuarioModel.create({
                nome,
                email,
                senha: senhaCriptografada,
            });
        });
    }
}
exports.UsuarioModel = UsuarioModel;
UsuarioModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Formato de email inválido' },
        },
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'usuarios',
    timestamps: false,
});
