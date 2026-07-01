const express = require("express");

const router = express.Router();

const movimentacaoController =

require("../controllers/movimentacaoController");

router.get(

    "/movimentacoes",

    movimentacaoController.apiListar

);

router.post(

    "/movimentacoes",

    movimentacaoController.apiMovimentar

);

module.exports = router;