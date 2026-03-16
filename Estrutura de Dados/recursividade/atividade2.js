// Versão ingênua (exponencial)
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(6) ingênuo:', fibonacci(6)); // 8

// Versão com memoization (O(n))
function fibonacciMemo(n, memo = {}) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (memo[n] !== undefined) return memo[n];
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

console.log('Fibonacci(6) com memo:', fibonacciMemo(6)); // 8

// Versão iterativa (também O(n))
function fibonacciIterativo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

console.log('Fibonacci(6) iterativo:', fibonacciIterativo(6)); // 8