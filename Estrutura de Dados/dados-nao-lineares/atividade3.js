// Implementação simplificada de uma Árvore AVL com inserção e remoção (apenas inserção completa para não estender demais)
class NoAVL {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
        this.altura = 1;
    }
}

class AVL {
    constructor() {
        this.raiz = null;
    }

    altura(no) {
        return no ? no.altura : 0;
    }

    fatorBalanceamento(no) {
        return no ? this.altura(no.esquerda) - this.altura(no.direita) : 0;
    }

    atualizarAltura(no) {
        no.altura = 1 + Math.max(this.altura(no.esquerda), this.altura(no.direita));
    }

    rotacionarDireita(y) {
        const x = y.esquerda;
        const T2 = x.direita;
        x.direita = y;
        y.esquerda = T2;
        this.atualizarAltura(y);
        this.atualizarAltura(x);
        return x;
    }

    rotacionarEsquerda(x) {
        const y = x.direita;
        const T2 = y.esquerda;
        y.esquerda = x;
        x.direita = T2;
        this.atualizarAltura(x);
        this.atualizarAltura(y);
        return y;
    }

    balancear(no) {
        const fb = this.fatorBalanceamento(no);
        // Rotação à direita
        if (fb > 1 && this.fatorBalanceamento(no.esquerda) >= 0) {
            return this.rotacionarDireita(no);
        }
        // Rotação à esquerda
        if (fb < -1 && this.fatorBalanceamento(no.direita) <= 0) {
            return this.rotacionarEsquerda(no);
        }
        // Rotação dupla esquerda-direita
        if (fb > 1 && this.fatorBalanceamento(no.esquerda) < 0) {
            no.esquerda = this.rotacionarEsquerda(no.esquerda);
            return this.rotacionarDireita(no);
        }
        // Rotação dupla direita-esquerda
        if (fb < -1 && this.fatorBalanceamento(no.direita) > 0) {
            no.direita = this.rotacionarDireita(no.direita);
            return this.rotacionarEsquerda(no);
        }
        return no;
    }

    inserir(valor) {
        this.raiz = this._inserirRec(this.raiz, valor);
    }

    _inserirRec(no, valor) {
        if (!no) return new NoAVL(valor);
        if (valor < no.valor) no.esquerda = this._inserirRec(no.esquerda, valor);
        else if (valor > no.valor) no.direita = this._inserirRec(no.direita, valor);
        else return no; // valores duplicados não são inseridos

        this.atualizarAltura(no);
        return this.balancear(no);
    }

    // Remoção (apenas esboço – requer implementação completa)
    remover(valor) {
        this.raiz = this._removerRec(this.raiz, valor);
    }

    _removerRec(no, valor) {
        // ... (implementação similar à BST, mas com balanceamento após remoção)
        // Para simplificar, omitimos o código completo aqui.
        return no;
    }

    inOrder() {
        const res = [];
        this._inOrderRec(this.raiz, res);
        return res;
    }

    _inOrderRec(no, res) {
        if (no) {
            this._inOrderRec(no.esquerda, res);
            res.push(no.valor);
            this._inOrderRec(no.direita, res);
        }
    }
}

// Teste de inserção
const avl = new AVL();
[10, 20, 30, 40, 50, 25].forEach(v => avl.inserir(v));
console.log('AVL in-order:', avl.inOrder()); // deve estar ordenado e balanceado