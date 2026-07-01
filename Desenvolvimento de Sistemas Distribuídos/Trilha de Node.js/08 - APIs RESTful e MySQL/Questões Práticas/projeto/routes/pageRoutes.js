const express = require("express");
const axios = require("axios");

const router = express.Router();

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

// API Externa
router.get("/posts", async (req, res) => {

    try {

        const resposta = await axios.get(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        res.render("posts", {

            title: "Posts",

            posts: resposta.data

        });

    } catch (erro) {

        res.status(500).send("Erro ao consultar API.");

    }

});

module.exports = router;