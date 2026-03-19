// 2. Lista Simplesmente Encadeada

class Node {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

class ListaSimples {
    constructor() {
        this.head = null;
        this.tamanho = 0;
    }

    // Inserir no início
    inserirNoInicio(valor) {
        const novo = new Node(valor);
        novo.proximo = this.head;
        this.head = novo;
        this.tamanho++;
    }

    // Inserir no final
    inserirNoFinal(valor) {
        const novo = new Node(valor);
        if (!this.head) {
            this.head = novo;
        } else {
            let atual = this.head;
            while (atual.proximo) {
                atual = atual.proximo;
            }
            atual.proximo = novo;
        }
        this.tamanho++;
    }

    // Remover de posição específica (0-based)
    removerNaPosicao(posicao) {
        if (posicao < 0 || posicao >= this.tamanho) {
            console.log('Posição inválida');
            return null;
        }
        let removido;
        if (posicao === 0) {
            removido = this.head;
            this.head = this.head.proximo;
        } else {
            let atual = this.head;
            for (let i = 0; i < posicao - 1; i++) {
                atual = atual.proximo;
            }
            removido = atual.proximo;
            atual.proximo = atual.proximo.proximo;
        }
        this.tamanho--;
        return removido.valor;
    }

    // Buscar elemento por valor (retorna índice ou -1)
    buscar(valor) {
        let atual = this.head;
        let indice = 0;
        while (atual) {
            if (atual.valor === valor) return indice;
            atual = atual.proximo;
            indice++;
        }
        return -1;
    }

    // Exibir lista
    exibir() {
        const valores = [];
        let atual = this.head;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log(valores.join(' -> '));
    }
}

// Testes
const lista = new ListaSimples();
lista.inserirNoInicio(10);
lista.inserirNoInicio(5);
lista.inserirNoFinal(20);
lista.inserirNoFinal(30);
lista.exibir(); // 5 -> 10 -> 20 -> 30

console.log('Removido na posição 2:', lista.removerNaPosicao(2)); // 20
lista.exibir(); // 5 -> 10 -> 30

console.log('Buscar 10:', lista.buscar(10)); // 1
console.log('Buscar 99:', lista.buscar(99)); // -1