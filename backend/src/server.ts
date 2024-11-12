import express from "express";
const morgan = require("morgan");
import routes from "./routes/index";
// import cookieParser from "cookie-parser";
const server = express();

// Middleware de registro de solicitudes (morgan)
server.use(morgan("dev"));

// // Middleware para procesar cookies
// server.use(cookieParser(process.env.COOKIE_SECRET || "secreto")); // Agregar variable de entorno para seguridad

// Middleware para habilitar CORS
server.use((req, res, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || "*"; // Establecer origen según el entorno
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

// Middleware para procesar JSON en solicitudes
server.use(express.json());

// Middleware de enrutamiento
server.use("/", routes);

// Middleware de manejo de errores
server.use((err:any, req:any, res:any, next:any) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default server;