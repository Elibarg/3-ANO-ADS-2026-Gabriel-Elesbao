const express = require("express");
const path = require("path");
const http = require("http");

const { Server } = require("socket.io");

const layouts = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrf = require("csurf");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const logger = require("./config/logger");

const configurarSocket = require("./socket/socket");

const pageRoutes = require("./routes/pageRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const apiUsuarioRoutes = require("./routes/apiUsuarioRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server);

configurarSocket(io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const csrfProtection = csrf({
    cookie: true
});

app.use(csrfProtection);

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

app.use(cors({

    origin: "http://localhost:3000",

    credentials: true

}));

// Middleware global de logs
app.use((req, res, next) => {

    logger.info(`${req.method} ${req.originalUrl}`);

    next();

});

app.use(layouts);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.set("layout", "layouts/main");

app.use("/static", express.static(path.join(__dirname, "public")));

// Rotas Web
app.use("/", pageRoutes);

app.use("/usuarios", usuarioRoutes);

app.use("/", authRoutes);

// API REST
app.use("/api", apiUsuarioRoutes);

// Swagger
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    logger.info(`Servidor iniciado na porta ${PORT}`);

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});