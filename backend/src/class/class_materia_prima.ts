import { masajeo, spGeneral } from "../helpers";

export default class MateriaPrima{
    async altaMateriaPrima(body:any){
        const formateo = await masajeo(body);
        const result = await spGeneral("donfaustino_insert_materia_prima(:xnombre, :xsku, :xprecio_costo, :xcantidad,:xcategoria_materia_prima)",formateo);
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
}