const express = require("express");
const path = require("path");
const layouts = require("express-ejs-layouts");
require("dotenv").config();

const usuarioRoutes = require("./routes/usuarioRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(layouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", pageRoutes);
app.use("/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});