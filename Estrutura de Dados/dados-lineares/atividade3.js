class NodeDuplo {
    constructor(valor) {
        this.valor = valor;
        this.anterior = null;
        this.proximo = null;
    }
}

class ListaDupla {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Inserir no início
    inserirInicio(valor) {
        const novo = new NodeDuplo(valor);
        if (!this.head) {
            this.head = this.tail = novo;
            return;
        }
        novo.proximo = this.head;
        this.head.anterior = novo;
        this.head = novo;
    }

    // Remover do final
    removerFinal() {
        if (!this.tail) return null;
        const removido = this.tail.valor;
        if (this.head === this.tail) { // apenas um nó
            this.head = this.tail = null;
            return removido;
        }
        this.tail = this.tail.anterior;
        this.tail.proximo = null;
        return removido;
    }

    // Percorrer da esquerda para a direita e imprimir
    percorrerFrente() {
        const valores = [];
        let atual = this.head;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log('Frente:', valores.join(' <-> '));
    }

    // Percorrer da direita para a esquerda e imprimir
    percorrerTras() {
        const valores = [];
        let atual = this.tail;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.anterior;
        }
        console.log('Trás:  ', valores.join(' <-> '));
    }
}

// Testes
const listaD = new ListaDupla();
listaD.inserirInicio(30);
listaD.inserirInicio(20);
listaD.inserirInicio(10);
listaD.percorrerFrente(); // 10 <-> 20 <-> 30
listaD.percorrerTras();   // 30 <-> 20 <-> 10
console.log('Remover final:', listaD.removerFinal()); // 30
listaD.percorrerFrente(); // 10 <-> 20