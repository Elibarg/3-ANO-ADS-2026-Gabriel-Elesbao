const fs = require("fs");

fs.readFile("usuario.json", "utf8", (err, dados) => {
    if (err) throw err;

    const usuario = JSON.parse(dados);

    console.log(usuario);
});