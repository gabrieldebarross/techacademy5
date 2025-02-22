import { Router } from 'express';
import { UserController } from '../../controllers/usuarios/UserController';
import { check } from 'express-validator';

const router = Router();

router.post('/users', [
    check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  check('name').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UserController.create);

export { router };