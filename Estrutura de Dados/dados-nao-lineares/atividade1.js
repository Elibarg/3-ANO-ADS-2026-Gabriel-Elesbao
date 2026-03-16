class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

// Árvore:
//        1
//       / \
//      2   3
//     / \
//    4   5
const raiz = new No(1);
raiz.esquerda = new No(2);
raiz.direita = new No(3);
raiz.esquerda.esquerda = new No(4);
raiz.esquerda.direita = new No(5);

function inOrder(no, resultado = []) {
    if (no) {
        inOrder(no.esquerda, resultado);
        resultado.push(no.valor);
        inOrder(no.direita, resultado);
    }
    return resultado;
}

function preOrder(no, resultado = []) {
    if (no) {
        resultado.push(no.valor);
        preOrder(no.esquerda, resultado);
        preOrder(no.direita, resultado);
    }
    return resultado;
}

function postOrder(no, resultado = []) {
    if (no) {
        postOrder(no.esquerda, resultado);
        postOrder(no.direita, resultado);
        resultado.push(no.valor);
    }
    return resultado;
}

console.log('In-order:', inOrder(raiz));   // [4,2,5,1,3]
console.log('Pre-order:', preOrder(raiz)); // [1,2,4,5,3]
console.log('Post-order:', postOrder(raiz)); // [4,5,2,3,1]