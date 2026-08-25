
export interface CreateMateriaPrima {
    nombre: string;
    sku: string;
    precio_costo: number;
    cantidad: number;
    categoria_materia_prima: number;
    peso_gramos: number;
    es_compuesto: number;
    json_ingredientes: string;
    es_contable: number;
}