import {Request, Response, Router } from 'express'
import axios from 'axios'
import classArticulos from '../class/class_articulos'
const {crearArticulo, getArticulos} = new classArticulos()

const app = Router()

app.post('/alta_articulos', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const response = await crearArticulo(body)
        res.status(200).json(
            {
                info: true,
                msg: "Articulo creado",
                content: response
            }
        )
    } catch (error) {
        
    }

});
app.get('/get_articulos', async (req: Request, res: Response) => {
    try {
        const response = await getArticulos()
        res.status(200).json(
            {
                info: true,
                msg: "Articulos",
                content: response
            })
    } catch (error) {
        
    }
});

export default app
