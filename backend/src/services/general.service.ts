import Articulos from "../models/Articulos";
import MateriaPrima from "../models/MateriaPrima";

export const checkSku = async (sku: string) => {

    const articulo = await Articulos.findOne({
        where: {
            sku,
            baja_logica: 0
        },
        attributes: ["idarticulos", "sku", "nombre"]
    });

    if (articulo) {
        return {
            exists: true,
            type: "articulo",
            content: articulo
        };
    }

    const materiaPrima = await MateriaPrima.findOne({
        where: {
            sku,
            baja_logica: 0
        },
        attributes: ["idmateria_prima", "sku", "nombre"]
    });

    if (materiaPrima) {
        return {
            exists: true,
            type: "materia_prima",
            content: materiaPrima
        };
    }

    return {
        exists: false,
        type: null,
        content: null
    };
};