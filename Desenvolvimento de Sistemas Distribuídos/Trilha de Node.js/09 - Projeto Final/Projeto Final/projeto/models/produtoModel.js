const db = require("../config/database");

async function listarProdutos() {

    const [produtos] = await db.execute(

        `SELECT
            id,
            nome,
            categoria,
            quantidade,
            preco
        FROM produtos
        ORDER BY nome`

    );

    return produtos;

}

async function buscarPorId(id) {

    const [produtos] = await db.execute(

        `SELECT
            id,
            nome,
            categoria,
            quantidade,
            preco
        FROM produtos
        WHERE id = ?`,

        [id]

    );

    return produtos[0];

}

async function inserirProduto(

    nome,

    categoria,

    quantidade,

    preco

) {

    const [resultado] = await db.execute(

        `INSERT INTO produtos
        (
            nome,
            categoria,
            quantidade,
            preco
        )
        VALUES (?, ?, ?, ?)`,

        [

            nome,

            categoria,

            quantidade,

            preco

        ]

    );

    return resultado.insertId;

}

async function atualizarProduto(

    id,

    nome,

    categoria,

    quantidade,

    preco

) {

    const [resultado] = await db.execute(

        `UPDATE produtos
        SET

            nome=?,

            categoria=?,

            quantidade=?,

            preco=?

        WHERE id=?`,

        [

            nome,

            categoria,

            quantidade,

            preco,

            id

        ]

    );

    return resultado.affectedRows;

}

async function excluirProduto(id) {

    const [resultado] = await db.execute(

        "DELETE FROM produtos WHERE id=?",

        [

            id

        ]

    );

    return resultado.affectedRows;

}

async function alterarQuantidade(

    id,

    quantidade

) {

    const [resultado] = await db.execute(

        `UPDATE produtos

        SET quantidade=?

        WHERE id=?`,

        [

            quantidade,

            id

        ]

    );

    return resultado.affectedRows;

}

async function listarEstoqueBaixo(

    limite = 10

) {

    const [produtos] = await db.execute(

        `SELECT

            id,

            nome,

            categoria,

            quantidade,

            preco

        FROM produtos

        WHERE quantidade <= ?

        ORDER BY quantidade ASC`,

        [

            limite

        ]

    );

    return produtos;

}

async function produtosMaisMovimentados() {

    const [produtos] = await db.execute(

        `SELECT

            p.id,

            p.nome,

            SUM(m.quantidade) AS total

        FROM produtos p

        INNER JOIN movimentacoes m

            ON p.id = m.produto_id

        GROUP BY

            p.id,

            p.nome

        ORDER BY total DESC

        LIMIT 10`

    );

    return produtos;

}

module.exports = {

    listarProdutos,

    buscarPorId,

    inserirProduto,

    atualizarProduto,

    excluirProduto,

    alterarQuantidade,

    listarEstoqueBaixo,

    produtosMaisMovimentados

};