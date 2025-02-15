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
        const result = await spGeneral("donfaustino_update_materia_prima(:xid, :xnombre,:xprecio_costo,:xcategoria_materia_prima,:xpeso_gramos)",formateo);
        return result;
    }
    async calcularCosto(body:any){
        const formateo = await masajeo(body);
        const result = await spGeneral("donfaustino_calcular_precio_costo(:xjson_ingredientes)",formateo);
        return result;
    }
}