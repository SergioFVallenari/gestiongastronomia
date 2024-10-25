import { Router, Response, Request } from 'express';
import classCarta from '../class/class_carta';
const { alta_carta } = new classCarta();

const router = Router();

router.post('/alta_carta', async (req: Request, res: Response) => {
    const body = req.body;
    try {
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

export default router;