const db = require("../config/database");

async function listarUsuarios() {

    const [usuarios] = await db.execute(

        "SELECT * FROM usuarios ORDER BY id"

    );

    return usuarios;

}

async function inserirUsuario(nome) {

    await db.execute(

        "INSERT INTO usuarios(nome) VALUES(?)",

        [nome]

    );

}

module.exports = {

    listarUsuarios,

    inserirUsuario

};