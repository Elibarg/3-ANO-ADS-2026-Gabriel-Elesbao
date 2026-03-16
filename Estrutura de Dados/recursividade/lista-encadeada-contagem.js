// lista-encadeada-contagem.js
// Exercício 7: Contagem de nós em lista encadeada (recursiva)

class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function contarNos(no) {
    if (!no) return 0;
    return 1 + contarNos(no.proximo);
}
// Complexidade tempo: O(n), espaço: O(n)

// Teste
let lista = new No(10);
lista.proximo = new No(20);
lista.proximo.proximo = new No(30);
lista.proximo.proximo.proximo = new No(40);
console.log("Número de nós:", contarNos(lista)); // 4