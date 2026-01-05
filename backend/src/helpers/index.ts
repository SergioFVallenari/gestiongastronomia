import db from "../db";
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { bucket } from "../lib/firebase";
import { v4 as uuid } from "uuid";
import sharp from "sharp";
import crypto from "crypto";
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
  keyFilename: path.join(__dirname, '../config/donfaustino-f89de133183f.json')
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uniqueName = (original: string) => {
  const ext = path.extname(original);
  const base = path.basename(original, ext).replace(/\s+/g, "_");
  return `${base}_${Date.now()}${ext}`;
};

const generateFileHash = (buffer: Buffer): string => {
  return crypto.createHash('md5').update(buffer).digest('hex');
};

const checkIfFileExists = async (hash: string): Promise<string | null> => {
  try {
    // Busca archivos con el hash en los metadatos
    const [files] = await bucket.getFiles({
      prefix: 'uploads/'
    });
    
    for (const file of files) {
      const [metadata] = await file.getMetadata();
      if (metadata.metadata?.fileHash === hash) {
        // Archivo encontrado, devolver la URL
        const token = metadata.metadata.firebaseStorageDownloadTokens;
        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${token}`;
      }
    }
    
    return null; // Archivo no encontrado
  } catch (error) {
    console.error('Error checking file existence:', error);
    return null;
  }
};

export const uploadToFirebase = async (file: Express.Multer.File): Promise<string> => {
  if (!file) throw new Error("No file uploaded");
  
  let processedBuffer = file.buffer;
  let contentType = file.mimetype;
  
  // Solo procesar con Sharp si es una imagen
  if (file.mimetype.startsWith('image/')) {
    processedBuffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer();
    contentType = 'image/webp';
  }
  
  // Generar hash del archivo procesado
  const fileHash = generateFileHash(processedBuffer);
  
  // Verificar si el archivo ya existe
  const existingUrl = await checkIfFileExists(fileHash);
  if (existingUrl) {
    console.log(`Archivo ya existe, devolviendo URL existente: ${existingUrl}`);
    return existingUrl;
  }
  
  // El archivo no existe, subirlo
  const dest = `uploads/${fileHash}_${uniqueName(file.originalname)}`;
  const gcsFile = bucket.file(dest);
  const token = uuid();

  await gcsFile.save(processedBuffer, {
    contentType: contentType,
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=3600",
      metadata: {
        firebaseStorageDownloadTokens: token,
        fileHash: fileHash, // Guardar el hash en los metadatos
        originalName: file.originalname,
        uploadDate: new Date().toISOString(),
      },
    },
  });

  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(dest)}?alt=media&token=${token}`;
  console.log(`Nuevo archivo subido: ${publicUrl}`);
  return publicUrl;
};

export const skuVerify = async (sku: string) => {
  const skuList = await spGeneral("donfaustino_get_sku_list()", []);
  const skuExists = skuList.some((item: any) => item.sku === sku);
  return skuExists;
}
