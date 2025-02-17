"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UsuarioControlador_1 = require("../../controllers/usuarios/UsuarioControlador");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/usuarios', [
    (0, express_validator_1.check)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.check)('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    (0, express_validator_1.check)('nome').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UsuarioControlador_1.UsuarioControlador.criar);
