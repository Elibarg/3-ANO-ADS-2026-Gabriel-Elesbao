const db = require("../config/database");

async function listarUsuarios(opcoes = {}) {

    const page = Number(opcoes.page) || 1;

    const limit = Number(opcoes.limit) || 10;

    const offset = (page - 1) * limit;

    const nome = opcoes.nome || "";

    let sql = `
        SELECT
            id,
            nome,
            email,
            role
        FROM usuarios
    `;

    const parametros = [];

    if (nome) {

        sql += " WHERE nome LIKE ? ";

        parametros.push(`%${nome}%`);

    }

    sql += " ORDER BY id LIMIT ? OFFSET ? ";

    parametros.push(limit);

    parametros.push(offset);

    const [usuarios] = await db.execute(

        sql,

        parametros

    );

    return usuarios;

}

async function inserirUsuario(nome, email, senha, role = "user") {

    const [resultado] = await db.execute(

        "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",

        [nome, email, senha, role]

    );

    return resultado.insertId;

}

async function atualizarUsuario(id, dados) {

    const campos = [];

    const valores = [];

    if (dados.nome) {

        campos.push("nome=?");

        valores.push(dados.nome);

    }

    if (dados.email) {

        campos.push("email=?");

        valores.push(dados.email);

    }

    if (dados.senha) {

        campos.push("senha=?");

        valores.push(dados.senha);

    }

    if (campos.length === 0) {

        return 0;

    }

    valores.push(id);

    const [resultado] = await db.execute(

        `UPDATE usuarios SET ${campos.join(", ")} WHERE id=?`,

        valores

    );

    return resultado.affectedRows;

}

async function excluirUsuario(id) {

    const [resultado] = await db.execute(

        "DELETE FROM usuarios WHERE id=?",

        [id]

    );

    return resultado.affectedRows;

}

module.exports = {

    listarUsuarios,

    inserirUsuario,

    atualizarUsuario,

    excluirUsuario

};