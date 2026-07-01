const bcrypt = require("bcrypt");
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

        res.redirect("/login");

    } catch (erro) {

        res.status(500).send(erro.message);

    }

}

module.exports = {

    listar,

    formulario,

    criar

};