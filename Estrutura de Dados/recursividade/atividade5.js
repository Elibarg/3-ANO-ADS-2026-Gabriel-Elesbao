class NoBST {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

function buscarBST(raiz, alvo) {
    if (!raiz) return false;
    if (raiz.valor === alvo) return true;
    if (alvo < raiz.valor) return buscarBST(raiz.esquerda, alvo);
    else return buscarBST(raiz.direita, alvo);
}

// Construindo BST:
//        5
//       / \
//      3   8
//     / \   \
//    2   4   9
const raizBST = new NoBST(5);
raizBST.esquerda = new NoBST(3);
raizBST.direita = new NoBST(8);
raizBST.esquerda.esquerda = new NoBST(2);
raizBST.esquerda.direita = new NoBST(4);
raizBST.direita.direita = new NoBST(9);

console.log('Buscar 4:', buscarBST(raizBST, 4)); // true
console.log('Buscar 7:', buscarBST(raizBST, 7)); // false

// Complexidade: O(h) onde h é a altura da árvore. Em uma árvore balanceada, O(log n). No pior caso (degenerada), O(n).