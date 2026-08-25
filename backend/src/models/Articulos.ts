import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import db from "../db";

// Columns:
// idarticulos bigint(20) UN AI PK 
// nombre varchar(100) 
// sku varchar(45) 
// precio_costo decimal(10,2) 
// precio_venta decimal(10,2) 
// fecha_alta datetime 
// ultima_modificacion datetime 
// cantidad bigint(20) 
// disponibles varchar(45) 
// categoria_articulo int(11) 
// baja_logica int(11)
class Articulos extends Model<InferAttributes<Articulos>, InferCreationAttributes<Articulos>> {
    declare idarticulos: number;
    declare nombre: string;
    declare sku: string;
    declare precio_costo: number;
    declare precio_venta: number;
    declare fecha_alta: Date;
    declare ultima_modificacion: Date;
    declare cantidad: number;
    declare disponibles: string;
    declare categoria_articulo: number;
    declare baja_logica: number;
}
Articulos.init(
    {
        idarticulos: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        precio_costo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        precio_venta: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        fecha_alta: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ultima_modificacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        disponibles: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        categoria_articulo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        baja_logica: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db.db,
        tableName: "articulos",
        timestamps: false,
    }
);

export default Articulos;