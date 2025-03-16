import jwt from 'jsonwebtoken';
import { UserModel } from '../database/models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

class authUtils {
    static async generateToken(user: UserModel): Promise<string> {
        return jwt.sign({ user }, String(JWT_SECRET), { expiresIn: JWT_EXPIRES_IN });
    }

    static async verifyToken(token: string): Promise<any>{
        return new Promise((resolve, reject) => {
            jwt.verify(token, String(JWT_SECRET), (err, decoded) => {
                if(err){
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        })
    }
}

export default authUtils;