import { masajeo, spGeneral } from "../helpers";

export default class Ingresos{
    async altaIngreso(jsonIngresos:any,costo_total:number){
        const formateo = await masajeo({jsonIngresos,costo_total});
        const result = await spGeneral("donfaustino_insert_ingresos_articulos(:xjsonIngresos,:xcosto_total)",formateo); 
        return result;
    }
    async getIngresos(){
        const result = await spGeneral("donfaustino_get_ingresos_articulos()",[]);
        return result;
    }
    async getIngresoById(id:number){
        const formateo = await masajeo({id});
        const result = await spGeneral("donfaustino_get_ingresos_articulos_by_id(:xid)",formateo);
        return result;
    }
    async getListaByModulo(body:any){
        const formateado = await masajeo(body);
        const result = await spGeneral("donfaustino_get_lista_by_modulo(:xmodulo)",formateado);
        return result;
    }

}