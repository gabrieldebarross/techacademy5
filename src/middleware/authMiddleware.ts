import { NextFunction, Request, Response } from "express";
import AuthUtils from "../utils/authUtils";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Acesso negado',
            error: 'Token não encontrado'
        });
        return;
    }

    try {
        const decoded = await AuthUtils.verifyToken(token);
        req.body.user = decoded.user;
        console.log("Token válido! Usuário autenticado:", decoded.payloadUser);
        return next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Acesso negado',
            error: 'Token inválido'
        });
        return;
    }
};
