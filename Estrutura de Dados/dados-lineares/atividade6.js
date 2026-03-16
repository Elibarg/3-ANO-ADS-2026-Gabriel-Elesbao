// Fila Circular (usando array com tamanho fixo)
class FilaCircular {
    constructor(tamanho) {
        this.max = tamanho;
        this.elementos = new Array(tamanho);
        this.inicio = 0;
        this.fim = 0;
        this.contador = 0;
    }

    enqueue(valor) {
        if (this.estaCheia()) {
            console.log('Fila cheia!');
            return false;
        }
        this.elementos[this.fim] = valor;
        this.fim = (this.fim + 1) % this.max;
        this.contador++;
        return true;
    }

    dequeue() {
        if (this.estaVazia()) return null;
        const valor = this.elementos[this.inicio];
        this.inicio = (this.inicio + 1) % this.max;
        this.contador--;
        return valor;
    }

    estaVazia() {
        return this.contador === 0;
    }

    estaCheia() {
        return this.contador === this.max;
    }

    exibir() {
        const valores = [];
        for (let i = 0; i < this.contador; i++) {
            const pos = (this.inicio + i) % this.max;
            valores.push(this.elementos[pos]);
        }
        console.log('Fila:', valores.join(' <- '));
    }
}

// Simulação de atendimento bancário com fila simples
function simulacaoBanco() {
    const filaBanco = new Fila(); // reutiliza a fila simples do exercício 5
    const clientes = ['Ana', 'Bruno', 'Carla', 'Daniel', 'Eduarda'];

    console.log('Chegada dos clientes:');
    clientes.forEach(cliente => {
        console.log(`${cliente} entrou na fila.`);
        filaBanco.enqueue(cliente);
    });

    console.log('\nAtendimentos:');
    while (!filaBanco.estaVazia()) {
        const atendido = filaBanco.dequeue();
        console.log(`Atendendo: ${atendido}`);
    }
    console.log('Todos atendidos.');
}

// Testes
const fc = new FilaCircular(5);
fc.enqueue('X');
fc.enqueue('Y');
fc.enqueue('Z');
fc.exibir(); // X <- Y <- Z
fc.dequeue();
fc.exibir(); // Y <- Z

simulacaoBanco();