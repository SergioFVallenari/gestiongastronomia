import { Router } from 'express'
import routeArticulos from './articulo.routes'
import routeIngresos from './ingresos.routes'
import routeMateriaPrima from './materia_prima.routes'
import routeCarta from './carta.routes'
import routeTabla from './tablamaestra.routes'
const app = Router()

app.use('/articulos', routeArticulos)
app.use('/ingresos', routeIngresos)
app.use('/materia_prima', routeMateriaPrima)
app.use('/carta', routeCarta)
app.use('/tabla', routeTabla)

export default app