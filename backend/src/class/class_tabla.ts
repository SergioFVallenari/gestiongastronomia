import { masajeo, spGeneral } from "../helpers";

export default class TablaMaestra{
    async getListaByModulo(body:any){
        const formateado = await masajeo(body);
        const result = await spGeneral("donfaustino_get_lista_by_modulo(:xmodulo)",formateado);
        return result;
    }
    async insertCategoria(body:any){
        const formateado = await masajeo(body);
        const result = await spGeneral("donfaustino_insert_categoria(:xmodulo,:xvalor_modulo)",formateado);
        return result;
    }
}