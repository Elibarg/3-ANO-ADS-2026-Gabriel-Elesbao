const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrf = require("csurf");

require("dotenv").config();

const pageRoutes = require("./routes/pageRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ===========================
   Configuração do Express
=========================== */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ===========================
   Cookies
=========================== */

app.use(cookieParser());

/* ===========================
   Sessão
=========================== */

app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

        httpOnly: true,

        secure: false,

        maxAge: 1000 * 60 * 60

    }

}));

/* ===========================
   CORS
=========================== */

app.use(cors({

    origin: "http://localhost:3000",

    credentials: true

}));

/* ===========================
   CSRF
=========================== */

const csrfProtection = csrf({

    cookie: true

});

app.use(csrfProtection);

/* ===========================
   Layouts EJS
=========================== */

app.use(expressLayouts);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.set("layout", "layouts/main");

/* ===========================
   Arquivos estáticos
=========================== */

app.use("/static", express.static(path.join(__dirname, "public")));

/* ===========================
   Rotas
=========================== */

app.use("/", pageRoutes);

app.use("/usuarios", usuarioRoutes);

app.use("/", authRoutes);

/* ===========================
   Tratamento de erro CSRF
=========================== */

app.use((err, req, res, next) => {

    if (err.code === "EBADCSRFTOKEN") {

        return res.status(403).send("Token CSRF inválido.");

    }

    next(err);

});

/* ===========================
   Inicialização
=========================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});