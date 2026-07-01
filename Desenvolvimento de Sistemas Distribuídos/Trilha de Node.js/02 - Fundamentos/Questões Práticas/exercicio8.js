const { Transform } = require("stream");

const transformar = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

transformar.on("data", (dados) => {
    console.log(dados.toString());
});

transformar.write("Node.js é incrível!");
transformar.end();