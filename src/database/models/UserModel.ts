import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../connection';
import bcrypt from 'bcryptjs';

interface AtributesUser {
    id: number,
    name: string,
    email: string,
    password: string
}

interface AtributesCreateUser extends Optional<AtributesUser, 'id'> { };

export class UserModel extends Model<AtributesUser, AtributesCreateUser> implements AtributesUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    static async createUser(name: string, email: string, password: string): Promise<UserModel> {
        const passwordEncripted = await bcrypt.hash(password, 10);

        return await UserModel.create({
            name,
            email,
            password: passwordEncripted,
        });
    }

    static async emailIsRegistered(email: string): Promise<UserModel | null> {
        return await UserModel.findOne({
            where: {
                email
            }
        })
    }
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    } 
);