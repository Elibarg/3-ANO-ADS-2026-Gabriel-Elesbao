const bcrypt = require("bcrypt");

const usuarioModel = require("../models/usuarioModel");

const apiService = require("../services/apiService");

const workerService = require("../services/workerService");

const logger = require("../config/logger");

const {

    criarUsuarioSchema,

    atualizarUsuarioSchema

} = require("../validators/usuarioSchema");

async function listar(req, res) {

    try {

        const usuarios = await usuarioModel.listarUsuarios();

        logger.info("Usuários listados.");

        res.render("usuarios", {

            title: "Usuários",

            usuarios

        });

    }

    catch (erro) {

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

async function apiListar(req, res) {

    try {

        const {

            page,

            limit,

            nome

        } = req.query;

        const usuarios = await usuarioModel.listarUsuarios({

            page,

            limit,

            nome

        });

        logger.info("Consulta paginada realizada.");

        res.json({

            pagina: Number(page) || 1,

            limite: Number(limit) || 10,

            filtro: nome || null,

            quantidade: usuarios.length,

            dados: usuarios

        });

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiCriar(req, res) {

    try {

        const {

            error,

            value

        } = criarUsuarioSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                erro: error.details[0].message

            });

        }

        const senhaHash = await bcrypt.hash(

            value.senha,

            10

        );

        await usuarioModel.inserirUsuario(

            value.nome,

            value.email,

            senhaHash,

            "user"

        );

        logger.info(`API criou usuário ${value.nome}`);

        res.status(201).json({

            mensagem: "Usuário criado com sucesso."

        });

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiAtualizar(req, res) {

    try {

        const {

            error,

            value

        } = atualizarUsuarioSchema.validate(req.body);

        if (error) {

            return res.status(400).json({

                erro: error.details[0].message

            });

        }

        if (value.senha) {

            value.senha = await bcrypt.hash(

                value.senha,

                10

            );

        }

        const atualizado = await usuarioModel.atualizarUsuario(

            req.params.id,

            value

        );

        if (!atualizado) {

            return res.status(404).json({

                erro: "Usuário não encontrado."

            });

        }

        logger.info(`Usuário ${req.params.id} atualizado via API.`);

        res.json({

            mensagem: "Usuário atualizado com sucesso."

        });

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiExcluir(req, res) {

    try {

        const removido = await usuarioModel.excluirUsuario(

            req.params.id

        );

        if (!removido) {

            return res.status(404).json({

                erro: "Usuário não encontrado."

            });

        }

        logger.info(`Usuário ${req.params.id} removido via API.`);

        res.json({

            mensagem: "Usuário removido com sucesso."

        });

    }

    catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

module.exports = {

    listar,

    formulario,

    criar,

    listarPosts,

    executarWorker,

    apiListar,

    apiCriar,

    apiAtualizar,

    apiExcluir

};