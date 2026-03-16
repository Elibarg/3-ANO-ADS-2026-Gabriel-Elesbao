class Node {
    constructor(valor) {
        this.valor = valor;
        this.next = null;
    }
}

class ListaSimples {
    constructor() {
        this.head = null;
    }

    inserirInicio(valor) {
        const novo = new Node(valor);
        novo.next = this.head;
        this.head = novo;
    }

    inserirFinal(valor) {
        const novo = new Node(valor);

        if (!this.head) {
            this.head = novo;
            return;
        }

        let atual = this.head;
        while (atual.next) {
            atual = atual.next;
        }

        atual.next = novo;
    }

    removerPosicao(pos) {
        if (!this.head) return;

        if (pos === 0) {
            this.head = this.head.next;
            return;
        }

        let atual = this.head;
        let anterior = null;
        let i = 0;

        while (atual && i < pos) {
            anterior = atual;
            atual = atual.next;
            i++;
        }

        if (atual) {
            anterior.next = atual.next;
        }
    }

    buscar(valor) {
        let atual = this.head;

        while (atual) {
            if (atual.valor === valor) {
                return true;
            }
            atual = atual.next;
        }

        return false;
    }
}