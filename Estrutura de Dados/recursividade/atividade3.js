class No {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

// Construindo uma árvore de exemplo:
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

function inOrder(no) {
    if (no) {
        inOrder(no.esquerda);
        console.log(no.valor);
        inOrder(no.direita);
    }
}

function preOrder(no) {
    if (no) {
        console.log(no.valor);
        preOrder(no.esquerda);
        preOrder(no.direita);
    }
}

function postOrder(no) {
    if (no) {
        postOrder(no.esquerda);
        postOrder(no.direita);
        console.log(no.valor);
    }
}

console.log('In-order:');
inOrder(raiz); // 4 2 5 1 3
console.log('Pre-order:');
preOrder(raiz); // 1 2 4 5 3
console.log('Post-order:');
postOrder(raiz); // 4 5 2 3 1