class Node {
    constructor(valor) {
        this.valor = valor;
        this.left = null;
        this.right = null;
    }
}

function inOrder(node) {
    if (!node) return;

    inOrder(node.left);
    console.log(node.valor);
    inOrder(node.right);
}

function preOrder(node) {
    if (!node) return;

    console.log(node.valor);
    preOrder(node.left);
    preOrder(node.right);
}

function postOrder(node) {
    if (!node) return;

    postOrder(node.left);
    postOrder(node.right);
    console.log(node.valor);
}