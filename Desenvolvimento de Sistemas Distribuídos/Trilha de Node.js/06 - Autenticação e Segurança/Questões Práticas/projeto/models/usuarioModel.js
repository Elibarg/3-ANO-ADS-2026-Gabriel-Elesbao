const db = require("../config/database");

async function listarUsuarios() {

    const [usuarios] = await db.execute(

        "SELECT id, nome, email, role FROM usuarios ORDER BY id"

    );

    return usuarios;

}

async function inserirUsuario(nome, email, senha, role = "user") {

    await db.execute(

        "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",

        [nome, email, senha, role]

    );

}

module.exports = {

    listarUsuarios,

    inserirUsuario

};