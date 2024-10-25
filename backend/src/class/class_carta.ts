import { masajeo, spGeneral } from "../helpers";

export default class Carta{
    async alta_carta(body:any){
        const formateo = masajeo(body);
        const result = await spGeneral("donfaustino_insert_carta(:xnombre, :xprecio_costo,:xprecio_venta, :xdescripcion, :xingredientes_json)", formateo);
        return result;
    }
}