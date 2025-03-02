import db from "../db";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import path from 'path';
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
            req.query.token = token;
          next();  // Llama a `next()` para permitir el acceso a la siguiente función o ruta
        }
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

export const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/donfaustino-5039d47db9f6.json')
});

export const upload = (bucketName: string) => {
  const bucket = storage.bucket(bucketName);
  const multe = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
  });

  return multe;
}