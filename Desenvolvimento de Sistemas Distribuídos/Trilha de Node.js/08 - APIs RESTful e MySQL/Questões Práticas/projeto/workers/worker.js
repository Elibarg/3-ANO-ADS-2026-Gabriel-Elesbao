const { Worker } = require("worker_threads");

const path = require("path");

const logger = require("../config/logger");

function executarWorker(){

    return new Promise((resolve,reject)=>{

        logger.info("Worker iniciado.");

        const worker=new Worker(

            path.join(__dirname,"../workers/worker.js")

        );

        worker.on("message",(resultado)=>{

            logger.info(

                `Resultado do Worker: ${resultado}`

            );

            resolve(resultado);

        });

        worker.on("error",(erro)=>{

            logger.error(erro.message);

            reject(erro);

        });

    });

}

module.exports={

    executarWorker

};