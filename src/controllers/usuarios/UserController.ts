import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { UserModel } from '../../database/models/UserModel';

export class UserController {
  static async create(req: Request, res: Response): Promise<void> {
    
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ erros: erros.array() });
      return;
    }

    const { name, email, password } = req.body;

    try {

      const userExists = await UserModel.emailIsRegistered(email);
      if (userExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ mensagem: 'Já existe usuário cadastrado com esse e-mail' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10); 

      const newUser = await UserModel.createUser(name, email, passwordHash);

      res.status(StatusCodes.CREATED).json({
        mensagem: 'Usuário criado com sucesso',
        usuario: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
      });
    } catch (erro) {
      console.error(erro);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        mensagem: 'Erro ao criar o usuário', erro
      });
    }
  }
}
