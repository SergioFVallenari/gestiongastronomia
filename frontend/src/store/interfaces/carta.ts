export interface iGetCarta{
    id: number;
    nombre: string;
    precio_costo: number;
    precio_venta: number;
    descripcion: string;
    ingredientes_json: iIngredientes[];
}

interface iIngredientes {
    id: number;
    nombre: string;
    sku: string;
    valor_modulo: string;
    cantidad: number;
}