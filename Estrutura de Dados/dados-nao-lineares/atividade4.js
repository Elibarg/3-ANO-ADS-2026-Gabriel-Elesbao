class MaxHeap {
    constructor() {
        this.heap = [];
    }

    inserir(valor) {
        this.heap.push(valor);
        this._subir(this.heap.length - 1);
    }

    _subir(indice) {
        while (indice > 0) {
            const pai = Math.floor((indice - 1) / 2);
            if (this.heap[indice] <= this.heap[pai]) break;
            [this.heap[indice], this.heap[pai]] = [this.heap[pai], this.heap[indice]];
            indice = pai;
        }
    }

    removerMaior() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const maior = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._descer(0);
        return maior;
    }

    _descer(indice) {
        const tamanho = this.heap.length;
        while (true) {
            let maior = indice;
            const esq = 2 * indice + 1;
            const dir = 2 * indice + 2;
            if (esq < tamanho && this.heap[esq] > this.heap[maior]) maior = esq;
            if (dir < tamanho && this.heap[dir] > this.heap[maior]) maior = dir;
            if (maior === indice) break;
            [this.heap[indice], this.heap[maior]] = [this.heap[maior], this.heap[indice]];
            indice = maior;
        }
    }

    tamanho() {
        return this.heap.length;
    }
}

// Fila de prioridade usando o MaxHeap
class FilaPrioridade {
    constructor() {
        this.heap = new MaxHeap();
    }

    enqueue(valor) {
        this.heap.inserir(valor);
    }

    dequeue() {
        return this.heap.removerMaior();
    }
}

// Testes
const heap = new MaxHeap();
heap.inserir(30);
heap.inserir(10);
heap.inserir(50);
heap.inserir(20);
console.log('Heap array:', heap.heap); // [50,20,30,10]
console.log('Remover maior:', heap.removerMaior()); // 50
console.log('Heap após remoção:', heap.heap); // [30,20,10]

const fp = new FilaPrioridade();
fp.enqueue(5);
fp.enqueue(9);
fp.enqueue(1);
console.log('Fila prioridade dequeue:', fp.dequeue()); // 9
console.log('Fila prioridade dequeue:', fp.dequeue()); // 5