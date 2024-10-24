import { Router } from "express";
import controllerIngresos from "../controllers/ingresos";
const app = Router();
app.use("/", controllerIngresos);

export default app;