const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.get(
    "/usuarios",
    usuarioController.apiListar
);

router.post(
    "/usuarios",
    usuarioController.apiCriar
);

router.put(
    "/usuarios/:id",
    usuarioController.apiAtualizar
);

router.delete(
    "/usuarios/:id",
    usuarioController.apiExcluir
);

module.exports = router;