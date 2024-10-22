import db from "../db";

export const spGeneral = async (sp: string, params: any[]) => {
  try {
    return await db.db.query(`call ${sp}`, { replacements: params, raw: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const masajeo = (objeto: any) => {
    let objetoRetornado: any = {};
    Object.entries(objeto).map((value: any) => {
      objetoRetornado[`x${value[0]}`] = value[1];
    });
    return objetoRetornado;
  };