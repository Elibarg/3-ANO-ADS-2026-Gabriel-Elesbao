// 4. Soma dos elementos de uma lista simplesmente encadeada (recursiva)

class Node {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function somaLista(node) {
    // Caso base: lista vazia
    if (node === null) return 0;
    // Soma o valor atual com a soma do restante
    return node.valor + somaLista(node.proximo);
}

// Criando lista: 10 -> 20 -> 30 -> 40
const head = new Node(10);
head.proximo = new Node(20);
head.proximo.proximo = new Node(30);
head.proximo.proximo.proximo = new Node(40);

console.log('Soma dos elementos da lista:', somaLista(head)); // 100