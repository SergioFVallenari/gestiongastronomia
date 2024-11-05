import { masajeo, spGeneral } from "../helpers";
import { iAltaArticulos, iModArticulos } from "../interfaces/articulos.interface";

export default class Articulos{
    async crearArticulo(body:iAltaArticulos){
        const formateado = await masajeo(body);
        console.log(formateado,'formaaaato');
        const result = await spGeneral("donfaustino_insert_articulos(:xnombre, :xsku, :xprecio_costo, :xprecio_venta, :xcantidad,:xcategoria_articulo)", formateado);
        return result;

    }
    async getArticulos(){
        const result = await spGeneral("donfaustino_get_articulos()",[]);
        return result;
    }
    async bajaArticulo(id:number){
        const formateo = await masajeo({id});
        const result = await spGeneral("donfaustino_delete_articulos(:xid)",formateo);
        return result;
    }
    async getArticuloById(id:number){
        const formateo = await masajeo({id});
        const result = await spGeneral("donfaustino_get_articulos_by_id(:xid)",formateo);
        return result;
    }
    async modificarArticulo(body:iModArticulos){
        const formateado = await masajeo(body);
        const result = await spGeneral("donfaustino_update_articulos(:xid, :xnombre, :xprecio_costo, :xprecio_venta, :xcategoria_articulo)",formateado);
        return result;
    }
}