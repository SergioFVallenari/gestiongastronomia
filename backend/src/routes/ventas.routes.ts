import { Router } from 'express'
import controllerVentas from '../controllers/ventas'
const app = Router()

app.use("/", controllerVentas)

export default app