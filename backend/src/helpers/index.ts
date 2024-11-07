import db from "../db";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';

export const spGeneral = async (sp: string, params: any[]) => {
  try {
    return await db.db.query(`call ${sp}`, { replacements: params, raw: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const masajeo = (objeto: any) => {
    let objetoRetornado: any = {};
    Object.entries(objeto).map((value: any) => {
      objetoRetornado[`x${value[0]}`] = value[1];
    });
    return objetoRetornado;
  };

  export const verifyToken = (req: Request, res: Response, next: NextFunction):void => {
    const token:any = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);  // Verifica el token con la clave secreta
        if (decoded) {
          next();  // Llama a `next()` para permitir el acceso a la siguiente función o ruta
        }
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};