import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { check } from 'express-validator';
import { authMiddleware } from '../../middleware/authMiddleware';

const routerUser = Router();

routerUser.post('/user/login', UserController.Login);
routerUser.post('/user', [
    check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  check('name').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UserController.createUser);


routerUser.get('/user', authMiddleware, UserController.getUsersWithFilters);
routerUser.get('/user', authMiddleware, UserController.getAllUsers);


routerUser.delete('/user/', authMiddleware, UserController.deleteUser);
routerUser.put('/user/:id', authMiddleware, UserController.updateUser);

export { routerUser };