import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config(); 
const { DATABASE, USU, PASSWORD, HOST } = process.env;
const sequelize = new Sequelize(`${DATABASE}`, `${USU}`, `${PASSWORD}`, {
  dialect: "mysql",
  host: `${HOST}`,
  port: 3306,
  dialectOptions: {
    timezone: '-03:00',
    charset: 'utf8mb4',
  },
  timezone: 'America/Argentina/Buenos_Aires',
})
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexión a la base de datos ${DATABASE} establecida correctamente`);
  } catch (error) {
    console.error(`No se pudo conectar a la base de datos:`, error);
  }
};
export async function exec_sp_to_json(
  spName: string,
  params: Record<string, any> = {}
): Promise<any[]> {
  const keys = Object.keys(params);
  const placeholders = keys.map((key) => `:${key}`).join(', ');
  const query = `CALL ${spName}(${placeholders})`;
  try {
    const result: any = await sequelize.query(query, {
      replacements: params,
    });
    const rows = Array.isArray(result) ? result : [];
    return rows;
  } catch (error) {
    console.error(`Error al ejecutar SP '${spName}':`, error);
    throw error;
  }
}
export default {
  db: sequelize,
  testConnection
}