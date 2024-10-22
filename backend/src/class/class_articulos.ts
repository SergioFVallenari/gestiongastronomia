import { masajeo, spGeneral } from "../helpers";
import { iAltaArticulos } from "../interfaces/articulos.interface";

export default class Articulos{
    async crearArticulo(body:iAltaArticulos){
        const formateado = await masajeo(body);
        console.log(formateado,'formaaaato');
        const result = await spGeneral("donfaustino_insert_articulos(:xnombre, :xsku, :xprecio_costo, :xprecio_venta, :xcantidad)", formateado);
        return result;

    }
    async getArticulos(){
        const result = await spGeneral("donfaustino_get_articulos()",[]);
        return result;
    }
}