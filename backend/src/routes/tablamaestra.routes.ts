import { Router } from "express";
import controllerTablaMaestra from "../controllers/tabla_maestra";

const app = Router();
app.use("/", controllerTablaMaestra);

export default app;