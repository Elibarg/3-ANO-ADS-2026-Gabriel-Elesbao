const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = require("../models/authModel");

function telaLogin(req, res) {

    res.render("login", {
        title: "Login",
        erro: null,
        csrfToken: req.csrfToken()
    });

}

async function login(req, res) {

    try {

        const { email, senha } = req.body;

        const usuario = await authModel.buscarPorEmail(email);

        if (!usuario) {

            return res.render("login", {
                title: "Login",
                erro: "Usuário não encontrado.",
                csrfToken: req.csrfToken()
            });

        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {

            return res.render("login", {
                title: "Login",
                erro: "Senha incorreta.",
                csrfToken: req.csrfToken()
            });

        }

        // Salva dados na sessão
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            role: usuario.role
        };

        // Gera o JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                role: usuario.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        // Armazena o token em um cookie
        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                secure: false, // Em produção (HTTPS), altere para true
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 2 // 2 horas
            }
        );

        res.redirect("/perfil");

    } catch (erro) {

        console.error(erro);

        res.status(500).send("Erro interno do servidor.");

    }

}

function logout(req, res) {

    req.session.destroy(() => {

        res.clearCookie("token");

        res.redirect("/login");

    });

}

module.exports = {

    telaLogin,

    login,

    logout

};