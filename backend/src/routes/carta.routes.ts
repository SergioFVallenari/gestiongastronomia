import { Router } from "express";
import controllerCarta from "../controllers/carta";
const app = Router();
app.use("/", controllerCarta);
export default app;