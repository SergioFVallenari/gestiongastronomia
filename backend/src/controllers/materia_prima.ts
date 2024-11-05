import { Request, Response, Router } from 'express'
import MateriaPrima from '../class/class_materia_prima';
const { altaMateriaPrima, getMateriaPrima, getMateriaPrimaById, listaIngredientes, bajaMateriaPrima, modificaMateriaPrima,calcularCosto } = new MateriaPrima()
const app = Router()

app.post('/alta_materia_prima', async (req: Request, res: Response) => {
    const body = req.body
    try {
        console.log(body)
        const response = await altaMateriaPrima(body)
        res.status(200).json(
            {
                info: true,
                msg: "Materia Prima creada",
                content: response
            }
        )
    } catch (error) {

    }
});
app.post('/get_materia_prima', async (req: Request, res: Response) => {
    try {
        const response = await getMateriaPrima()
        res.status(200).json(
            {
                info: true,
                msg: "Materia Prima obtenida",
                content: response
            }
        )
    } catch (error) {

    }
});
app.get('/get_materia_prima/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await getMateriaPrimaById(Number(id))
        res.status(200).json(
            {
                info: true,
                msg: "Materia Prima obtenida",
                content: response
            }
        )
    } catch (error) {

    }
});
app.get('/lista_ingredientes', async (req: Request, res: Response) => {
    try {
        const response = await listaIngredientes()
        res.status(200).json(
            {
                info: true,
                msg: "Ingredientes obtenidos",
                content: response
            }
        )
    } catch (error) {

    }
});
app.put('/baja_materia_prima', async (req: Request, res: Response) => {
    const { id }  = req.body
    try {
        const response = await bajaMateriaPrima(id)
        res.status(200).json(
            {
                info: true,
                msg: "Materia Prima dada de baja",
                content: response
            }
        )
    } catch (error) {

    }
});
app.put('/modificar_materia_prima/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const body = req.body
    try {
        const bodySp = { 
            id: Number(id),
            nombre: body.nombre,
            precio_costo: body.precio_costo,
            categoria_materia_prima: Number(body.categoria_materia_prima),
            peso_gramos: body.peso_gramos
        }
        const response = await modificaMateriaPrima(bodySp)
        res.status(200).json(
            {
                info: true,
                msg: "Materia Prima modificada",
                content: response
            })
    } catch (error) {

    }
});
app.post('/calcular_precio_costo', async (req: Request, res: Response) => {
    try {
        const json_ingredientes = {
            json_ingredientes: req.body.json_ingredientes
        }
        const response = await calcularCosto(json_ingredientes)
        res.status(200).json(
            {
                info: true,
                msg: "Precio calculado",
                content: response
            }
        )
    } catch (error) {

    }
})
export default app;