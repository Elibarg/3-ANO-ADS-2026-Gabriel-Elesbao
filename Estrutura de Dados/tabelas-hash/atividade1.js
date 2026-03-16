// Hash para inteiro (tabela tamanho 10)
function hashInteiro(chave, tamanho = 10) {
    return chave % tamanho;
}

// Hash para string: soma dos códigos ASCII módulo tamanho
function hashString(str, tamanho = 10) {
    let soma = 0;
    for (let i = 0; i < str.length; i++) {
        soma += str.charCodeAt(i);
    }
    return soma % tamanho;
}

console.log('Hash de 42 (tam10):', hashInteiro(42)); // 2
console.log('Hash de "abacaxi":', hashString('abacaxi')); // soma dos códigos mod 10