class NoBST {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

class BST {
    constructor() {
        this.raiz = null;
    }

    inserir(valor) {
        this.raiz = this._inserirRec(this.raiz, valor);
    }

    _inserirRec(no, valor) {
        if (!no) return new NoBST(valor);
        if (valor < no.valor) no.esquerda = this._inserirRec(no.esquerda, valor);
        else if (valor > no.valor) no.direita = this._inserirRec(no.direita, valor);
        return no;
    }

    buscar(valor) {
        return this._buscarRec(this.raiz, valor);
    }

    _buscarRec(no, valor) {
        if (!no) return false;
        if (no.valor === valor) return true;
        return valor < no.valor
            ? this._buscarRec(no.esquerda, valor)
            : this._buscarRec(no.direita, valor);
    }

    remover(valor) {
        this.raiz = this._removerRec(this.raiz, valor);
    }

    _removerRec(no, valor) {
        if (!no) return null;
        if (valor < no.valor) {
            no.esquerda = this._removerRec(no.esquerda, valor);
            return no;
        } else if (valor > no.valor) {
            no.direita = this._removerRec(no.direita, valor);
            return no;
        } else {
            // Caso 1: nó folha
            if (!no.esquerda && !no.direita) return null;
            // Caso 2: um filho
            if (!no.esquerda) return no.direita;
            if (!no.direita) return no.esquerda;
            // Caso 3: dois filhos – pegar o menor da subárvore direita (sucessor)
            let sucessor = this._menorValor(no.direita);
            no.valor = sucessor;
            no.direita = this._removerRec(no.direita, sucessor);
            return no;
        }
    }

    _menorValor(no) {
        let atual = no;
        while (atual.esquerda) atual = atual.esquerda;
        return atual.valor;
    }

    // Para visualização
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

// Teste
const bst = new BST();
bst.inserir(50);
bst.inserir(30);
bst.inserir(70);
bst.inserir(20);
bst.inserir(40);
bst.inserir(60);
bst.inserir(80);
console.log('BST in-order:', bst.inOrder()); // [20,30,40,50,60,70,80]
console.log('Buscar 40:', bst.buscar(40));   // true
bst.remover(40);
console.log('Após remover 40:', bst.inOrder()); // [20,30,50,60,70,80]