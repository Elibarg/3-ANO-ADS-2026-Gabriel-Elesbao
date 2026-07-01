const bcrypt = require("bcrypt");

const usuarioModel = require("../models/usuarioModel");

const apiService = require("../services/apiService");

const workerService = require("../services/workerService");

const logger = require("../config/logger");

async function listar(req, res) {

    try {

        const usuarios = await usuarioModel.listarUsuarios();

        logger.info("Usuários listados.");

        res.render("usuarios", {

            title: "Usuários",

            usuarios

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

function formulario(req, res) {

    res.render("usuario-form", {

        title: "Cadastrar Usuário",

        erro: null,

        usuario: {}

    });

}

async function criar(req, res) {

    try {

        const {

            nome,

            email,

            senha

        } = req.body;

        if (!nome || !email || !senha) {

            return res.render("usuario-form", {

                title: "Cadastrar Usuário",

                erro: "Preencha todos os campos.",

                usuario: req.body

            });

        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await usuarioModel.inserirUsuario(

            nome,

            email,

            senhaHash,

            "user"

        );

        logger.info(`Novo usuário cadastrado: ${nome}`);

        res.redirect("/login");

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

async function listarPosts(req, res) {

    try {

        const posts = await apiService.buscarPosts();

        logger.info("Posts carregados da API.");

        res.render("posts", {

            title: "Posts",

            posts

        });

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

async function executarWorker(req, res) {

    try {

        const resultado = await workerService.executarWorker();

        logger.info("Worker executado.");

        res.render("worker", {

            title: "Worker Thread",

            resultado

        });

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

module.exports = {

    listar,

    formulario,

    criar,

    listarPosts,

    executarWorker

};