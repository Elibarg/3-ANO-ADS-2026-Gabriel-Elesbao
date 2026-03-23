// 4. Pilha (Stack)

class Pilha {
    constructor(tamanhoMaximo = 100) {
        this.itens = [];
        this.tamanhoMaximo = tamanhoMaximo;
    }

    push(valor) {
        if (this.estaCheia()) {
            console.log('Pilha cheia!');
            return false;
        }
        this.itens.push(valor);
        return true;
    }

    pop() {
        if (this.estaVazia()) return null;
        return this.itens.pop();
    }

    peek() {
        if (this.estaVazia()) return null;
        return this.itens[this.itens.length - 1];
    }

    estaVazia() {
        return this.itens.length === 0;
    }

    estaCheia() {
        return this.itens.length >= this.tamanhoMaximo;
    }

    tamanho() {
        return this.itens.length;
    }
}

// a) Verificação de pilha cheia/vazia já inclusa nos métodos acima

// b) Verificar parênteses balanceados
function parentesesBalanceados(expressao) {
    const pilha = new Pilha();
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
const pilhaTeste = new Pilha(3);
console.log('Esta vazia?', pilhaTeste.estaVazia()); // true
pilhaTeste.push(1);
pilhaTeste.push(2);
pilhaTeste.push(3);
console.log('Esta cheia?', pilhaTeste.estaCheia()); // true
pilhaTeste.push(4); // Pilha cheia!

console.log('Topo:', pilhaTeste.peek()); // 3
console.log('Pop:', pilhaTeste.pop());   // 3
console.log('Topo:', pilhaTeste.peek()); // 2

// Teste de parênteses
console.log(parentesesBalanceados('((1+2)*(3/4))')); // true
console.log(parentesesBalanceados('((1+2)*(3/4)'));  // false
console.log(parentesesBalanceados(')('));            // false