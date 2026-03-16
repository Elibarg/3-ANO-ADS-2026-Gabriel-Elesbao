// torre-hanoi.js
// Exercício 6: Torre de Hanói

function torreHanoi(n, origem, destino, auxiliar) {
    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return 1;
    }
    let movimentos = 0;
    movimentos += torreHanoi(n - 1, origem, auxiliar, destino);
    console.log(`Mover disco ${n} de ${origem} para ${destino}`);
    movimentos += 1;
    movimentos += torreHanoi(n - 1, auxiliar, destino, origem);
    return movimentos;
}
// Número de movimentos: 2^n - 1, complexidade O(2^n)

// Teste
console.log("--- Torre de Hanói com 3 discos ---");
let total = torreHanoi(3, 'A', 'C', 'B');
console.log(`Total de movimentos: ${total}`); // 7