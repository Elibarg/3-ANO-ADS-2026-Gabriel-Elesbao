const fs = require("fs");

const stream = fs.createReadStream("arquivoGrande.txt", "utf8");

stream.on("data", (chunk) => {
    console.log(chunk);
});

stream.on("end", () => {
    console.log("Leitura finalizada.");
});

stream.on("error", (err) => {
    console.error(err);
});