// 1. Union-Find (Conjuntos Disjuntos) com otimizações

class UnionFind {
    constructor(n) {
        this.parent = new Array(n);
        this.rank = new Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    // Find com path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    // Union com union by rank
    union(x, y) {
        const raizX = this.find(x);
        const raizY = this.find(y);
        if (raizX === raizY) return;

        if (this.rank[raizX] < this.rank[raizY]) {
            this.parent[raizX] = raizY;
        } else if (this.rank[raizX] > this.rank[raizY]) {
            this.parent[raizY] = raizX;
        } else {
            this.parent[raizY] = raizX;
            this.rank[raizX]++;
        }
    }

    // Verifica se dois elementos estão no mesmo conjunto
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// Teste: identificar componentes conectados em um grafo não direcionado
function testarComponentes() {
    // Grafo com 7 vértices (0 a 6) e arestas que formam três componentes
    const uf = new UnionFind(7);
    const arestas = [
        [0, 1],
        [1, 2],
        [3, 4],
        [5, 6]
    ];

    arestas.forEach(([u, v]) => uf.union(u, v));

    console.log('Componentes conectados:');
    const componentes = new Map();
    for (let i = 0; i < 7; i++) {
        const raiz = uf.find(i);
        if (!componentes.has(raiz)) componentes.set(raiz, []);
        componentes.get(raiz).push(i);
    }
    for (let [raiz, lista] of componentes) {
        console.log(`  {${lista.join(', ')}}`);
    }
}

testarComponentes();
module.exports = UnionFind;