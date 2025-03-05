"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controllers/usuarios/UserController");
const express_validator_1 = require("express-validator");
const routerUser = (0, express_1.Router)();
exports.routerUser = routerUser;
routerUser.post('/user', [
    (0, express_validator_1.check)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    (0, express_validator_1.check)('name').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UserController_1.UserController.createUser);
routerUser.post('/user/login', UserController_1.UserController.Login);
routerUser.get('/user', UserController_1.UserController.getUsersWithFilters);
routerUser.get('/user', UserController_1.UserController.getAllUsers);
routerUser.delete('/user/', UserController_1.UserController.deleteUser);
routerUser.put('/user/:id', UserController_1.UserController.updateUser);
