// 1. Fatorial Recursivo

function fatorial(n) {
    // Caso base: fatorial de 0 ou 1 é 1
    if (n <= 1) return 1;
    // Chamada recursiva: n * fatorial(n-1)
    return n * fatorial(n - 1);
}

// Testes
console.log('Fatorial de 5:', fatorial(5)); // 120
console.log('Fatorial de 0:', fatorial(0)); // 1
console.log('Fatorial de 7:', fatorial(7)); // 5040

// Análise de complexidade:
// O algoritmo executa n chamadas recursivas, cada uma com operação O(1).
// Portanto, complexidade de tempo O(n).