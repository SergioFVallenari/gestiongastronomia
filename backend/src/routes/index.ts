import { Router } from 'express'
import routeArticulos from './articulo.routes'
import routeIngresos from './ingresos.routes'
import routeMateriaPrima from './materia_prima.routes'
const app = Router()

app.use('/articulos', routeArticulos)
app.use('/ingresos', routeIngresos)
app.use('/materia_prima', routeMateriaPrima)

export default app