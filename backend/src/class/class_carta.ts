import { masajeo, spGeneral } from "../helpers";

export default class Carta{
    async alta_carta(body:any){
        const formateo = masajeo(body);
        const result = await spGeneral("donfaustino_insert_carta(:xnombre,:xingredientes_json,:xdescripcion,:xprecio_costo,:xprecio_venta,:xganancia,:xsku,:xcategoria)", formateo);
        return result;
    }
    async get_carta(){
        const result = await spGeneral("donfaustino_get_carta()",[]);
        return result;
    }
    async get_carta_by_id(id:any){
        const formateo = masajeo({id});
        console.log(formateo);
        const result = await spGeneral("donfaustino_get_carta_by_id(:xid)", formateo);
        return result;
    }
    async delete_carta(body:any){
        const formateo = masajeo(body);
        const result = await spGeneral("donfaustino_delete_carta(:xid)", formateo);
        return result;
    }
}