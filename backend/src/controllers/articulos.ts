import {Request, Response, Router } from 'express'
import axios from 'axios'
import classArticulos from '../class/class_articulos'
const {crearArticulo, getArticulos, bajaArticulo, getArticuloById, modificarArticulo} = new classArticulos()

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
app.post('/get_articulos', async (req: Request, res: Response) => {
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
app.get('/get_articulo/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const response = await getArticuloById(Number(id))
        res.status(200).json({
            info: true,
            msg: "Articulo",
            content: response
        })
    } catch (error) {
        
    }
});
app.delete('/baja_articulos', async (req: Request, res: Response) => {
    const {id} = req.body
    try {
        const response = await bajaArticulo(id)
        res.status(200).json({
                info: true,
                msg: "Articulo eliminado",
                content: response
            })
    } catch (error) {
        
    }
});
app.put('/modificar_articulo/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const cuerpoRequest = {
            id: Number(id),
            nombre: req.body.nombre,
            precio_costo: Number(req.body.precio_costo),
            precio_venta: Number(req.body.precio_venta),
            categoria_articulo: Number(req.body.categoria_articulo)
        }
        const response = await modificarArticulo(cuerpoRequest)
        console.log(response[0]);
        res.status(200).json({
            info: true,
            msg: "Articulo modificado",
            content: response
        })
    } catch (error) {
        
    }
});


export default app
