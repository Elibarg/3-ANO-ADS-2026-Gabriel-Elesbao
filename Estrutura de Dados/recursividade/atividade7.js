class NoLista {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function contarNos(no) {
    if (!no) return 0;
    return 1 + contarNos(no.proximo);
}

// Lista: 5 -> 10 -> 15
const head = new NoLista(5);
head.proximo = new NoLista(10);
head.proximo.proximo = new NoLista(15);

console.log('Número de nós:', contarNos(head)); // 3
// Complexidade de tempo: O(n) – percorre cada nó uma vez.
// Complexidade de espaço: O(n) devido à pilha de chamadas recursivas.