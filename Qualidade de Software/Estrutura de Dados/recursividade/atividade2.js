// 2. Sequência de Fibonacci

// Versão recursiva simples (ineficiente)
function fibonacciSimples(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacciSimples(n - 1) + fibonacciSimples(n - 2);
}

// Versão com memoization (otimizada)
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Testes
console.log('Fibonacci (simples) n=10:', fibonacciSimples(10)); // 55
console.log('Fibonacci (memo) n=10:', fibonacciMemo(10));       // 55

// Análise de desempenho:
// - Simples: relação T(n) = T(n-1) + T(n-2) + O(1) => O(2^n) exponencial.
// - Memoization: cada n é calculado uma única vez, O(n) linear.