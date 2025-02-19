import { Router } from "express";
import controllerCcorriente from "../controllers/ccorriente";
const app = Router();
app.use('/', controllerCcorriente);
export default app;