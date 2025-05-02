import { masajeo, spGeneral } from "../helpers";

export default class Ventas {
    async insertVenta(body: any) {
     const formateo = masajeo(body)
     const result = await spGeneral("donfaustino_insert_ventas(:xjson_comanda, :xfecha_venta, :ximporte_total, :xganancia,:xpropina,:xid)", formateo)
     return result
    }
    async manejoStock(body: any, idventa: string | number) {
        console.log('Comenzando manejoStock...', body);
        const json_comanda = JSON.parse(body.json_comanda);
        
        const procesados = new Set(); // Para evitar procesar los mismos elementos más de una vez
    
        for (const element of json_comanda) {
            if (element.tipo == 'Carta' && !procesados.has(element.id)) {
                // Marca el elemento como procesado para evitar duplicados
                procesados.add(element.id);
                
                console.log('Carta detectada:', element.jsoningredinetes);
                const jsoningredinetes = JSON.parse(element.jsoningredinetes);
                
                // Primero procesamos los ingredientes
                for (const ingrediente of jsoningredinetes) {
                    const formateo = masajeo({
                        sku: ingrediente.sku,
                        cantidad: ingrediente.cantidad * element.cantidad,
                        tipo: 'Carta',
                    });
                    
                    if (ingrediente.valor_modulo == "Articulo Compuesto") {
                        let porciones;
                        console.log('este es el ingrediente id',ingrediente)
                        const body = masajeo({ sku: ingrediente?.sku });
                        const result: any = await spGeneral("donfaustino_get_materia_prima_by_sku(:xsku)", body);
                        
                        if (result[0]?.json_ingredientes) {
                            const ingredientesParsed = JSON.parse(result[0].json_ingredientes);
                            porciones = ingredientesParsed[0]?.porciones;
                            
                            for (const ingredientesCompuestos of ingredientesParsed) {
                                console.log('Este es la cantidad del elemento:', element.cantidad);
                                const formateo = masajeo({
                                    sku: ingredientesCompuestos.sku,
                                    cantidad: ingredientesCompuestos.cantidad / porciones * element.cantidad,
                                    tipo: 'Carta',
                                });
                                console.log('Formateo ingrediente compuesto:', formateo);
                                await spGeneral("donfaustino_manejo_stock(:xtipo, :xsku, :xcantidad)", formateo);
                            }
                        }
                    } else {
                        await spGeneral("donfaustino_manejo_stock(:xtipo, :xsku, :xcantidad)", formateo);
                    }
                }
    
                // Ahora insertamos el producto en ventas_productos solo una vez por cada "Carta"
                const formateo2 = masajeo({
                    id: idventa,
                    idproducto: element.id,
                    tipo: 2,
                    cantidad: element.cantidad
                });
                await spGeneral("donfaustino_insert_ventas_productos(:xid, :xidproducto, :xtipo,:xcantidad)", formateo2);
            } else {
                // Procesamiento para elementos no tipo "Carta" (como Bebidas)
                console.log('Elemento no es Carta, tipo:', element.tipo);
                console.log('Elemento:', element);
                const formateo = masajeo({
                    sku: element.sku,
                    cantidad: element.cantidad,
                    tipo: 'Bebidas',
                });
                await spGeneral("donfaustino_manejo_stock(:xtipo, :xsku, :xcantidad)", formateo);
    
                // Inserta en ventas_productos para elementos tipo "Bebida"
                const formateo2 = masajeo({
                    id: idventa,
                    idproducto: element.id,
                    tipo: 1,
                    cantidad: element.cantidad
                });
                await spGeneral("donfaustino_insert_ventas_productos(:xid, :xidproducto, :xtipo,:xcantidad)", formateo2);
            }
        }
    
        console.log('manejoStock completado.');
        return 'Procesamiento completado';
    }
    
    async getVentas(){
        const result = await spGeneral("donfaustino_get_ventas()",[])
        return result
    }
}