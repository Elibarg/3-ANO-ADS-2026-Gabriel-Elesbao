// 6. Torre de Hanói

function torreDeHanoi(n, origem, destino, auxiliar) {
    // Caso base: apenas um disco para mover
    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return;
    }
    // Mover n-1 discos da origem para o auxiliar
    torreDeHanoi(n - 1, origem, auxiliar, destino);
    // Mover o disco maior para o destino
    console.log(`Mover disco ${n} de ${origem} para ${destino}`);
    // Mover n-1 discos do auxiliar para o destino
    torreDeHanoi(n - 1, auxiliar, destino, origem);
}

// Teste com 3 discos
console.log('Solução para 3 discos:');
torreDeHanoi(3, 'A', 'C', 'B');

// Número de movimentos: 2^n - 1
// Complexidade de tempo: O(2^n)