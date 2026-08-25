import Articulos from "../models/Articulos";
import StockArticulos from "../models/StockArticulos";
import { col, fn } from "sequelize";
export const getArticulos = async () => {

    const articulos = await Articulos.findAll({
        where: {
            baja_logica: 0
        },

        attributes: [
            ["idarticulos", "id"],
            "nombre",
            "sku",
            "precio_costo",
            "precio_venta",
            ["categoria_articulo", "idcategoria"],
            [
                fn(
                    "DATE_FORMAT",
                    col("articulos.ultima_modificacion"),
                    "%d/%m/%y %H:%i"
                ),
                "fecha_mod"
            ],

            [col("stock.cantidad_disponible"), "stock"]
        ],

        include: [
            {
                model: StockArticulos,
                as: "stock",
                required: true,
                attributes: []
            }
        ],

        raw: true
    });

    return articulos;
};

export const getArticuloById = async (id: number) => {
    const articulo = await Articulos.findOne({
        where: {
            idarticulos: id,
            baja_logica: 0
        },
        attributes: [
            ["idarticulos", "id"],
            "nombre",
            "sku",
            "precio_costo",
            "precio_venta",
            "categoria_articulo",
            [col("stock.cantidad_disponible"), "stock"]
        ],
        include: [
            {
                model: StockArticulos,
                as: "stock",
                required: true,
                attributes: []
            }
        ],
        raw: true
    });
    return articulo;
};