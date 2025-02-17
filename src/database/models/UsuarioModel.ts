import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../connection';

interface AtributosUsuarios {
    id: number,
    nome: string,
    email: string,
    senha: string
}

interface AtributosCriacaoUsuario extends Optional<AtributosUsuarios, 'id'> { };

export class UsuarioModel extends Model<AtributosUsuarios, AtributosCriacaoUsuario> implements AtributosUsuarios {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;

    static async emailEstaCadastrado(email: string): Promise<UsuarioModel | null> {
        return await UsuarioModel.findOne({
            where: {
                email
            }
        })
    }

    static async criarUsuario(nome: string, email: string, senha: string): Promise<UsuarioModel> {
        const bcrypt = require('bcryptjs');
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        return await UsuarioModel.create({
            nome,
            email,
            senha: senhaCriptografada,
        });
    }
}

UsuarioModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Formato de email inválido' },
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },
    {
        sequelize,
        tableName: 'usuarios',
        timestamps: false,
    } 
);