import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
const googleCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS || '../config/donfaustino-1fd39-b826efafbb94.json';


initializeApp({
  credential: cert(require(path.join(__dirname,'../lib/donfaustino-1fd39-b826efafbb94.json'))),
  storageBucket: "donfaustino-1fd39.firebasestorage.app",
});

export const bucket = getStorage().bucket();
