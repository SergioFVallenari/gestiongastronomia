import {Request, Response, Router} from 'express'
import Ingresos from '../class/class_ingresos'
const {altaIngreso, getIngresos, getIngresoById, getListaByModulo} = new Ingresos()
const app = Router()

app.post('/alta_ingreso', async (req: Request, res: Response) => {
    const {body, costo_total} = req.body
    try {
        const ingresos = JSON.stringify(body)
        console.log(ingresos)   
        const response = await altaIngreso(ingresos, costo_total)
        res.status(200).json(
            {
                info: true,
                msg: "Stock Actualizado",
                content: response
            }
        )
    } catch (error) {
        
    }
});
app.post('/get_ingresos', async (req: Request, res: Response) => {
    try {
        const response = await getIngresos()
        res.status(200).json(
            {
                info: true,
                msg: "Ingresos",
                content: response
            })
    } catch (error) {
        
    }
});
app.get('/get_ingreso/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const response = await getIngresoById(Number(id))
        res.status(200).json({
            info: true,
            msg: "Ingreso",
            content: response
        })
    } catch (error) {
        
    }
});
app.post('/lista_modulos', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const response = await getListaByModulo(body)
        res.status(200).json({
            info: true,
            msg: "Modulos",
            content: response
        })
    } catch (error) {
        
    }
});

export default app