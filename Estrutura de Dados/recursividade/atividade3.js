// 3. Travessias em Árvore Binária (in-order, pre-order, post-order)

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Percurso in-order (esquerda, raiz, direita)
function inOrder(node) {
    if (node !== null) {
        inOrder(node.left);
        console.log(node.value);
        inOrder(node.right);
    }
}

// Percurso pre-order (raiz, esquerda, direita)
function preOrder(node) {
    if (node !== null) {
        console.log(node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
}

// Percurso post-order (esquerda, direita, raiz)
function postOrder(node) {
    if (node !== null) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.value);
    }
}

// Construindo uma árvore de exemplo:
//        1
//       / \
//      2   3
//     / \
//    4   5
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

console.log('In-order:');
inOrder(root);   // 4 2 5 1 3

console.log('Pre-order:');
preOrder(root);  // 1 2 4 5 3

console.log('Post-order:');
postOrder(root); // 4 5 2 3 1