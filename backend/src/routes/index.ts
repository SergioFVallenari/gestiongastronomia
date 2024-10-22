import { Router } from 'express'
import routeArticulos from './articulo.routes'
const app = Router()

app.use('/articulos', routeArticulos)

export default app