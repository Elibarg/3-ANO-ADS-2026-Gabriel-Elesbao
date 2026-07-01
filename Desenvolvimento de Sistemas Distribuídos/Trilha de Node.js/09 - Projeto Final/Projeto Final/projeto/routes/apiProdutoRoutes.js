const express = require("express");

const router = express.Router();

const controller = require("../controllers/produtoController");

// Listar produtos
router.get(
    "/produtos",
    controller.apiListar
);

// Cadastrar produto
router.post(
    "/produtos",
    controller.apiCriar
);

// Atualizar produto
router.put(
    "/produtos/:id",
    controller.apiAtualizar
);

// Excluir produto
router.delete(
    "/produtos/:id",
    controller.apiExcluir
);

module.exports = router;