import { Router } from 'express';
import { UsuarioControlador } from '../../controllers/usuarios/UsuarioControlador';
import { check } from 'express-validator';

const router = Router();

router.post('/usuarios', [
    check('email').isEmail().withMessage('Email inválido'),
  check('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  check('nome').not().isEmpty().withMessage('O nome não pode estar vazio'),
], UsuarioControlador.criar);

export { router };