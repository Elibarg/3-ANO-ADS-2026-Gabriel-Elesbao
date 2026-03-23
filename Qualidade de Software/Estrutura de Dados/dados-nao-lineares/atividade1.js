// 1. Árvores Binárias e Árvore Binária de Busca (BST)

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// --- Árvore Binária Simples (para percursos) ---
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

// Percursos
function inOrder(node) {
    if (node) {
        inOrder(node.left);
        console.log(node.value);
        inOrder(node.right);
    }
}

function preOrder(node) {
    if (node) {
        console.log(node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
}

function postOrder(node) {
    if (node) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.value);
    }
}

console.log('In-order:');
inOrder(root); // 4 2 5 1 3
console.log('Pre-order:');
preOrder(root); // 1 2 4 5 3
console.log('Post-order:');
postOrder(root); // 4 5 2 3 1

// --- Árvore Binária de Busca (BST) ---
class BST {
    constructor() {
        this.root = null;
    }

    inserir(value) {
        const novo = new Node(value);
        if (!this.root) {
            this.root = novo;
            return;
        }
        let atual = this.root;
        while (true) {
            if (value < atual.value) {
                if (!atual.left) {
                    atual.left = novo;
                    return;
                }
                atual = atual.left;
            } else {
                if (!atual.right) {
                    atual.right = novo;
                    return;
                }
                atual = atual.right;
            }
        }
    }

    buscar(value) {
        let atual = this.root;
        while (atual) {
            if (value === atual.value) return true;
            if (value < atual.value) atual = atual.left;
            else atual = atual.right;
        }
        return false;
    }

    // Remove um nó (versão simplificada, trata todos os casos)
    remover(value) {
        this.root = this._removerNode(this.root, value);
    }

    _removerNode(node, value) {
        if (!node) return null;
        if (value < node.value) {
            node.left = this._removerNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this._removerNode(node.right, value);
            return node;
        } else {
            // Caso 1: nó folha
            if (!node.left && !node.right) return null;
            // Caso 2: apenas um filho
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            // Caso 3: dois filhos
            // Encontrar o menor valor da subárvore direita (sucessor)
            let sucessor = node.right;
            while (sucessor.left) sucessor = sucessor.left;
            node.value = sucessor.value;
            node.right = this._removerNode(node.right, sucessor.value);
            return node;
        }
    }

    // Exibição in-order para verificar
    inOrder(node = this.root) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }
}

// Teste BST
const bst = new BST();
[50, 30, 70, 20, 40, 60, 80].forEach(v => bst.inserir(v));
console.log('BST in-order:');
bst.inOrder(); // 20 30 40 50 60 70 80

console.log('Buscar 40:', bst.buscar(40)); // true
console.log('Buscar 100:', bst.buscar(100)); // false

bst.remover(50);
console.log('Após remover 50:');
bst.inOrder(); // 20 30 40 60 70 80