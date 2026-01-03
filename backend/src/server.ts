import express from "express";
const morgan = require("morgan");
import routes from "./routes/index";
import swaggerDocs from "./swagger/swagger";
import cors from "cors";
import path from "path";
const server = express();
const PORT = process.env.PORT || 4000;
server.use(morgan("dev"));

server.use(cors({
  origin: ["http://localhost:5173", "https://donfaustino-344037519946.southamerica-west1.run.app"],
  credentials: true, 
}));
server.use(express.json());
server.use("/api", routes);
swaggerDocs(server, 0);
const publicPath = path.join(__dirname, "../../public");
server.use(express.static(publicPath));

server.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


export default server;