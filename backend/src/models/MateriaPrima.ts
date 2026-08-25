import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../db';

// Columns:
// idmateria_prima int(10) UN AI PK 
// nombre varchar(100) 
// precio_costo decimal(10,2) 
// fecha_alta datetime 
// ultima_modificacion datetime 
// categoria_materia_prima int(11) 
// cantidad int(11) 
// sku varchar(45) 
// baja_logica int(11) 
// peso_gramos decimal(10,2) 
// es_compuesto int(11) 
// json_ingredientes mediumtext 
// es_contable int(11)
class MateriaPrima extends Model<InferAttributes<MateriaPrima>, InferCreationAttributes<MateriaPrima>> {
    declare idmateria_prima: CreationOptional<number>;
    declare nombre: string;
    declare precio_costo: number;
    declare fecha_alta: Date;
    declare ultima_modificacion: Date
    declare categoria_materia_prima: number;
    declare cantidad: number
    declare sku: string;
    declare baja_logica: CreationOptional<number>;
    declare peso_gramos: number;
    declare es_compuesto: number
    declare json_ingredientes: string;
    declare es_contable: number;
}
MateriaPrima.init(
    {
        idmateria_prima: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        precio_costo: {
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
        categoria_materia_prima: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        baja_logica: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        peso_gramos: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        es_compuesto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        json_ingredientes: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
        es_contable: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db.db,
        tableName: 'materia_prima',
        timestamps: false,
    }
);
export default MateriaPrima;