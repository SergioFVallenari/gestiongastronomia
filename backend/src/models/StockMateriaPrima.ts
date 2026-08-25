import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../db';

// Columns:
// idstock_materia_prima int(10) UN AI PK 
// id_materia_prima int(11) 
// cantidad_disponible decimal(10,2) 
// ultima_modificacion datetime 
// peso_disponible decimal(10,2)
class StockMateriaPrima extends Model<InferAttributes<StockMateriaPrima>, InferCreationAttributes<StockMateriaPrima>> {
    declare idstock_materia_prima: CreationOptional<number>;
    declare id_materia_prima: number;
    declare cantidad_disponible: number;
    declare ultima_modificacion: Date;
    declare peso_disponible: number;
}

StockMateriaPrima.init(
    {
        idstock_materia_prima: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_materia_prima: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad_disponible: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        ultima_modificacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        peso_disponible: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize: db.db,
        tableName: 'stock_materia_prima',
        timestamps: false,
    }
);
export default StockMateriaPrima;
