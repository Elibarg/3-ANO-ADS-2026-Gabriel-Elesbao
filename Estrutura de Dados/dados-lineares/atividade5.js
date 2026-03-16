class Fila {
    constructor() {
        this.elementos = [];
    }

    enqueue(valor) {
        this.elementos.push(valor);
    }

    dequeue() {
        if (this.estaVazia()) return null;
        return this.elementos.shift(); // O(n) – para fins didáticos
    }

    estaVazia() {
        return this.elementos.length === 0;
    }

    frente() {
        return this.estaVazia() ? null : this.elementos[0];
    }
}

// Testes
const fila = new Fila();
fila.enqueue('A');
fila.enqueue('B');
fila.enqueue('C');
console.log('Dequeue:', fila.dequeue()); // A
console.log('Frente:', fila.frente());   // B