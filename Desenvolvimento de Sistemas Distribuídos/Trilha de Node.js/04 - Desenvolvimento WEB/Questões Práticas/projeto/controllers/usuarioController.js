const usuarioModel = require("../models/usuarioModel");

async function listar(req, res) {

    try {

        const usuarios = await usuarioModel.listarUsuarios();

        res.json(usuarios);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

}

async function criar(req, res) {

    try {

        const { nome } = req.body;

        const id = await usuarioModel.inserirUsuario(nome);

        res.status(201).json({
            id,
            nome
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

}

async function atualizar(req, res) {

    try {

        const id = Number(req.params.id);

        const { nome } = req.body;

        const usuario = await usuarioModel.buscarPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });

        }

        await usuarioModel.atualizarUsuario(id, nome);

        res.json({
            mensagem: "Usuário atualizado."
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

}

async function excluir(req, res) {

    try {

        const id = Number(req.params.id);

        const usuario = await usuarioModel.buscarPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });

        }

        await usuarioModel.excluirUsuario(id);

        res.json({
            mensagem: "Usuário removido."
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

}

module.exports = {

    listar,
    criar,
    atualizar,
    excluir

};