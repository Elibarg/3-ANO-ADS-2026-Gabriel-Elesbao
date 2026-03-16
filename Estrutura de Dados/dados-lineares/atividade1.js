// 1. Criar um vetor que armazene 10 números inteiros e função para buscar um número
const vetor = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function buscarNumero(vetor, alvo) {
    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] === alvo) return i; // retorna o índice se encontrar
    }
    return -1; // não encontrado
}

console.log('Buscar 30:', buscarNumero(vetor, 30));
console.log('Buscar 99:', buscarNumero(vetor, 99));

// 2. Função para remover elemento de uma posição específica
function removerNaPosicao(vetor, posicao) {
    if (posicao < 0 || posicao >= vetor.length) return null;
    const removido = vetor[posicao];
    for (let i = posicao; i < vetor.length - 1; i++) {
        vetor[i] = vetor[i + 1];
    }
    vetor.pop(); // remove o último elemento duplicado
    return removido;
}

console.log('Vetor original:', vetor);
const removido = removerNaPosicao(vetor, 3);
console.log('Removido:', removido, '| Vetor após remoção:', vetor);