import dotenv from 'dotenv';

// Cargar variables de entorno según el ambiente
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

import server from "./src/server";
import conn from "./src/db";
import "./src/associations";
const PORT = parseInt(process.env.PORT as string, 10) || 8080;

conn.db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.', process.env.DATABASE);
    server.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
      console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });
