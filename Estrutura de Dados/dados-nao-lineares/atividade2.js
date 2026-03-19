// 2. Árvore AVL com inserção e remoção

class NodeAVL {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // altura da subárvore
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Retorna a altura do nó
    altura(node) {
        return node ? node.height : 0;
    }

    // Atualiza a altura do nó
    atualizarAltura(node) {
        node.height = Math.max(this.altura(node.left), this.altura(node.right)) + 1;
    }

    // Fator de balanceamento
    fatorBalanceamento(node) {
        return node ? this.altura(node.left) - this.altura(node.right) : 0;
    }

    // Rotação à direita
    rotacaoDireita(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.atualizarAltura(y);
        this.atualizarAltura(x);
        return x;
    }

    // Rotação à esquerda
    rotacaoEsquerda(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.atualizarAltura(x);
        this.atualizarAltura(y);
        return y;
    }

    // Inserção
    inserir(value) {
        this.root = this._inserir(this.root, value);
    }

    _inserir(node, value) {
        if (!node) return new NodeAVL(value);

        if (value < node.value) {
            node.left = this._inserir(node.left, value);
        } else if (value > node.value) {
            node.right = this._inserir(node.right, value);
        } else {
            return node; // valores duplicados não permitidos
        }

        this.atualizarAltura(node);
        return this.balancear(node);
    }

    // Remoção
    remover(value) {
        this.root = this._remover(this.root, value);
    }

    _remover(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this._remover(node.left, value);
        } else if (value > node.value) {
            node.right = this._remover(node.right, value);
        } else {
            // Casos de remoção
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                // Nó com dois filhos: pegar o sucessor (menor da direita)
                let sucessor = node.right;
                while (sucessor.left) sucessor = sucessor.left;
                node.value = sucessor.value;
                node.right = this._remover(node.right, sucessor.value);
            }
        }

        if (!node) return null;

        this.atualizarAltura(node);
        return this.balancear(node);
    }

    // Balanceamento após inserção/remoção
    balancear(node) {
        const fb = this.fatorBalanceamento(node);

        // Rotação à direita
        if (fb > 1 && this.fatorBalanceamento(node.left) >= 0) {
            return this.rotacaoDireita(node);
        }
        // Rotação à esquerda
        if (fb < -1 && this.fatorBalanceamento(node.right) <= 0) {
            return this.rotacaoEsquerda(node);
        }
        // Rotação dupla esquerda-direita
        if (fb > 1 && this.fatorBalanceamento(node.left) < 0) {
            node.left = this.rotacaoEsquerda(node.left);
            return this.rotacaoDireita(node);
        }
        // Rotação dupla direita-esquerda
        if (fb < -1 && this.fatorBalanceamento(node.right) > 0) {
            node.right = this.rotacaoDireita(node.right);
            return this.rotacaoEsquerda(node);
        }
        return node;
    }

    // Exibição in-order
    inOrder(node = this.root) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }
}

// Teste AVL
const avl = new AVLTree();
[10, 20, 30, 40, 50, 25].forEach(v => avl.inserir(v));
console.log('AVL in-order após inserções:');
avl.inOrder(); // 10 20 25 30 40 50

avl.remover(40);
console.log('Após remover 40:');
avl.inOrder(); // 10 20 25 30 50