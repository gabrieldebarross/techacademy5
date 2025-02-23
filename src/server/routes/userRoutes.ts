import { Router } from 'express';
import { UserController } from '../../controllers/usuarios/UserController';
import { check } from 'express-validator';

const routerUser = Router();

routerUser.get('/user/all', UserController.getAllUsers);

routerUser.post('/user/login', [
    check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  check('name').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UserController.createUser);

routerUser.get('/user', UserController.getUsersWithFilters);
routerUser.delete('/user/delete', UserController.deleteUser);
routerUser.put('/user/update/:id', UserController.updateUser);

export { routerUser };