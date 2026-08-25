import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import db from "../db";


// Columns:
// idstock_articulos int(10) UN AI PK 
// id_articulo int(11) 
// cantidad_disponible int(11) 
// ultima_modificacion datetime
class StockArticulos extends Model<InferAttributes<StockArticulos>, InferCreationAttributes<StockArticulos>> {
    declare idstock_articulos: number;
    declare id_articulo: number
    declare cantidad_disponible: number;
    declare ultima_modificacion: Date;
}
StockArticulos.init(
    {
        idstock_articulos: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_articulo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad_disponible: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ultima_modificacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize: db.db,
        tableName: "stock_articulos",
        timestamps: false,
    }
);

export default StockArticulos;