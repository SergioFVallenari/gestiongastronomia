import Articulos from "../models/Articulos";
import StockArticulos from "../models/StockArticulos";
import TablaMaestra from "../models/TablaMaestra";
import MateriaPrima from "../models/MateriaPrima";
import StockMateriaPrima from "../models/StockMateriaPrima";

//##################### ARTICULOS ############################
Articulos.hasOne(StockArticulos, {
    foreignKey: "id_articulo",
    sourceKey: "idarticulos",
    as: "stock"
});

StockArticulos.belongsTo(Articulos, {
    foreignKey: "id_articulo",
    targetKey: "idarticulos",
    as: "articulo"
});

Articulos.belongsTo(TablaMaestra, {
    foreignKey: "categoria_articulos",
    targetKey: "id_valor_modulo",
    as: "categoria"
});

//###################### MATERIA PRIMA ########################
MateriaPrima.hasOne(StockMateriaPrima, {
    foreignKey: "id_materia_prima",
    sourceKey: "idmateria_prima",
    as: "stock"
});

StockMateriaPrima.belongsTo(MateriaPrima, {
    foreignKey: "id_materia_prima",
    targetKey: "idmateria_prima",
    as: "materia_prima"
});

MateriaPrima.belongsTo(TablaMaestra, {
    foreignKey: "categoria_materia_prima",
    targetKey: "id_valor_modulo",
    as: "categoria"
});