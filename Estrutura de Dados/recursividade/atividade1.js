function fatorial(n) {
    if (n <= 1) return 1; // caso base
    return n * fatorial(n - 1);
}

console.log('Fatorial de 5:', fatorial(5)); // 120
console.log('Fatorial de 0:', fatorial(0)); // 1

// Complexidade de tempo: O(n) – há n chamadas recursivas.