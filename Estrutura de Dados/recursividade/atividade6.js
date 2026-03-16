function torreDeHanoi(n, origem, destino, auxiliar) {
    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return 1;
    }
    let movimentos = 0;
    movimentos += torreDeHanoi(n - 1, origem, auxiliar, destino);
    console.log(`Mover disco ${n} de ${origem} para ${destino}`);
    movimentos += 1;
    movimentos += torreDeHanoi(n - 1, auxiliar, destino, origem);
    return movimentos;
}

const n = 3;
const total = torreDeHanoi(n, 'A', 'C', 'B');
console.log(`Total de movimentos para ${n} discos: ${total}`); // 7
// Complexidade de tempo: O(2ⁿ) – número de movimentos = 2ⁿ - 1