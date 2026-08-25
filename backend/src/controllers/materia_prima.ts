import { Request, Response, Router } from 'express'
import MateriaPrima from '../class/class_materia_prima';
import { skuVerify } from '../helpers';
import axios from 'axios';
import xlsx from 'xlsx';
import { altaMateriaPrima, getMateriaPrima, getMateriaPrimaById } from '../services/materiaPrima.service';
import { checkSku } from '../services/general.service';
const { modificarMasivo, listaIngredientes, bajaMateriaPrima, modificaMateriaPrima,calcularCosto } = new MateriaPrima()
const app = Router()

app.post('/alta_materia_prima', async (req: Request, res: Response) => {
    const body = req.body
    try {
        console.log(body)
        const haySku = await checkSku(body.sku)
        if (haySku.exists) {
            throw new Error('El SKU ya existe')
        }
        const response = await altaMateriaPrima(body)
        res.status(200).json(
            {
                info: true,
                msg: "Materia Prima creada",
                content: response
            }
        )
    } catch (error:any) {
        res.status(409).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
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
    } catch (error:any) {
        res.status(409).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
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
                content: [response]
            }
        )
    } catch (error:any) {
        res.status(409).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
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
    } catch (error:any) {
        res.status(409).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
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
    } catch (error:any) {
        res.status(409).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
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
            peso_gramos: body.peso_gramos,
            json_ingredientes: body.ingredientes,
        }
        console.log(bodySp, 'este es el bodySp')    
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
    const { metodo } = req.query
    try {
        const json_ingredientes = {
            json_ingredientes: req.body.json_ingredientes
        }
        const response = await calcularCosto(json_ingredientes, metodo as string)
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
app.post('/modificarMateriaPrimaMasivo', async (req: Request, res: Response) => {
    const { url, accion } = req.body
    try {
         const response = await axios.get(url, { responseType: 'arraybuffer' });
        const workbook = xlsx.read(response.data, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Obtener todos los datos como matriz
        const rawData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        
        // La primera fila contiene los headers (nombres de columnas)
        const headers = rawData[1] as string[]; // Fila 2 (índice 1) son los headers
        
        // Comenzar desde la fila 3 (índice 2) que son los datos
        const dataRows = rawData.slice(2) as any[][];
        
        // Mapear cada fila de datos con los headers
        const mappedData = dataRows.map((row) => {
            const obj: any = {};
            headers.forEach((header, index) => {
                if (header && row[index] !== undefined) {
                    obj[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
                }
            });
            return obj;
        });
        let responseMasivo
        if (accion == '2'){
            responseMasivo = await modificarMasivo(mappedData);
        }
        
        
        res.status(200).json({
            info: true,
            msg: "Datos procesados correctamente",
            content: responseMasivo
        });
    } catch (error:any) {
        res.status(500).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
    }
})
export default app;