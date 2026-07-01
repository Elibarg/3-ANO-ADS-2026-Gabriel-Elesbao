const axios = require("axios");

async function buscarPosts() {

    try {

        const resposta = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );

        return resposta.data;

    } catch (erro) {

        console.error("Erro ao acessar API:", erro.message);

        return [];

    }

}

module.exports = {

    buscarPosts

};