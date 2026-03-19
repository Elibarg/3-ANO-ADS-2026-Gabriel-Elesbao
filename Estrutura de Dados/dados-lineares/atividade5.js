// 5. Fila (Queue)

// a) Fila simples com enqueue e dequeue
class Fila {
    constructor() {
        this.itens = [];
    }

    enqueue(valor) {
        this.itens.push(valor);
    }

    dequeue() {
        if (this.estaVazia()) return null;
        return this.itens.shift();
    }

    estaVazia() {
        return this.itens.length === 0;
    }

    frente() {
        return this.estaVazia() ? null : this.itens[0];
    }

    tamanho() {
        return this.itens.length;
    }
}

// b) Fila circular (tamanho fixo)
class FilaCircular {
    constructor(capacidade) {
        this.capacidade = capacidade;
        this.itens = new Array(capacidade);
        this.inicio = 0;
        this.fim = 0;
        this.contador = 0;
    }

    enqueue(valor) {
        if (this.estaCheia()) {
            console.log('Fila circular cheia!');
            return false;
        }
        this.itens[this.fim] = valor;
        this.fim = (this.fim + 1) % this.capacidade;
        this.contador++;
        return true;
    }

    dequeue() {
        if (this.estaVazia()) return null;
        const valor = this.itens[this.inicio];
        this.inicio = (this.inicio + 1) % this.capacidade;
        this.contador--;
        return valor;
    }

    estaVazia() {
        return this.contador === 0;
    }

    estaCheia() {
        return this.contador === this.capacidade;
    }

    exibir() {
        if (this.estaVazia()) {
            console.log('Fila vazia');
            return;
        }
        let i = this.inicio;
        const elementos = [];
        for (let c = 0; c < this.contador; c++) {
            elementos.push(this.itens[i]);
            i = (i + 1) % this.capacidade;
        }
        console.log('Fila circular:', elementos.join(' <- '));
    }
}

// c) Simulação de atendimento bancário com fila simples
function simulacaoBanco() {
    const fila = new Fila();
    const clientes = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos'];

    // Chegada dos clientes
    console.log('Clientes chegando:');
    clientes.forEach(cliente => {
        console.log(`${cliente} entrou na fila.`);
        fila.enqueue(cliente);
    });

    console.log('\nInício do atendimento:');
    let senha = 1;
    while (!fila.estaVazia()) {
        const cliente = fila.dequeue();
        console.log(`Senha ${senha}: ${cliente} foi atendido(a).`);
        senha++;
    }
    console.log('Todos os clientes foram atendidos.');
}

// Testes

// Fila simples
const filaSimples = new Fila();
filaSimples.enqueue('A');
filaSimples.enqueue('B');
filaSimples.enqueue('C');
console.log('Dequeue:', filaSimples.dequeue()); // A
console.log('Frente:', filaSimples.frente());   // B

// Fila circular
const circular = new FilaCircular(3);
circular.enqueue(1);
circular.enqueue(2);
circular.enqueue(3);
circular.exibir();          // 1 <- 2 <- 3
circular.enqueue(4);        // Fila circular cheia!
console.log('Dequeue:', circular.dequeue()); // 1
circular.enqueue(4);
circular.exibir();          // 2 <- 3 <- 4

// Simulação banco
simulacaoBanco();