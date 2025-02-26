import { Router, Response, Request } from 'express';
import classCarta from '../class/class_carta';
const { alta_carta, get_carta, get_carta_by_id,delete_carta, update_carta } = new classCarta();

const router = Router();

router.post('/alta_carta', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        console.log(body);
        const response:any = await alta_carta(body);
        res.status(200).json(
            {
                info: true,
                msg: "Carta creada",
                content: response.msg
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                info: false,
                msg: "Error al crear la carta",
                content: null
            }
        )
    }
});
router.get('/get_carta', async (req: Request, res: Response) => {
    try {
        const response:any = await get_carta();
        res.status(200).json(
            {
                info: true,
                msg: "Carta obtenida",
                content: response
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                info: false,
                msg: "Error al obtener la carta",
                content: null
            }
        )
    }
});
router.get('/get_carta_by_id/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const response:any = await get_carta_by_id(id);
        res.status(200).json(
            {
                info: true,
                msg: "Carta obtenida",
                content: response
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                info: false,
                msg: "Error al obtener la carta",
                content: null
            }
        )
    }
});
router.delete('/delete_carta', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        console.log(body);
        const response:any = await delete_carta(body);
        res.status(200).json(
            {
                info: true,
                msg: "Carta eliminada",
                content: response.msg
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                info: false,
                msg: "Error al eliminar la carta",
                content: null
            }
        )
    }
});
router.put('/update_carta', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        console.log(body);
        const response:any = await update_carta(body);
        res.status(200).json(
            {
                info: true,
                msg: "Carta actualizada",
                content: response.msg
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                info: false,
                msg: "Error al actualizar la carta",
                content: null
            }
        )
    }
})

export default router;