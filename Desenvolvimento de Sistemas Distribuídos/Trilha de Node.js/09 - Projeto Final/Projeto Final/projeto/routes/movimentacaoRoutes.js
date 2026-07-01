const express = require("express");

const router = express.Router();

const controller =

require("../controllers/movimentacaoController");

router.get(

    "/",

    controller.listar

);

router.post(

    "/",

    controller.movimentar

);

module.exports = router;