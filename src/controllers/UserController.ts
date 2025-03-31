import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { UserModel } from '../database/models/UserModel';
import bcrypt from 'bcryptjs';
import authUtils from '../utils/authUtils';


export class UserController {
  static async Login(req: Request, res: Response): Promise<void> {
    const SECRET_KEY = process.env.SECRET_KEY;

    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: 'Usuário não encontrado'
        })
        return;
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Senha inválida'
        })
        return;
      }

      const token = await authUtils.generateToken(user)

      res.status(StatusCodes.OK).json({
        message: 'Usuário Logado com sucesso',
        token: token
      })

    } catch (erro) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao realizar o login',
        error: erro
      })
    }
  }
  static async createUser(req: Request, res: Response): Promise<void> {

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({
        erros: erros.array()
      });
      return;
    }

    const { name, email, password } = req.body;

    try {

      const userExists = await UserModel.emailIsRegistered(email);
      if (userExists) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Já existe usuário cadastrado com esse e-mail'
        });
        return;
      }
      const newUser = await UserModel.createUser(name, email, password);

      res.status(StatusCodes.CREATED).json({
        message: 'Usuário criado com sucesso',
        usuario: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
      });
    } catch (erro: unknown) {
      console.error(erro);

      if (erro instanceof Error) {
        if (erro.name === 'SequelizeUniqueConstraintError') {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Já existe um usuário com este e-mail',
          });
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Erro ao criar o usuário',
            erro: erro.message,
          });
        }
      }
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll({
        attributes: { exclude: ['password'] }
      });

      res.status(StatusCodes.OK).json(users);
    } catch (erro: unknown) {
      console.log(erro);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar os usuários',
        erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
      });
    }
  }

  static async getUsersWithFilters(req: Request, res: Response): Promise<any> {
    try {
      const {
        id,
        name,
        email
      } = req.query;

      const whereConditions: any = {};

      if (id) whereConditions.id = Number(id);
      if (name) whereConditions.name = String(name);
      if (email) whereConditions.email = String(email);

      const users = await UserModel.findAll({
        where: whereConditions,
        attributes: { exclude: ['password'] },
      });

      if (users.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Nenhum usuário foi encontrado com os filtros fornecidos',
        });
      }

      return res.status(StatusCodes.OK).json(users);

    } catch (erro) {
      console.log(erro);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar os usuários',
        erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
      });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      const user = await UserModel.findByPk(id);
  
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Usuário não encontrado'
        });
      }
  
      if (email) {
        const emailExist = await UserModel.emailIsRegistered(email);
  
        if (emailExist) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Já possui um usuário cadastrado com esse email'
          });
        }

        user.email = email;
      }
  
      user.name = name || user.name;

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
  
      return res.status(StatusCodes.OK).json({
        message: 'Usuário atualizado com sucesso'
      });
  
    } catch (erro) {
      console.log(erro);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao atualizar o usuário',
        erro: erro instanceof Error ? erro.message : 'Erro desconhecido'
      });
    }
  }
  

  static async deleteUser(req: Request, res: Response): Promise<any> {
    const { id } = req.query;
    const userId = Number(id);

    if (isNaN(userId)) {
      return res.send(StatusCodes.BAD_REQUEST).json({
        message: 'ID inválido'
      })
    }

    try {
      const userDelete = await UserModel.destroy({
        where: { id: userId }
      });

      if (userDelete === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Usuário não encontrado'
        })
      }

      res.status(StatusCodes.OK).json({
        message: 'Usuário excluido com sucesso'
      });

    } catch (erro) {
      console.log(erro);

      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Erro ao excluir o usuário',
        erro: erro instanceof Error ? erro.message : 'Erro desconhecido'
      })
    }
  }
}
