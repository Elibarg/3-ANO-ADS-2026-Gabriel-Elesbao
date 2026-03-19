// ==================== Força Bruta (permutações) ====================
function permutar(array) {
    if (array.length <= 1) return [array];
    const resultado = [];
    for (let i = 0; i < array.length; i++) {
        const atual = array[i];
        const restante = array.slice(0, i).concat(array.slice(i + 1));
        const permutasRestantes = permutar(restante);
        for (let perm of permutasRestantes) {
            resultado.push([atual, ...perm]);
        }
    }
    return resultado;
}

function calcularDistanciaRota(rota, matrizDistancias) {
    let distancia = 0;
    for (let i = 0; i < rota.length - 1; i++) {
        distancia += matrizDistancias[rota[i]][rota[i + 1]];
    }
    // voltar à cidade inicial
    distancia += matrizDistancias[rota[rota.length - 1]][rota[0]];
    return distancia;
}

function tspForcaBruta(cidades, matrizDistancias) {
    const indices = cidades.map((_, i) => i);
    const permutacoes = permutar(indices);
    let melhorRota = null;
    let menorDistancia = Infinity;
    for (let perm of permutacoes) {
        const dist = calcularDistanciaRota(perm, matrizDistancias);
        if (dist < menorDistancia) {
            menorDistancia = dist;
            melhorRota = perm;
        }
    }
    return {
        rota: melhorRota.map(i => cidades[i]),
        distancia: menorDistancia
    };
}

// ==================== Vizinho Mais Próximo (Heurística) ====================
function tspVizinhoMaisProximo(cidades, matrizDistancias, inicio = 0) {
    const n = cidades.length;
    const visitadas = new Array(n).fill(false);
    let rota = [inicio];
    visitadas[inicio] = true;
    let atual = inicio;
    let distanciaTotal = 0;

    for (let passo = 1; passo < n; passo++) {
        let proxima = -1;
        let menorDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (!visitadas[i] && matrizDistancias[atual][i] < menorDist) {
                menorDist = matrizDistancias[atual][i];
                proxima = i;
            }
        }
        rota.push(proxima);
        visitadas[proxima] = true;
        distanciaTotal += menorDist;
        atual = proxima;
    }
    // voltar ao início
    distanciaTotal += matrizDistancias[atual][inicio];
    return {
        rota: rota.map(i => cidades[i]),
        distancia: distanciaTotal
    };
}

// ==================== Teste ====================
const cidades = ['A', 'B', 'C', 'D', 'E']; // 5 cidades
const dist = [
    [0, 2, 9, 10, 7],
    [2, 0, 6, 8, 4],
    [9, 6, 0, 3, 5],
    [10, 8, 3, 0, 6],
    [7, 4, 5, 6, 0]
];

console.log('--- Força Bruta (5 cidades) ---');
const exato = tspForcaBruta(cidades, dist);
console.log('Melhor rota:', exato.rota.join(' -> '), '| Distância:', exato.distancia);

console.log('\n--- Vizinho Mais Próximo (5 cidades) ---');
const heuristica = tspVizinhoMaisProximo(cidades, dist, 0);
console.log('Rota encontrada:', heuristica.rota.join(' -> '), '| Distância:', heuristica.distancia);

// Para 10 cidades, a força bruta é inviável (10! = 3.6M). Testamos apenas o vizinho mais próximo.
const cidades10 = ['A','B','C','D','E','F','G','H','I','J'];
// Gerando matriz aleatória para teste (distâncias simétricas)
function gerarMatrizAleatoria(n, maxDist = 20) {
    const m = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            const d = Math.floor(Math.random() * maxDist) + 1;
            m[i][j] = d;
            m[j][i] = d;
        }
    }
    return m;
}
const dist10 = gerarMatrizAleatoria(10);
console.log('\n--- Vizinho Mais Próximo (10 cidades) ---');
const heur10 = tspVizinhoMaisProximo(cidades10, dist10, 0);
console.log('Rota aproximada:', heur10.rota.join(' -> '));
console.log('Distância aproximada:', heur10.distancia);