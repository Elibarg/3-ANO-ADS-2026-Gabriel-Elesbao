class Pilha {
    constructor(tamanhoMaximo = 100) {
        this.elementos = [];
        this.topo = -1;
        this.max = tamanhoMaximo;
    }

    push(valor) {
        if (this.estaCheia()) {
            console.log('Pilha cheia!');
            return false;
        }
        this.elementos[++this.topo] = valor;
        return true;
    }

    pop() {
        if (this.estaVazia()) return null;
        return this.elementos[this.topo--];
    }

    peek() {
        return this.estaVazia() ? null : this.elementos[this.topo];
    }

    estaVazia() {
        return this.topo === -1;
    }

    estaCheia() {
        return this.topo === this.max - 1;
    }
}

// Função para verificar parênteses balanceados
function parentesesBalanceados(expressao) {
    const pilha = new Pilha(expressao.length);
    for (let char of expressao) {
        if (char === '(') {
            pilha.push(char);
        } else if (char === ')') {
            if (pilha.estaVazia()) return false;
            pilha.pop();
        }
    }
    return pilha.estaVazia();
}

// Testes
const pilha = new Pilha();
pilha.push(10);
pilha.push(20);
console.log('Topo:', pilha.peek()); // 20
console.log('Pop:', pilha.pop());    // 20
console.log('Vazia?', pilha.estaVazia()); // false

console.log('((1+2)*(3/4)):', parentesesBalanceados('((1+2)*(3/4))')); // true
console.log('((1+2)*(3/4):', parentesesBalanceados('((1+2)*(3/4)'));  // false