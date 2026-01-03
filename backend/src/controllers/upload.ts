import {Request, Response} from 'express';
import { uploadToFirebase } from '../helpers/index';


export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file: any = req.file;
    const publicUrl = await uploadToFirebase(file);

    res.status(200).json({
      message: "File uploaded successfully",
      url: publicUrl
    });
  } catch (error: any) {
    console.error("Error en uploadFile:", error);
    res.status(500).json({
      message: "Error uploading file",
      error: error.message
    });
  }
};