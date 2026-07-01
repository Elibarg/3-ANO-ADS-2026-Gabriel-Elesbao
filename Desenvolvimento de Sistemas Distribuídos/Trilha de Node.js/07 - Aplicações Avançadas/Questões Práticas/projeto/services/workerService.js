const { Worker } = require("worker_threads");
const path = require("path");

function executarWorker() {

    return new Promise((resolve, reject) => {

        const worker = new Worker(

            path.join(__dirname, "../workers/worker.js")

        );

        worker.on("message", (resultado) => {

            resolve(resultado);

        });

        worker.on("error", (erro) => {

            reject(erro);

        });

    });

}

module.exports = {

    executarWorker

};