class Node {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

class ListaSimples {
    constructor() {
        this.head = null;
    }

    // Inserir no início
    inserirInicio(valor) {
        const novo = new Node(valor);
        novo.proximo = this.head;
        this.head = novo;
    }

    // Inserir no final
    inserirFinal(valor) {
        const novo = new Node(valor);
        if (!this.head) {
            this.head = novo;
            return;
        }
        let atual = this.head;
        while (atual.proximo) {
            atual = atual.proximo;
        }
        atual.proximo = novo;
    }

    // Remover de posição específica (0‑based)
    removerPosicao(posicao) {
        if (posicao < 0 || !this.head) return null;
        if (posicao === 0) {
            const removido = this.head.valor;
            this.head = this.head.proximo;
            return removido;
        }
        let anterior = null;
        let atual = this.head;
        let contador = 0;
        while (atual && contador < posicao) {
            anterior = atual;
            atual = atual.proximo;
            contador++;
        }
        if (!atual) return null; // posição inválida
        anterior.proximo = atual.proximo;
        return atual.valor;
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

    // Método auxiliar para exibir a lista
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
lista.inserirInicio(10);
lista.inserirInicio(5);
lista.inserirFinal(20);
lista.inserirFinal(30);
lista.exibir(); // 5 -> 10 -> 20 -> 30
console.log('Buscar 20:', lista.buscar(20)); // 2
console.log('Remover pos 1:', lista.removerPosicao(1)); // 10
lista.exibir(); // 5 -> 20 -> 30