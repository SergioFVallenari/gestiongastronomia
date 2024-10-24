import { Router } from "express";
import controllerMateriaPrima from "../controllers/materia_prima";
const app = Router();
app.use("/", controllerMateriaPrima);

export default app;