import { Router, Request, Response } from "express";
import classCuentaCorriente from "../class/class_ccorriente";
const { alta_ccorriente, get_ccorriente, get_ccorriente_by_id, delete_ccorriente } = new classCuentaCorriente();
const router = Router();
router.post('/insert_ccorriente', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const response: any = await alta_ccorriente(body);
        res.status(200).json({
            info: true,
            msg: "Cuenta corriente actualizada",
            content: response.msg
        });
    } catch (error) {
        res.status(400).json({
            info: false,
            msg: "Error al crear la cuenta corriente",
            content: null
        });
    }
});
export default router;