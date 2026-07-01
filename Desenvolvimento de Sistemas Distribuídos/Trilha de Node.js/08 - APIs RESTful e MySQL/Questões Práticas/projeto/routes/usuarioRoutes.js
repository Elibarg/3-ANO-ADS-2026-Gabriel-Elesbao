const express = require("express");

const router = express.Router();

const controller = require("../controllers/usuarioController");

router.get("/", controller.listar);

router.get("/novo", controller.formulario);

router.post("/novo", controller.criar);

module.exports = router;