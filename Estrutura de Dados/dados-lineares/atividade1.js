// 1. Vetores

// a) Vetor com 10 números inteiros e função de busca
const numbers = [10, 23, 45, 67, 89, 12, 34, 56, 78, 90];

function buscarNumero(vetor, alvo) {
    for (let i = 0; i < vetor.length; i++) {
        if (vetor[i] === alvo) {
            return i; // retorna o índice onde encontrou
        }
    }
    return -1; // não encontrado
}

// Teste de busca
console.log('Busca por 45:', buscarNumero(numbers, 45)); // 2
console.log('Busca por 99:', buscarNumero(numbers, 99)); // -1

// b) Função para remover elemento em posição específica
function removerNaPosicao(vetor, posicao) {
    if (posicao < 0 || posicao >= vetor.length) {
        console.log('Posição inválida');
        return vetor;
    }
    for (let i = posicao; i < vetor.length - 1; i++) {
        vetor[i] = vetor[i + 1];
    }
    vetor.pop(); // remove o último elemento duplicado
    return vetor;
}

// Teste de remoção
console.log('Antes da remoção:', numbers);
removerNaPosicao(numbers, 3); // remove o 67
console.log('Após remoção do índice 3:', numbers);