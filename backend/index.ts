import server from "./src/server";
import conn from "./src/db"; 
const PORT = 3001;

conn.db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });