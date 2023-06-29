const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const router = require("./routes/routes");

const server = express();
server.use(express.json());
server.use(cors());

try {
   db.authenticate();
   console.log("Conexão com o MySQL estabelecida!");
} catch (e) {
   console.log("Conexão com o MySQL não estabelecida", e);
}

server.use(router);

server.listen(5000, () => console.log("Server executando em http://localhost:5000"));