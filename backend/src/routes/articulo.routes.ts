import { Router } from "express";
import controllerArticulos, { getArticuloByIdController, getArticulosController } from "../controllers/articulos";

const app = Router();
app.use("/", controllerArticulos);
app.use("/get_articulos", getArticulosController);
app.use("/get_articulo/:id", getArticuloByIdController);
export default app;