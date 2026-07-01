const http = require("http");

const servidor = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Página Inicial");

    } else if (req.url === "/sobre") {
        res.end("Página Sobre");

    } else if (req.url === "/contato") {
        res.end("Página Contato");

    } else {
        res.writeHead(404);
        res.end("Página não encontrada");
    }

});

servidor.listen(3000, () => {
    console.log("Servidor executando.");
});