class Node {
    constructor(valor) {
        this.valor = valor;
        this.next = null;
        this.prev = null;
    }
}

class ListaDupla {
    constructor() {
        this.head = null;
    }

    inserirInicio(valor) {
        const novo = new Node(valor);

        if (this.head) {
            this.head.prev = novo;
            novo.next = this.head;
        }

        this.head = novo;
    }

    removerFinal() {
        if (!this.head) return;

        let atual = this.head;

        while (atual.next) {
            atual = atual.next;
        }

        if (atual.prev) {
            atual.prev.next = null;
        } else {
            this.head = null;
        }
    }

    percorrer() {
        let atual = this.head;

        while (atual) {
            console.log(atual.valor);
            atual = atual.next;
        }
    }
}