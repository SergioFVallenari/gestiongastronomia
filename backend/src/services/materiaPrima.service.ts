import db from '../db';
import { CreateMateriaPrima } from '../interfaces/materiaPrima.interface';
import MateriaPrima from '../models/MateriaPrima';
import StockMateriaPrima from '../models/StockMateriaPrima';
import TablaMaestra from '../models/TablaMaestra';
import { col, fn } from 'sequelize';

export const getMateriaPrima = async () => {

    const materiaPrima = await MateriaPrima.findAll({

        where: {
            baja_logica: 0
        },

        attributes: [
            ['idmateria_prima', 'id'],
            'nombre',
            'sku',
            'precio_costo',

            [col('categoria.modulo'), 'categoria'],

            [col('stock.peso_disponible'), 'peso'],

            [col('stock.cantidad_disponible'), 'stock'],

            [
                fn(
                    'DATE_FORMAT',
                    col('MateriaPrima.ultima_modificacion'),
                    '%d/%m/%y %H:%i'
                ),
                'fecha_mod'
            ],

            'es_compuesto'
        ],

        include: [

            {
                model: StockMateriaPrima,
                as: 'stock',
                attributes: [],
                required: true
            },

            {
                model: TablaMaestra,
                as: 'categoria',
                attributes: [],
                required: true,
                where: {
                    modulo: 'categorias_materia_prima'
                }
            }

        ],
        raw: true,
        logging: console.log

    });

    return materiaPrima;
};
export const getMateriaPrimaById = async (id: number) => {
    const materiaPrima = await MateriaPrima.findOne({
        where: {
            idmateria_prima: id,
            baja_logica: 0
        },
        attributes: [
            ['idmateria_prima', 'id'],
            'nombre',
            'sku',
            'precio_costo',
            [col('categoria.modulo'), 'categoria_materia_prima'],
            [col('stock.cantidad_disponible'), 'stock'],
            'categoria_materia_prima',
            'es_compuesto',
            'json_ingredientes',
            [fn(
                'DATE_FORMAT',
                col('MateriaPrima.ultima_modificacion'),
                '%d/%m/%y %H:%i'
            ), 'fecha_mod'],
            'peso_gramos'
        ],
        include: [
            {
                model: StockMateriaPrima,
                as: 'stock',
                attributes: [],
                required: true
            },
            {
                model: TablaMaestra,
                as: 'categoria',
                attributes: [],
                required: true,
                where: {
                    modulo: 'categorias_materia_prima'
                }
            }
        ],
        raw: true,
    });

    return materiaPrima;
};

export const altaMateriaPrima = async (data: CreateMateriaPrima) => {

    const transaction = await db.db.transaction();

    try {

        const materiaPrima = await MateriaPrima.create(
            {
                nombre: data.nombre,
                sku: data.sku,
                precio_costo: data.precio_costo,
                fecha_alta: new Date(),
                ultima_modificacion: new Date(),
                categoria_materia_prima: data.categoria_materia_prima,
                cantidad: data.cantidad,
                peso_gramos: data.peso_gramos,
                es_compuesto: data.es_compuesto,
                json_ingredientes: data.json_ingredientes,
                es_contable: data.es_contable,
                baja_logica: 0
            },
            { transaction }
        );

        await StockMateriaPrima.create(
            {
                id_materia_prima: materiaPrima.idmateria_prima,
                cantidad_disponible: data.cantidad,
                ultima_modificacion: new Date(),
                peso_disponible: data.peso_gramos,
            },
            { transaction }
        );

        await transaction.commit();

        return {
            info: true,
            msg: "Registro ingresado con éxito.",
            id: materiaPrima.idmateria_prima
        };

    } catch (error) {

        await transaction.rollback();

        throw error;
    }
};