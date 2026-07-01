const express = require("express");
require("dotenv").config();

const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(express.json());

app.use("/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});