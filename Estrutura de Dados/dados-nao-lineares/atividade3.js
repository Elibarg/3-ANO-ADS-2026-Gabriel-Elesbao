// 3. Max-Heap e Fila de Prioridade

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Índices
    pai(i) { return Math.floor((i - 1) / 2); }
    esquerdo(i) { return 2 * i + 1; }
    direito(i) { return 2 * i + 2; }

    // Inserir elemento
    inserir(valor) {
        this.heap.push(valor);
        this._subir(this.heap.length - 1);
    }

    _subir(i) {
        while (i > 0 && this.heap[this.pai(i)] < this.heap[i]) {
            [this.heap[this.pai(i)], this.heap[i]] = [this.heap[i], this.heap[this.pai(i)]];
            i = this.pai(i);
        }
    }

    // Remover o maior elemento (raiz)
    removerMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._descer(0);
        return max;
    }

    _descer(i) {
        const tamanho = this.heap.length;
        while (true) {
            let maior = i;
            const esq = this.esquerdo(i);
            const dir = this.direito(i);

            if (esq < tamanho && this.heap[esq] > this.heap[maior]) maior = esq;
            if (dir < tamanho && this.heap[dir] > this.heap[maior]) maior = dir;

            if (maior === i) break;
            [this.heap[i], this.heap[maior]] = [this.heap[maior], this.heap[i]];
            i = maior;
        }
    }

    // Ver o maior sem remover
    verMax() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Tamanho
    tamanho() {
        return this.heap.length;
    }
}

// Fila de prioridade usando MaxHeap
class FilaPrioridade {
    constructor() {
        this.heap = new MaxHeap();
    }

    enqueue(valor) {
        this.heap.inserir(valor);
    }

    dequeue() {
        return this.heap.removerMax();
    }

    frente() {
        return this.heap.verMax();
    }

    vazia() {
        return this.heap.tamanho() === 0;
    }
}

// Testes
const heap = new MaxHeap();
heap.inserir(10);
heap.inserir(20);
heap.inserir(5);
heap.inserir(30);
heap.inserir(15);

console.log('Heap após inserções:', heap.heap); // [30, 20, 5, 10, 15] (ordem de heap)
console.log('Remover max:', heap.removerMax()); // 30
console.log('Heap após remoção:', heap.heap);   // [20, 15, 5, 10]

// Fila de prioridade
const fp = new FilaPrioridade();
fp.enqueue(5);
fp.enqueue(10);
fp.enqueue(7);
console.log('Frente da fila:', fp.frente()); // 10
console.log('Atendido:', fp.dequeue());      // 10
console.log('Frente agora:', fp.frente());   // 7