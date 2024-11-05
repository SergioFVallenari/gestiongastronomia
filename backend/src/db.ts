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
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};
export default {
  db: sequelize,
  testConnection
}