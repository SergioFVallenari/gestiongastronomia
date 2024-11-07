import { Router } from 'express'
import controllerAutorizacion from '../controllers/autorizacion'
const app = Router()

app.use('/', controllerAutorizacion)

export default app;