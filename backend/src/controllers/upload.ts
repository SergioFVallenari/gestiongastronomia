import { Router, Request, Response } from "express";
import { storage, upload } from "../helpers";
import dotenv from 'dotenv';
dotenv.config();
const bucketName = process.env.BUCKETNAME ? process.env.BUCKETNAME : "";

const router = Router();


router.post("/upload_file", upload(bucketName).single("file"), async (req: Request, res: Response): Promise<void> => {
    try {
      const file: any = req.file;
      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
  
      const bucket = storage.bucket(bucketName);
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });
  
      blobStream.on("error", (err) => {
        console.error("Error al subir el archivo:", err);
        res.status(500).json({ message: "Error uploading file", error: err.message });
      });
  
      blobStream.on("finish", async () => {
        try {
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
  
          res.status(200).json({ message: "File uploaded successfully", url: publicUrl });
        } catch (error: any) {
          console.error("Error al hacer el archivo público:", error);
          res.status(500).json({ message: "File uploaded, but could not be made public", error: error.message });
        }
      });
  
      blobStream.end(file.buffer);
    } catch (error: any) {
      console.error("Error general:", error);
      res.status(500).json({ message: "Error uploading file", error: error.message });
    }
  });
  
  export default router;
  