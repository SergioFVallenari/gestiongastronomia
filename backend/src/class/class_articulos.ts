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

    async modificarMasivo(data:any){
        console.log(data,'dataaa');
        let result = [];
        for(const articulo of data){
            if(!articulo.sku){
                result.push({error: `SKU vacío para artículo ${articulo.nombre}`});
                continue;
            };
            const formateado = await masajeo({sku:articulo.sku, precio_costo: articulo.precio_costo, precio_venta: articulo.precio_venta});
            await spGeneral("donfaustino_modificar_masivo(:xsku, :xprecio_costo, :xprecio_venta)", formateado);
            result.push({success: `Artículo ${articulo.nombre} modificado correctamente`});
        }
        return result;
    }
}