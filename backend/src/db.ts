import { Sequelize } from "sequelize";
const { DATABASE, USU, PASSWORD, HOST } = process.env;
console.log(DATABASE, USU, PASSWORD, HOST, '<----');
const sequelize = new Sequelize(`${'donfaustino'}`, `${'root'}`, `Vehemente676!`, {
  dialect: "mysql",
  host: '127.0.0.1',
  port: 3307,
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