import server from "./src/server";
import conn from "./src/db";

const PORT = parseInt(process.env.PORT as string, 10) || 8080;

conn.db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    server.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
      console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });
