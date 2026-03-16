class NoLista {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

function somaLista(no) {
    if (!no) return 0;
    return no.valor + somaLista(no.proximo);
}

// Criando lista: 10 -> 20 -> 30
const head = new NoLista(10);
head.proximo = new NoLista(20);
head.proximo.proximo = new NoLista(30);

console.log('Soma da lista:', somaLista(head)); // 60