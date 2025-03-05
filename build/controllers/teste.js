"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Criação de um hash de senha
const password = '123456';
const hash = await bcryptjs_1.default.hash(password, 10);
console.log("Hash gerado:", hash);
// Comparação de senha com o hash gerado
const isValid = await bcryptjs_1.default.compare('123456', hash);
console.log("Senha válida:", isValid);
