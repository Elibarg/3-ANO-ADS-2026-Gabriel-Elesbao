class Pilha {
    constructor(tamanho) {
        this.itens = [];
        this.tamanho = tamanho;
    }

    push(valor) {
        if (this.isFull()) {
            console.log("Pilha cheia");
            return;
        }
        this.itens.push(valor);
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.itens.pop();
    }

    peek() {
        return this.itens[this.itens.length - 1];
    }

    isEmpty() {
        return this.itens.length === 0;
    }

    isFull() {
        return this.itens.length === this.tamanho;
    }
}

// verificar parênteses balanceados
function parentesesBalanceados(expr) {
    const pilha = [];

    for (let c of expr) {
        if (c === "(") pilha.push(c);
        if (c === ")") {
            if (pilha.length === 0) return false;
            pilha.pop();
        }
    }

    return pilha.length === 0;
}