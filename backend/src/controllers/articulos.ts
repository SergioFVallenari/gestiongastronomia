import { Request, Response, Router } from 'express'
import classArticulos from '../class/class_articulos'
import { skuVerify } from '../helpers';
import axios from 'axios';
import xlsx from 'xlsx';
import fs from 'fs';
import { getArticuloById, getArticulos } from '../services/articulos.service';
const { crearArticulo, bajaArticulo, modificarArticulo, modificarMasivo } = new classArticulos()

const app = Router()

app.post('/alta_articulos', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const haySku = await skuVerify(body.sku)
        if (haySku) {
            throw new Error('El SKU ya existe')
        }
        const response = await crearArticulo(body)
        res.status(200).json(
            {
                info: true,
                msg: "Articulo creado",
                content: response
            }
        )
    } catch (error: any) {
        res.status(409).json({
            info: false,
            msg: error.message || 'Ocurrió un error',
        });
    }

});
export const getArticulosController = async (req: Request, res: Response) => {
    try {
        const response = await getArticulos();

        res.status(200).json({
            info: true,
            msg: "Articulos",
            content: response
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            info: false,
            msg: "Error al obtener los artículos",
            content: []
        });

    }
};
export const getArticuloByIdController = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await getArticuloById(Number(id))
        res.status(200).json({
            info: true,
            msg: "Articulo",
            content: [response]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            info: false,
            msg: "Error al obtener el artículo",
            content: null
        });
    }
}
app.delete('/baja_articulos', async (req: Request, res: Response) => {
    const { id } = req.body
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
    const { id } = req.params
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
app.post('/modificarArticulosMasivo', async (req: Request, res: Response) => {
    const { url, accion } = req.body;
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
        if (accion == '2') {
            responseMasivo = await modificarMasivo(mappedData);
        }


        res.status(200).json({
            info: true,
            msg: "Datos procesados correctamente",
            content: responseMasivo
        });
    } catch (error: any) {
        console.error('Error procesando el archivo:', error);
        res.status(500).json({
            info: false,
            msg: error.message || 'Error procesando el archivo Excel'
        });
    }
})

// // Función alternativa para leer archivo local
// app.post('/leerArchivoLocal', async (req: Request, res: Response) => {
//     const { filePath } = req.body;
//     try {
//         // Leer archivo desde el sistema de archivos local
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];

//         // Obtener todos los datos como matriz
//         const rawData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//         // La primera fila contiene los headers (nombres de columnas)
//         const headers = rawData[1] as string[]; // Fila 2 (índice 1) son los headers

//         // Comenzar desde la fila 3 (índice 2) que son los datos
//         const dataRows = rawData.slice(2);

//         // Mapear cada fila de datos con los headers
//         const mappedData = dataRows.map((row: any[]) => {
//             const obj: any = {};
//             headers.forEach((header, index) => {
//                 if (header && row[index] !== undefined) {
//                     obj[header] = row[index];
//                 }
//             });
//             return obj;
//         });

//         // Filtrar filas vacías
//         const filteredData = mappedData.filter(obj => 
//             Object.values(obj).some(value => value !== null && value !== undefined && value !== '')
//         );

//         console.log('Headers:', headers);
//         console.log('Datos mapeados:', filteredData);

//         res.status(200).json({
//             info: true,
//             msg: "Archivo local procesado correctamente",
//             content: {
//                 headers: headers,
//                 data: filteredData,
//                 total: filteredData.length
//             }
//         });
//     } catch (error: any) {
//         console.error('Error leyendo el archivo local:', error);
//         res.status(500).json({
//             info: false,
//             msg: error.message || 'Error leyendo el archivo Excel local'
//         });
//     }
// })


export default app
