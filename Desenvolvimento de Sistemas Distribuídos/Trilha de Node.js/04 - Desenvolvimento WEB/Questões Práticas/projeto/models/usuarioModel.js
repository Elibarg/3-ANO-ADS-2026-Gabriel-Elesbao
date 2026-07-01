const db = require("../config/database");

async function listarUsuarios() {

    const [usuarios] = await db.execute(
        "SELECT * FROM usuarios"
    );

    return usuarios;

}

async function buscarPorId(id) {

    const [usuario] = await db.execute(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
    );

    return usuario[0];

}

async function inserirUsuario(nome) {

    const [resultado] = await db.execute(
        "INSERT INTO usuarios(nome) VALUES(?)",
        [nome]
    );

    return resultado.insertId;

}

async function atualizarUsuario(id, nome) {

    await db.execute(
        "UPDATE usuarios SET nome = ? WHERE id = ?",
        [nome, id]
    );

}

async function excluirUsuario(id) {

    await db.execute(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );

}

module.exports = {

    listarUsuarios,
    buscarPorId,
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario

};