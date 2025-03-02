import { Request, Response, Router } from "express";
const app = Router();
import classVentas from '../class/class_ventas'
import { decodeToken } from "../helpers";
const  {insertVenta, manejoStock,getVentas} = new classVentas()

app.post('/insert_venta', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const decoded = decodeToken(req.query.token as string)
        console.log(decoded)
        if (typeof decoded !== 'string' && decoded?.id) {
            body.id = decoded.id;
        }
        const response:any = await insertVenta(body)
        await manejoStock(body, response[0]?.idventa)
        res.status(200).json({
            info: true,
            msg: "Venta",
            content: response
        })
    } catch (error) {
        
    }
});
app.post('/get_ventas', async (req: Request, res: Response) => {
    try {
        const response = await getVentas()
        console.log(response)
        res.status(200).json({
            info: true,
            msg: "Ventas",
            content: response
        })
    } catch (error) {
        
    }
});
export default app;
