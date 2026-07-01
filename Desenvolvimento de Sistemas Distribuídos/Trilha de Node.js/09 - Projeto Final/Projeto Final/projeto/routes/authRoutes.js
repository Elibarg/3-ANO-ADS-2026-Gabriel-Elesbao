const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const verificar = require("../middlewares/authMiddleware");
const permitir = require("../middlewares/roleMiddleware");

// Tela de Login
router.get("/login", authController.telaLogin);

// Processa Login
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

// Perfil protegido
router.get("/perfil", verificar, (req, res) => {

    res.send(`

        <h1>Bem-vindo ${req.usuario.nome}</h1>

        <p>Perfil protegido por JWT.</p>

        <p>Seu perfil é: <strong>${req.usuario.role}</strong></p>

        <a href="/logout">Logout</a>

    `);

});

// Área exclusiva para administradores
router.get("/admin", verificar, permitir("admin"), (req, res) => {

    res.send(`

        <h1>Painel Administrativo</h1>

        <p>Bem-vindo, ${req.usuario.nome}!</p>

        <p>Esta página só pode ser acessada por administradores.</p>

        <a href="/perfil">Voltar ao Perfil</a>

    `);

});

module.exports = router;