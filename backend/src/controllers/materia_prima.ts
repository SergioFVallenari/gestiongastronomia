import { Request, Response, Router } from 'express'
import MateriaPrima from '../class/class_materia_prima';
const { altaMateriaPrima, getMateriaPrima, getMateriaPrimaById } = new MateriaPrima()
const app = Router()

app.post('/alta_materia_prima', async (req: Request, res: Response) => {
    const body = req.body
    try {
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
export default app;