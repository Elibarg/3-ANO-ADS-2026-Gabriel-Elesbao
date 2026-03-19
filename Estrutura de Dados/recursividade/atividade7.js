// 7. Contagem de nós em uma lista encadeada (recursiva)

class Node {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function contarNos(node) {
    // Caso base: lista vazia
    if (node === null) return 0;
    // 1 (nó atual) + contagem do restante
    return 1 + contarNos(node.proximo);
}

// Criando lista: 5 -> 15 -> 25 -> 35
const head = new Node(5);
head.proximo = new Node(15);
head.proximo.proximo = new Node(25);
head.proximo.proximo.proximo = new Node(35);

console.log('Número de nós na lista:', contarNos(head)); // 4

// Análise:
// Tempo: O(n) (percorre cada nó uma vez)
// Espaço (pilha de recursão): O(n) no pior caso (lista linear)