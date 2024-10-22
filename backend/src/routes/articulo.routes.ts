import { Router } from "express";
import controllerArticulos from "../controllers/articulos";

const app = Router();
app.use("/", controllerArticulos);

export default app;