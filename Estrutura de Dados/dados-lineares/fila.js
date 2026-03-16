// fila.js
// Exercício 5a: Fila Simples

class FilaSimples {
    constructor() {
        this.itens = [];
    }

    enqueue(valor) {
        this.itens.push(valor);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.itens.shift(); // O(n) – deslocamento
    }

    isEmpty() {
        return this.itens.length === 0;
    }

    front() {
        return this.isEmpty() ? null : this.itens[0];
    }

    size() {
        return this.itens.length;
    }
}

// Teste
let fila = new FilaSimples();
fila.enqueue(10);
fila.enqueue(20);
fila.enqueue(30);
console.log("Dequeue:", fila.dequeue()); // 10
console.log("Front:", fila.front()); // 20
console.log("Tamanho:", fila.size()); // 2