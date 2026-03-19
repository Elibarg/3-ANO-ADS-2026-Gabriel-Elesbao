// 1. Implementação de Funções de Hash

// Tamanho da tabela
const TABLE_SIZE = 10;

// a) Função de hash para chave inteira
function hashInteiro(key) {
    return key % TABLE_SIZE;
}

// b) Função de hash para string (soma dos valores ASCII)
function hashString(str) {
    let soma = 0;
    for (let i = 0; i < str.length; i++) {
        soma += str.charCodeAt(i);
    }
    return soma % TABLE_SIZE;
}

// Testes
console.log('Hash de inteiros:');
[15, 27, 35, 42, 10].forEach(key => {
    console.log(`hashInteiro(${key}) = ${hashInteiro(key)}`);
});

console.log('\nHash de strings:');
['casa', 'carro', 'arvore', 'bola', 'dado'].forEach(str => {
    console.log(`hashString("${str}") = ${hashString(str)}`);
});