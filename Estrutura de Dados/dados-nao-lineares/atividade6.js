// Dijkstra (grafo ponderado com pesos não negativos)
class GrafoPonderado {
    constructor() {
        this.listaAdj = new Map(); // vértice -> [{vertice, peso}]
    }

    adicionarVertice(v) {
        if (!this.listaAdj.has(v)) this.listaAdj.set(v, []);
    }

    adicionarAresta(v1, v2, peso) {
        // direcionado – para não direcionado, adicionar nos dois sentidos
        this.listaAdj.get(v1).push({ vertice: v2, peso });
    }

    // Retorna objeto com distâncias a partir de origem
    dijkstra(origem) {
        const dist = {};
        const visitados = new Set();
        const vertices = Array.from(this.listaAdj.keys());

        for (const v of vertices) dist[v] = Infinity;
        dist[origem] = 0;

        while (visitados.size < vertices.length) {
            // Encontrar vértice não visitado com menor distância
            let u = null;
            let menorDist = Infinity;
            for (const v of vertices) {
                if (!visitados.has(v) && dist[v] < menorDist) {
                    menorDist = dist[v];
                    u = v;
                }
            }
            if (u === null) break; // vértices restantes inalcançáveis
            visitados.add(u);

            const vizinhos = this.listaAdj.get(u) || [];
            for (const { vertice: v, peso } of vizinhos) {
                if (!visitados.has(v)) {
                    const novaDist = dist[u] + peso;
                    if (novaDist < dist[v]) dist[v] = novaDist;
                }
            }
        }
        return dist;
    }

    // Floyd‑Warshall – retorna matriz de distâncias entre todos os pares
    floydWarshall() {
        const vertices = Array.from(this.listaAdj.keys());
        const n = vertices.length;
        const indice = {};
        vertices.forEach((v, i) => indice[v] = i);

        // Inicializar matriz com Infinity
        const dist = Array(n).fill().map(() => Array(n).fill(Infinity));
        for (let i = 0; i < n; i++) dist[i][i] = 0;

        // Preencher com arestas
        for (const [u, vizinhos] of this.listaAdj) {
            for (const { vertice: v, peso } of vizinhos) {
                dist[indice[u]][indice[v]] = peso;
            }
        }

        // Algoritmo
        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        // Converter de volta para objeto chaveado por vértices
        const resultado = {};
        for (let i = 0; i < n; i++) {
            resultado[vertices[i]] = {};
            for (let j = 0; j < n; j++) {
                resultado[vertices[i]][vertices[j]] = dist[i][j];
            }
        }
        return resultado;
    }
}

// Teste Dijkstra
const gp = new GrafoPonderado();
['A', 'B', 'C', 'D'].forEach(v => gp.adicionarVertice(v));
gp.adicionarAresta('A', 'B', 4);
gp.adicionarAresta('A', 'C', 2);
gp.adicionarAresta('B', 'C', 1);
gp.adicionarAresta('B', 'D', 5);
gp.adicionarAresta('C', 'D', 8);
gp.adicionarAresta('C', 'A', 2); // aresta de volta para teste

console.log('Dijkstra de A:', gp.dijkstra('A')); // { A:0, B:3, C:2, D:8 } (caminho A->C->B?)

// Teste Floyd‑Warshall
console.log('Floyd‑Warshall:');
console.log(gp.floydWarshall());