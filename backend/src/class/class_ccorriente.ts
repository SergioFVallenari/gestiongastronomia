import {masajeo, spGeneral} from "../helpers";

export default class Ccorriente{
    async alta_ccorriente(body:any){
        const formateo = masajeo(body);
        const result = await spGeneral("donfaustino_insert_ccorriente(:xnombre,:xingredientes_json,:xdescripcion,:xprecio_costo,:xprecio_venta,:xganancia,:xsku,:xcategoria)", formateo);
        return result;
    }
    async get_ccorriente(){
        const result = await spGeneral("donfaustino_get_ccorriente()",[]);
        return result;
    }
    async get_ccorriente_by_id(id:any){
        const formateo = masajeo({id});
        console.log(formateo);
        const result = await spGeneral("donfaustino_get_ccorriente_by_id(:xid)", formateo);
        return result;
    }
    async delete_ccorriente(body:any){
        const formateo = masajeo(body);
        const result = await spGeneral("donfaustino_delete_ccorriente(:xid)", formateo);
        return result;
    }
}