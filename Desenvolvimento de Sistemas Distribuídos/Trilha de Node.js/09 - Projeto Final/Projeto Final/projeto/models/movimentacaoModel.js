const produtoModel = require("../models/produtoModel");
const movimentacaoModel = require("../models/movimentacaoModel");
const logger = require("../config/logger");

async function movimentar(req, res) {

    try {

        const {

            produto,

            tipo,

            quantidade

        } = req.body;

        const item = await produtoModel.buscarPorId(produto);

        if (!item) {

            return res.status(404).send("Produto não encontrado.");

        }

        let estoque = item.quantidade;

        if (tipo === "entrada") {

            estoque += Number(quantidade);

        } else {

            if (estoque < Number(quantidade)) {

                return res.status(400).send("Estoque insuficiente.");

            }

            estoque -= Number(quantidade);

        }

        await produtoModel.alterarQuantidade(

            produto,

            estoque

        );

        await movimentacaoModel.registrarMovimentacao(

            produto,

            tipo,

            quantidade

        );

        logger.info(`${tipo} de estoque do produto ${item.nome}`);

        res.redirect("/movimentacoes");

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

async function listar(req, res) {

    try {

        const movimentacoes =

            await movimentacaoModel.listarMovimentacoes();

        res.render("movimentacoes", {

            title: "Movimentações",

            movimentacoes

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).send(erro.message);

    }

}

async function apiListar(req, res) {

    try {

        const movimentacoes =

            await movimentacaoModel.listarMovimentacoes();

        res.json(movimentacoes);

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

async function apiMovimentar(req, res) {

    try {

        const {

            produto,

            tipo,

            quantidade

        } = req.body;

        const item = await produtoModel.buscarPorId(produto);

        if (!item) {

            return res.status(404).json({

                erro: "Produto não encontrado."

            });

        }

        let estoque = item.quantidade;

        if (tipo === "entrada") {

            estoque += Number(quantidade);

        } else {

            if (estoque < Number(quantidade)) {

                return res.status(400).json({

                    erro: "Estoque insuficiente."

                });

            }

            estoque -= Number(quantidade);

        }

        await produtoModel.alterarQuantidade(

            produto,

            estoque

        );

        await movimentacaoModel.registrarMovimentacao(

            produto,

            tipo,

            quantidade

        );

        logger.info(`${tipo} de estoque do produto ${item.nome}`);

        res.status(201).json({

            mensagem: "Movimentação registrada com sucesso."

        });

    } catch (erro) {

        logger.error(erro.message);

        res.status(500).json({

            erro: erro.message

        });

    }

}

module.exports = {

    movimentar,

    listar,

    apiListar,

    apiMovimentar

};