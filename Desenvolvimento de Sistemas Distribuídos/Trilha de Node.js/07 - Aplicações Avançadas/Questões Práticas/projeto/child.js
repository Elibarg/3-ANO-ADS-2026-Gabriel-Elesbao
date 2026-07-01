const { exec } = require("child_process");

exec(

    "node -v",

    (erro, stdout, stderr) => {

        if (erro) {

            console.log(erro);

            return;

        }

        console.log("Versão do Node:");

        console.log(stdout);

    }

);