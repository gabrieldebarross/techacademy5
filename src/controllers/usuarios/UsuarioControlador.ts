import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../../database/models/usuarioModel';

export class UsuarioControlador {
  static async criar(req: Request, res: Response): Promise<void> {
    
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ erros: erros.array() });
      return;
    }

    const { nome, email, senha } = req.body;

    try {

      const usuarioExiste = await UsuarioModel.emailEstaCadastrado(email);
      if (usuarioExiste) {
        res.status(StatusCodes.BAD_REQUEST).json({ mensagem: 'Já existe usuário cadastrado com esse e-mail' });
        return;
      }

      const senhaHash = await bcrypt.hash(senha, 10); 

      const novoUsuario = await UsuarioModel.criarUsuario(nome, email, senhaHash);

      res.status(StatusCodes.CREATED).json({
        mensagem: 'Usuário criado com sucesso',
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
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
