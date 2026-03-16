class Dicionario extends HashEncadeamento {
    constructor() {
        super(10); // tamanho inicial 10
    }

    // Herda inserir, buscar, remover de HashEncadeamento
}

// Teste do dicionário
const dic = new Dicionario();
dic.inserir('casa', 'Lugar onde se mora');
dic.inserir('carro', 'Veículo de transporte');
dic.inserir('computador', 'Máquina eletrônica');

console.log('casa:', dic.buscar('casa')); // Lugar onde se mora
console.log('avião:', dic.buscar('avião')); // null
dic.remover('carro');
console.log('carro após remoção:', dic.buscar('carro')); // null
dic.exibir();