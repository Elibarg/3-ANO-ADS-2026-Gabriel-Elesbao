const db = require("../config/database");

async function buscarPorEmail(email) {

    const [usuarios] = await db.execute(

        "SELECT * FROM usuarios WHERE email = ?",

        [email]

    );

    return usuarios[0];

}

module.exports = {

    buscarPorEmail

};