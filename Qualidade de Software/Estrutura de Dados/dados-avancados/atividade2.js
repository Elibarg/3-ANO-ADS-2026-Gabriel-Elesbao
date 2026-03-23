// 2. Aplicação de Union-Find: Algoritmo de Kruskal e detecção de ciclos

const UnionFind = require('./atividade1.js'); // reutiliza a classe (ou copie aqui)

class Aresta {
    constructor(u, v, peso) {
        this.u = u;
        this.v = v;
        this.peso = peso;
    }
}

// Algoritmo de Kruskal para encontrar a Árvore Geradora Mínima (MST)
function kruskal(vertices, arestas) {
    // Ordena arestas por peso crescente
    arestas.sort((a, b) => a.peso - b.peso);
    const uf = new UnionFind(vertices.length);
    const mst = [];

    for (let aresta of arestas) {
        if (!uf.connected(aresta.u, aresta.v)) {
            uf.union(aresta.u, aresta.v);
            mst.push(aresta);
        }
    }
    return mst;
}

// Detecção de ciclo em grafo não direcionado
function temCiclo(vertices, arestas) {
    const uf = new UnionFind(vertices.length);
    for (let aresta of arestas) {
        if (uf.connected(aresta.u, aresta.v)) {
            return true; // ciclo encontrado
        }
        uf.union(aresta.u, aresta.v);
    }
    return false;
}

// Teste
const vertices = [0, 1, 2, 3];
const arestas = [
    new Aresta(0, 1, 10),
    new Aresta(0, 2, 6),
    new Aresta(0, 3, 5),
    new Aresta(1, 3, 15),
    new Aresta(2, 3, 4)
];

console.log('Arestas ordenadas por peso:');
arestas.forEach(a => console.log(`  ${a.u}-${a.v} (${a.peso})`));

const mst = kruskal(vertices, arestas);
console.log('\nArestas na MST:');
mst.forEach(a => console.log(`  ${a.u} - ${a.v} (peso ${a.peso})`));

console.log('\nO grafo completo tem ciclo?', temCiclo(vertices, arestas)); // true