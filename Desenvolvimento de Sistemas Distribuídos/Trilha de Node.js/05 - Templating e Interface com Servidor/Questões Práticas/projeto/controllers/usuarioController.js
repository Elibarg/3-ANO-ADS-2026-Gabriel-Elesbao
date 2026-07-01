const usuarioModel = require("../models/usuarioModel");

async function listar(req, res) {

    try {

        const usuarios = await usuarioModel.listarUsuarios();

        res.render("usuarios", {

            title: "Usuários",

            usuarios

        });

    } catch (erro) {

        res.status(500).send(erro.message);

    }

}

function formulario(req, res) {

    res.render("usuario-form", {

        title: "Cadastrar Usuário",

        erro: null,

        nome: ""

    });

}

async function criar(req, res) {

    try {

        const { nome } = req.body;

        if (!nome || nome.trim().length < 3) {

            return res.render("usuario-form", {

                title: "Cadastrar Usuário",

                erro: "O nome deve possuir pelo menos 3 caracteres.",

                nome

            });

        }

        await usuarioModel.inserirUsuario(nome);

        res.redirect("/usuarios");

    } catch (erro) {

        res.status(500).send(erro.message);

    }

}

module.exports = {

    listar,

    formulario,

    criar

};