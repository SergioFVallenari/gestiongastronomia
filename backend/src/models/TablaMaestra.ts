import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import db from "../db";

// Columns:
// idtabla_maestra int(10) UN AI PK 
// modulo varchar(250) 
// valor_modulo varchar(250) 
// id_valor_modulo bigint(20) 
// fecha_alta datetime

class TablaMaestra extends Model<InferAttributes<TablaMaestra>, InferCreationAttributes<TablaMaestra>> {
    declare idtabla_maestra: number;
    declare modulo: string
    declare valor_modulo: string;
    declare id_valor_modulo: number
    declare fecha_alta: Date;
}
TablaMaestra.init(
    {
        idtabla_maestra: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        modulo: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        valor_modulo: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        id_valor_modulo: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        fecha_alta: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize: db.db,
        tableName: "tabla_maestra",
        timestamps: false,
    }
);
export default TablaMaestra;