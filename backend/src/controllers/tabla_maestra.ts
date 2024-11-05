import { Request, Response, Router } from "express";
const app = Router();
import classTablaMaestra from '../class/class_tabla'
const {getListaByModulo, insertCategoria} = new classTablaMaestra()

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
app.post('/insert_categoria', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const response = await insertCategoria(body)
        res.status(200).json({
            info: true,
            msg: "Modulos",
            content: response
        })
    } catch (error) {
        
    }
});

export default app;