const express = require("express");
const axios = require("axios");

const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

// Página Inicial
router.get("/", (req, res) => {

    res.render("index", {
        title: "Página Inicial",
        mensagem: "Bem-vindo ao SSR com Node.js!"
    });

});

// Página Sobre
router.get("/about", (req, res) => {

    res.render("about", {
        title: "Sobre",
        site: "Projeto Node.js",
        descricao: "Projeto desenvolvido utilizando Express, EJS e MySQL."
    });

});

// API Externa (JSONPlaceholder)
router.get("/posts", usuarioController.listarPosts);

// Worker Thread
router.get("/worker", usuarioController.executarWorker);

// Chat em Tempo Real
router.get("/chat", (req, res) => {

    res.render("chat", {
        title: "Chat"
    });

});

module.exports = router;