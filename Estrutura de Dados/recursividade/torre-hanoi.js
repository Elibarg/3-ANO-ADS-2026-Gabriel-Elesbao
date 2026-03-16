function torreHanoi(n, origem, destino, auxiliar) {
    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return;
    }

    torreHanoi(n - 1, origem, auxiliar, destino);

    console.log(`Mover disco ${n} de ${origem} para ${destino}`);

    torreHanoi(n - 1, auxiliar, destino, origem);
}

torreHanoi(3, "A", "C", "B");