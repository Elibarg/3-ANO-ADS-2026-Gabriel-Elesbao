// 5. Busca em Árvore Binária de Busca (BST)

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Inserção para construir a BST (auxiliar)
function inserir(node, value) {
    if (node === null) return new Node(value);
    if (value < node.value) node.left = inserir(node.left, value);
    else if (value > node.value) node.right = inserir(node.right, value);
    return node;
}

// Busca recursiva
function buscar(node, valor) {
    if (node === null) return false; // não encontrado
    if (node.value === valor) return true;
    if (valor < node.value) return buscar(node.left, valor);
    else return buscar(node.right, valor);
}

// Construindo uma BST de exemplo
let root = null;
root = inserir(root, 50);
inserir(root, 30);
inserir(root, 20);
inserir(root, 40);
inserir(root, 70);
inserir(root, 60);
inserir(root, 80);

// Testes de busca
console.log('Buscar 40:', buscar(root, 40)); // true
console.log('Buscar 90:', buscar(root, 90)); // false

// Análise de complexidade:
// Em uma BST balanceada, a altura é O(log n), então busca O(log n).
// No pior caso (árvore degenerada), a altura é O(n) e a busca O(n).