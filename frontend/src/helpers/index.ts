// import moment from 'moment-timezone';
// import 'select2';
// // import { PostEureka } from '../components-new/estructura/EurekaGeneral/EurekaGeneral.ts';
// import notiflix from 'notiflix';
// // const { REACT_APP_FACTOR_DE_CONVERSION } = process.env;

// // export function devolverPesoVolumetrico(alto: string = '0', largo: string = '0', ancho: string = '0'): number {
// //   if (REACT_APP_FACTOR_DE_CONVERSION) return (parseFloat(parseFloat(alto).toFixed(2)) * parseFloat(parseFloat(largo).toFixed(2)) * parseFloat(parseFloat(ancho).toFixed(2))) / parseInt(REACT_APP_FACTOR_DE_CONVERSION);
// //   else return 0.0;
// // }

// // export const tipoPlataforma = (sistema: string, _dirname: string, carpeta: string) => {
// //   if (sistema === 'linux') return _dirname.replace(`/backend/microservicios/build/${carpeta}`, '');
// //   else return _dirname.replace(`\\backend\\microservicios\\build\\${carpeta}`, '');
// // };

// // export const tokenDecifrado = async (token: string) => {
// //   try {
// //     return PostEureka(`/seguridad/Autenticacion/Decodificar`, { token: token })
// //       .then((res) => {
// //         return res;
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   } catch (error) {
// //     notiflix.Report.failure('Error', 'No se pudo decodificar el token.', 'Continuar');
// //   }
// // };
// export const devolverFormatoDefaultById = (name: string) => {
//   if (name === 'Cuenta corriente')
//     return {
//       tipo_movimiento: '',
//       tipo: '',
//       monto: '',
//       fecha_alta: '',
//     };
//   else if (name === 'Venta consignacion')
//     return {
//       articulo: '',
//       cantidad: '',
//       monto: '',
//       fecha_alta: '',
//     };
//   else if (name === 'Entregas')
//     return {
//       codinterno: '',
//       nro_venta: '',
//       direccion: '',
//       fecha_alta: '',
//       productos: [],
//     };
//   else if (name === 'Ordenes')
//     return {
//       nroorden: '',
//       fecha_alta: '',
//       productos: [],
//     };
//   else
//     return {
//       articulo: '',
//       stock_minimo: '',
//       stock_actual: '',
//       stock_disponible: '',
//       stock_reservado: '',
//       precio_costo: '',
//       precio_venta: '',
//       sku: '',
//     };
// };
// export const devolverClassColumn = (key: number) => {
//   if (key === 0 || key === 2) return 'width-opciones';
//   else return '';
// };

// export const defaultValue = () => {
//   let obj: any[] = Array.from(document.getElementsByClassName('js-example-basic-single'));
//   const input: any = document.getElementById('inputProduc');
//   obj?.map((value) => (value[0].value = '0'));
//   if (input) input.value = '';
// };
// export const cambioFormatoFechaEnTables = (table: any[], active: string) => {
//   return table?.map((value) => {
//     if (active !== 'articulos') return { ...value, fecha_alta: cambioFormatoFecha(value.fecha_alta) };
//     else return value;
//   });
// };
// export const cambioFormatoFecha = (fecha: string) => {
//   const newFecha = fecha?.split('T')[0];
//   const newFecha2 = newFecha?.split('-').reverse().join('/');
//   return newFecha2;
// };
// export const tipoFormato = (formato: string) => {
//   switch (formato) {
//     case 'venta consignacion':
//       return {
//         identrega: 0,
//         idproducto: 0,
//         fecha_fin: moment().tz('America/Argentina/Buenos_Aires').add(1, 'days').format(),
//         fecha_inicio: moment().subtract(15, 'days').tz('America/Argentina/Buenos_Aires').format(),
//       };
//     case 'auditoria':
//       return {
//         idusuario: 0,
//         tipo: '',
//         modulo: '',
//         ip: '',
//         mensaje: '',
//         fecha_fin: moment().tz('America/Argentina/Buenos_Aires').add(1, 'days').format(),
//         fecha_inicio: moment().subtract(15, 'days').tz('America/Argentina/Buenos_Aires').format(),
//       };
//     case 'articulos':
//       return {
//         idarticulo: 0,
//         articulo: '',
//         idtipo: 0,
//         idmarca: 0,
//         idmodelo: 0,
//         idproveedor: 0,
//         fecha_fin: moment().tz('America/Argentina/Buenos_Aires').add(1, 'days').format(),
//         fecha_inicio: moment().subtract(15, 'days').tz('America/Argentina/Buenos_Aires').format(),
//       };
//     case 'ordenes':
//       return {
//         idorden: 0,
//         idchofer: 0,
//         idestado: 0,
//         nroorden: '',
//         producto: '',
//         fecha_fin: moment().tz('America/Argentina/Buenos_Aires').add(1, 'days').format(),
//         fecha_inicio: moment().subtract(15, 'days').tz('America/Argentina/Buenos_Aires').format(),
//       };
//     case 'cuenta corriente':
//       return {
//         idccoriente: 0,
//         idorigen: 0,
//         idtipomovimiento: 0,
//         detallemovimiento: '',
//         idtipo: 0,
//         fecha_fin: moment().tz('America/Argentina/Buenos_Aires').add(1, 'days').format(),
//         fecha_inicio: moment().subtract(15, 'days').tz('America/Argentina/Buenos_Aires').format(),
//       };
//     default:
//       return {
//         identrega: 0,
//         idestado: 0,
//         codinterno: '',
//         nroventa: '',
//         producto: '',
//         fecha_fin: moment().tz('America/Argentina/Buenos_Aires').add(1, 'days').format(),
//         fecha_inicio: moment().subtract(15, 'days').tz('America/Argentina/Buenos_Aires').format(),
//       };
//   }
// };
// export const mensajeError = (error: string) => {
//   return error;
// };
// export const validarLongitud = (obj: Object) => {
//   const validacion = Object.values(obj || {})?.map((values) => {
//     if (!values.length) return false;
//     else return true;
//   });
//   if (validacion.includes(false) || !Object.values(obj).length || validacion.length !== 2) return { msg: 'Faltan completar campos', value: false };
//   else return { value: true };
// };
export const recorte = (texto: string) => {
  if (texto.length > 20) return texto.slice(0, 20) + '...';
  else return texto;
};
// export const sacarColumnas = (obj: any, nombreId: string) => {
//   switch (nombreId) {
//     case 'idccorriente': {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'idtipo' && ob !== 'origen') {
//           if (ob === 'monto') obj2.push(cambioPrecio(ob, obj[`${ob}`]));
//           else obj2.push(obj[`${ob}`]);
//         }
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//     case 'idregistro': {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'idproducto') {
//           if (ob === 'monto') obj2.push(cambioPrecio(ob, obj[`${ob}`]));
//           else obj2.push(obj[`${ob}`]);
//         }
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//     case 'idusuario': {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'idauditoria' && ob !== 'proovedor' && ob !== 'request' && ob !== 'response' && ob !== 'fecha' && ob !== 'fecha_alta' && ob !== 'id') obj2.push(obj[`${ob}`]);
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//     case 'idorden': {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'sucursal' && ob !== 'observaciones' && ob !== 'idestado' && ob !== 'idchofer' && ob !== 'productos') {
//           if (ob === 'productos') obj2?.push([...new Set(obj[`${ob}`].map((value: any) => `(${obj[`${ob}`].filter((valor: any) => valor.articulo === value.articulo).length}) ` + value?.articulo + ' - ' + value?.sku))]?.join(','));
//           else obj2.push(obj[`${ob}`]);
//         }
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//     case 'idarticulo': {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'tipo' && ob !== 'marca' && ob !== 'modelo' && ob !== 'idtipo' && ob !== 'idmarca' && ob !== 'idmodelo' && ob !== 'idproveedor' && ob !== 'precio_costo' && ob !== 'stock_minimo' && ob !== 'id')
//           if (ob === 'precio_costo' || ob === 'precio_venta') obj2.push(cambioPrecio(ob, obj[`${ob}`]));
//           else obj2.push(obj[`${ob}`]);
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//     case 'identrega': {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'idestado' && ob !== 'observaciones') {
//           if (ob === 'productos') obj2?.push([...new Set(obj[`${ob}`].map((value: any) => `(${obj[`${ob}`].filter((valor: any) => valor.articulo === value.articulo).length}) ` + value?.articulo + ' - ' + value?.sku))]?.join(','));
//           else obj2.push(obj[`${ob}`]);
//         }
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//     default: {
//       const obj2 = [];
//       for (let ob in obj) {
//         if (ob !== nombreId && ob !== 'productos') obj2.push(obj[`${ob}`]);
//       }
//       if (!obj2.includes('opciones')) obj2.unshift('opciones');
//       return obj2;
//     }
//   }
// };
// export const cambiarKeys = (array: any[], nombreId: string) => {
//   if (!array.includes('opciones')) array.unshift('opciones');
//   switch (nombreId) {
//     case 'idccorriente':
//       return array.filter((name) => (name !== nombreId && name !== 'idtipo' && name !== 'origen' ? name : null));
//     case 'idregistro':
//       return array.filter((name) => (name !== nombreId && name !== 'idproducto' ? name : null));
//     case 'idorden':
//       return array.filter((name) => (name !== nombreId && name !== 'idorden' && name !== 'sucursal' && name !== 'observaciones' && name !== 'idestado' && name !== 'idchofer' && name !== 'productos' ? name : null));
//     case 'idarticulo':
//       return array.filter((name) => (name !== nombreId && name !== 'marca' && name !== 'tipo' && name !== 'modelo' && name !== 'idmarca' && name !== 'idmodelo' && name !== 'idproveedor' && name !== 'idtipo' && name !== 'precio_costo' && name !== 'stock_minimo' && name !== 'id' ? name : null));
//     case 'identrega':
//       return array.filter((name) => (name !== 'idestado' && name !== 'observaciones' && name !== nombreId ? name : null));
//     case 'idusuario': {
//       return array.filter((name) => {
//         if (name !== 'idusuario' && name !== 'idauditoria' && name !== 'proveedor' && name !== 'request' && name !== 'response') return name;
//         else return null;
//       });
//     }
//     default:
//       return array.filter((name) => (name !== 'productos' ? name : null));
//   }
// };
// export const ocultarBoton = (nombreTabla: string, nombreBoton: string, estado: string) => {
//   if ((nombreTabla === 'articulos' || nombreTabla === 'cuenta corriente' || nombreTabla === 'auditoria' || nombreTabla === 'venta consignacion') && nombreBoton === 'Consulta') return false;
//   else if (estado === 'Entrega Finalizada') return true;
//   else if (nombreTabla === 'entregas' && nombreBoton === 'Confirmar-pendiente') return false;
//   else if (estado === 'Conf. x sucursal' || estado === 'Rech. x sucursal') return true;
//   else if (nombreTabla === 'articulos' && nombreBoton === 'Stock') return false;
//   else if (nombreTabla === 'ordenes' && (nombreBoton === 'Consulta' || nombreBoton === 'Rechazar' || nombreBoton === 'Confirmar')) return false;
//   else if (nombreTabla === 'entregas' && nombreBoton === 'Consulta') return false;
//   else return true;
// };
// export const tipoDeValor = (name: string, value: string, eliminar: boolean) => {
//   if (eliminar === false) {
//     if (name === 'articulo' || name === 'nroorden' || name === 'producto' || name === 'fecha_inicio' || name === 'fecha_fin' || name === 'codinterno') return value;
//     else return parseInt(value);
//   } else {
//     if (name === 'identrega' || name === 'idestado' || name === 'idordenes' || name === 'idarticulo' || name === 'idchofer' || name === 'idtipo' || name === 'idmarca' || name === 'idmodelo' || name === 'idproveedor' || name === 'idccoriente' || name === 'idorigen' || name === 'idtipo' || name === 'idtipomovimiento' || name === 'identrega' || name === 'idproducto') return 0;
//     else if (name === 'fecha_inicio') return undefined;
//     else if (name === 'fecha_fin') return undefined;
//     else return '';
//   }
// };
// export function recortarFecha(fecha: string) {
//   return fecha?.split('T')[0];
// }
// export function cambioPrecio(name: string, value: string) {
//   if (name === 'precio_costo' || name === 'precio_venta' || name === 'monto') return Number.parseFloat(value).toFixed(2);
//   else if (name === 'fecha_alta') return recortarFecha(value);
//   else return value;
// }

import axios from 'axios';
const VITE_API_URL_DONFAUSTINO = import.meta.env.VITE_API_URL_DONFAUSTINO;

export const PostGeneral = async (url: string, body: { [key: string]: string | number | boolean }) => {
  try {
    return await api.post(`${VITE_API_URL_DONFAUSTINO}` + url, body).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
}

// Crear una instancia de Axios
const api = axios.create({
  baseURL: `${VITE_API_URL_DONFAUSTINO}`, // Cambia esta URL según la dirección de tu backend
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si hay un error 401 (no autorizado), redirige al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
