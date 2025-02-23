import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { UserModel } from '../../database/models/UserModel';

export class UserController {
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

      const passwordHash = await bcrypt.hash(password, 10); 

      const newUser = await UserModel.createUser(name, email, passwordHash);

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
      
      if(erro instanceof Error){
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

  static async getAllUsers(req: Request, res: Response): Promise<void>{
    try {
      const users = await UserModel.findAll({
        attributes: { exclude: ['password'] }
      });

      res.status(StatusCodes.OK).json(users);
    } catch(erro: unknown){
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

  static async updateUser(req: Request, res: Response): Promise<any>{
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await UserModel.findByPk(id);

      if(!user){
        res.status(StatusCodes.NOT_FOUND).json({
          message: 'Usuário não encontrado'
        })
      }

      const emailExist = await UserModel.emailIsRegistered(email);

      if(emailExist){
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Já possui um usuário cadastrado com esse email'
        })
      }
      const validUser = user as NonNullable<typeof user>;

      let passwordHash = user!.password;
      passwordHash = await bcrypt.hash(password, 10);

      validUser.name = name || validUser.name;
      validUser.email = email || validUser.email;
      validUser.password = passwordHash;


      await validUser.save();

      res.status(StatusCodes.OK).json({
        message: 'Usuário atuilizado com sucesso'
      })
    } catch (erro) {
      console.log(erro);
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<any>{
    const { id } = req.query;
    const userId = Number(id);

    if(isNaN(userId)){
      return res.send(StatusCodes.BAD_REQUEST).json({
        message: 'ID inválido'
      })
    }

    try {
    const userDelete = await UserModel.destroy({
      where: { id: userId}
    });

    if(userDelete === 0){
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
