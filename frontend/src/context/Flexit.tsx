// import { createContext, useState } from 'react';
// // import { PostEureka } from '../components-new/estructura/EurekaGeneral/EurekaGeneral';
// import { useEffect } from 'react';

// interface IFlexitProvider {
//   children: React.ReactNode;
// }
// interface FlexitContextType {
//   datos: any;
//   setearDatos: (datos: any) => void;
//   tokenDecifrado: (token: string) => Promise<any>;
// }

// export const FlexitContext = createContext<FlexitContextType | undefined>(undefined);
// export const FlexitProvider: React.FC<IFlexitProvider> = ({ children }) => {
//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       let token: string = localStorage.getItem('token') ?? '';
//       let decifrado = tokenDecifrado(token);
//       setDatos(decifrado);
//     }
//   }, []);
//   const [datos, setDatos] = useState({});
//   function setearDatos(datos: any) {
//     setDatos({ ...datos });
//   }
//   async function tokenDecifrado(token: string): Promise<any> {
//     const decodificacion = await PostEureka(`/seguridad/Autenticacion/Decodificar`, { token: token });
//     return decodificacion.content;
//   }
//   return <FlexitContext.Provider value={{ datos, setearDatos, tokenDecifrado }}>{children}</FlexitContext.Provider>;
// };
