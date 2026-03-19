// 3. Lista Duplamente Encadeada

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
        this.tamanho = 0;
    }

    // Inserir no início
    inserirNoInicio(valor) {
        const novo = new NodeDuplo(valor);
        if (!this.head) {
            this.head = this.tail = novo;
        } else {
            novo.proximo = this.head;
            this.head.anterior = novo;
            this.head = novo;
        }
        this.tamanho++;
    }

    // Remover do final
    removerDoFinal() {
        if (!this.tail) return null;
        const removido = this.tail;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.anterior;
            this.tail.proximo = null;
        }
        this.tamanho--;
        return removido.valor;
    }

    // Percorrer da head à tail (direção normal)
    percorrerFrente() {
        const valores = [];
        let atual = this.head;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log('Head -> Tail:', valores.join(' <-> '));
    }

    // Percorrer da tail à head (direção inversa)
    percorrerTras() {
        const valores = [];
        let atual = this.tail;
        while (atual) {
            valores.push(atual.valor);
            atual = atual.anterior;
        }
        console.log('Tail -> Head:', valores.join(' <-> '));
    }
}

// Testes
const listaDupla = new ListaDupla();
listaDupla.inserirNoInicio(30);
listaDupla.inserirNoInicio(20);
listaDupla.inserirNoInicio(10);
listaDupla.percorrerFrente(); // 10 <-> 20 <-> 30
listaDupla.percorrerTras();    // 30 <-> 20 <-> 10

console.log('Removido do final:', listaDupla.removerDoFinal()); // 30
listaDupla.percorrerFrente(); // 10 <-> 20