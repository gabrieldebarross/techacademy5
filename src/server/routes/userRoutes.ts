import { Router } from 'express';
import { UserController } from '../../controllers/usuarios/UserController';
import { check } from 'express-validator';

const routerUser = Router();

routerUser.post('/user', [
    check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  check('name').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UserController.createUser);

routerUser.post('/user/login', UserController.Login);

routerUser.get('/user', UserController.getUsersWithFilters);
routerUser.get('/user', UserController.getAllUsers);


routerUser.delete('/user/', UserController.deleteUser);
routerUser.put('/user/:id', UserController.updateUser);

export { routerUser };