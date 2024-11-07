import express from "express";
const morgan = require("morgan");
import routes from "./routes/index";
const server = express();

// Middleware de registro de solicitudes (morgan)
server.use(morgan("dev"));

// Middleware para procesar cookies
// server.use(cookieParser("secreto"));

// Middleware para habilitar CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Especifica el origen exacto para producción
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Agrega 'Authorization' aquí
  );

  // Manejar solicitudes OPTIONS (preflights)
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

export default server