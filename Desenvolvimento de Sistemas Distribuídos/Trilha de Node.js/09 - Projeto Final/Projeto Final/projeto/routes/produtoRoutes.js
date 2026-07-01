const express = require("express");

const router = express.Router();

const controller = require("../controllers/produtoController");

// Listagem
router.get(
    "/",
    controller.listar
);

// Formulário de cadastro
router.get(
    "/novo",
    controller.formulario
);

// Salvar produto
router.post(
    "/novo",
    controller.criar
);

// Relatórios
router.get(
    "/estoque-baixo",
    controller.relatorioEstoque
);

router.get(
    "/mais-movimentados",
    controller.relatorioMovimentacao
);

module.exports = router;