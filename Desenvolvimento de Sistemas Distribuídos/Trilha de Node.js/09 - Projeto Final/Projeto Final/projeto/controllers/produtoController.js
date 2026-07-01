const produtoModel = require("../models/produtoModel");
const logger = require("../config/logger");

async function listar(req, res) {

    try {

        const produtos = await produtoModel.listarProdutos();

        res.render("produtos", {

            title: "Produtos",

            produtos

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

function formulario(req, res) {

    res.render("produto-form", {

        title: "Cadastrar Produto",

        erro: null,

        produto: {}

    });

}

async function criar(req, res) {

    try {

        const {

            nome,

            categoria,

            quantidade,

            preco

        } = req.body;

        if (

            !nome ||

            !categoria ||

            !quantidade ||

            !preco

        ) {

            return res.render("produto-form", {

                title: "Cadastrar Produto",

                erro: "Preencha todos os campos.",

                produto: req.body

            });

        }

        await produtoModel.inserirProduto(

            nome,

            categoria,

            Number(quantidade),

            Number(preco)

        );

        logger.info(`Produto cadastrado: ${nome}`);

        res.redirect("/produtos");

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

async function apiListar(req, res) {

    try {

        const produtos = await produtoModel.listarProdutos();

        res.json(produtos);

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiCriar(req, res) {

    try {

        const {

            nome,

            categoria,

            quantidade,

            preco

        } = req.body;

        await produtoModel.inserirProduto(

            nome,

            categoria,

            Number(quantidade),

            Number(preco)

        );

        logger.info(`API criou produto ${nome}`);

        res.status(201).json({

            mensagem: "Produto criado com sucesso."

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiAtualizar(req, res) {

    try {

        const {

            nome,

            categoria,

            quantidade,

            preco

        } = req.body;

        const atualizado =

            await produtoModel.atualizarProduto(

                req.params.id,

                nome,

                categoria,

                Number(quantidade),

                Number(preco)

            );

        if (!atualizado) {

            return res.status(404).json({

                erro: "Produto não encontrado."

            });

        }

        logger.info(

            `Produto ${req.params.id} atualizado.`

        );

        res.json({

            mensagem: "Produto atualizado com sucesso."

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiExcluir(req, res) {

    try {

        const removido =

            await produtoModel.excluirProduto(

                req.params.id

            );

        if (!removido) {

            return res.status(404).json({

                erro: "Produto não encontrado."

            });

        }

        logger.info(

            `Produto ${req.params.id} removido.`

        );

        res.json({

            mensagem: "Produto removido com sucesso."

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function relatorioEstoque(req, res) {

    try {

        const produtos =

            await produtoModel.listarEstoqueBaixo();

        res.render("estoque-baixo", {

            title: "Estoque Baixo",

            produtos

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

async function relatorioMovimentacao(req, res) {

    try {

        const produtos =

            await produtoModel.produtosMaisMovimentados();

        res.render("mais-movimentados", {

            title: "Produtos Mais Movimentados",

            produtos

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

module.exports = {

    listar,

    formulario,

    criar,

    apiListar,

    apiCriar,

    apiAtualizar,

    apiExcluir,

    relatorioEstoque,

    relatorioMovimentacao

};