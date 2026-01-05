import { masajeo, spGeneral } from "../helpers";

export default class MateriaPrima{
    async altaMateriaPrima(body:any){
        const formateo = await masajeo(body);
        console.log('este es el formateo', formateo)
        const result = await spGeneral("donfaustino_insert_materia_prima(:xnombre, :xsku, :xprecio_costo, :xcantidad,:xcategoria_materia_prima,:xpeso_gramos,:xes_compuesto,:xjson_ingredientes,:xes_contable)",formateo);
        return result;
    }
    async getMateriaPrima(){
        const result = await spGeneral("donfaustino_get_materia_prima()",[]);
        return result;
    }
    async getMateriaPrimaById(id:number){
        const formateo = await masajeo({id});
        const result = await spGeneral("donfaustino_get_materia_prima_by_id(:xid)",formateo);
        return result;
    }
    async listaIngredientes(){
        const result = await spGeneral("donfaustino_lista_ingredientes()",[]);
        return result;
    }
    async bajaMateriaPrima(id:number){
        const formateo = await masajeo({id});
        const result = await spGeneral("donfaustino_delete_materia_prima(:xid)",formateo);
        return result;
    }
    async modificaMateriaPrima(body:any){
        const formateo = await masajeo(body);
        const result = await spGeneral("donfaustino_update_materia_prima(:xid, :xnombre,:xprecio_costo,:xcategoria_materia_prima,:xpeso_gramos,:xjson_ingredientes)",formateo);
        return result;
    }
    async calcularCosto(body:any, metodo:string){
        const formateo = await masajeo(body);
        switch (metodo) {
            case 'materia_prima':
                return await spGeneral("donfaustino_calcular_precio_ingrediente(:xjson_ingredientes)",formateo);
                break;
            case 'carta':
                return await spGeneral("donfaustino_calcular_precio_costo(:xjson_ingredientes)",formateo);
            break;
            default: 
            return;
        }
    }
    async modificarMasivo(data:any){
        let result = [];
        for(const articulo of data){
            if(!articulo.sku || !articulo.cantidad_disponible || !articulo.precio_costo){
                result.push({error: `${!articulo.sku ? 'SKU' : !articulo.cantidad_disponible ? 'Cantidad' : 'Precio Costo'} vacío para artículo ${articulo.nombre}`});
                continue;
            };
            const formateado = await masajeo({sku:articulo.sku, precio_costo: articulo.precio_costo, cantidad: articulo.cantidad_disponible.replace(/\s+|kg/gi, '')});
            await spGeneral("donfaustino_modificar_masivo_ingredientes(:xsku, :xprecio_costo, :xcantidad)", formateado);
            result.push({success: `Artículo ${articulo.nombre} modificado correctamente`});
        }
        return result;
    }
}