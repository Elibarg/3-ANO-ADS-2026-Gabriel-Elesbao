const fs = require("fs");

try {
    const dados = fs.readFileSync("arquivo_inexistente.txt", "utf8");
    console.log(dados);
} catch (erro) {
    console.log("Erro ao ler o arquivo.");
    console.error(erro.message);
}