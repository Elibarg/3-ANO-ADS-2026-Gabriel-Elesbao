const fs = require("fs");

fs.writeFile("mensagem.txt", "Olá, Node.js!", (err) => {
    if (err) throw err;

    fs.readFile("mensagem.txt", "utf8", (err, dados) => {
        if (err) throw err;

        console.log(dados);
    });
});