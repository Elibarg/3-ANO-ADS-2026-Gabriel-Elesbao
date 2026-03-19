// 5. Dijkstra e Floyd-Warshall

// --- Grafo ponderado para Dijkstra ---
class GrafoPonderado {
    constructor() {
        this.adj = {}; // { vertice: { vizinho: peso } }
    }

    adicionarVertice(v) {
        if (!this.adj[v]) this.adj[v] = {};
    }

    adicionarAresta(v1, v2, peso, direcionado = false) {
        this.adicionarVertice(v1);
        this.adicionarVertice(v2);
        this.adj[v1][v2] = peso;
        if (!direcionado) this.adj[v2][v1] = peso;
    }

    // Dijkstra: caminho mais curto de origem para todos os vértices
    dijkstra(origem) {
        const dist = {};
        const visitados = new Set();
        const vertices = Object.keys(this.adj);

        // Inicializar distâncias
        for (let v of vertices) dist[v] = Infinity;
        dist[origem] = 0;

        while (visitados.size < vertices.length) {
            // Seleciona vértice não visitado com menor distância
            let u = null;
            let menorDist = Infinity;
            for (let v of vertices) {
                if (!visitados.has(v) && dist[v] < menorDist) {
                    menorDist = dist[v];
                    u = v;
                }
            }
            if (u === null) break; // vértices restantes inacessíveis

            visitados.add(u);

            // Relaxamento das arestas
            for (let viz in this.adj[u]) {
                const peso = this.adj[u][viz];
                if (dist[u] + peso < dist[viz]) {
                    dist[viz] = dist[u] + peso;
                }
            }
        }
        return dist;
    }
}

// --- Floyd-Warshall: caminhos mínimos entre todos os pares ---
class FloydWarshall {
    constructor(vertices) {
        this.vertices = vertices;
        this.n = vertices.length;
        this.dist = {};
        // Inicializar matriz de distâncias
        for (let i of vertices) {
            this.dist[i] = {};
            for (let j of vertices) {
                this.dist[i][j] = i === j ? 0 : Infinity;
            }
        }
    }

    adicionarAresta(v1, v2, peso) {
        this.dist[v1][v2] = peso;
    }

    executar() {
        for (let k of this.vertices) {
            for (let i of this.vertices) {
                for (let j of this.vertices) {
                    if (this.dist[i][k] + this.dist[k][j] < this.dist[i][j]) {
                        this.dist[i][j] = this.dist[i][k] + this.dist[k][j];
                    }
                }
            }
        }
        return this.dist;
    }
}

// --- Testes ---

// Dijkstra
const grafoP = new GrafoPonderado();
grafoP.adicionarAresta('A', 'B', 4);
grafoP.adicionarAresta('A', 'C', 2);
grafoP.adicionarAresta('B', 'C', 1);
grafoP.adicionarAresta('B', 'D', 5);
grafoP.adicionarAresta('C', 'D', 8);
grafoP.adicionarAresta('C', 'E', 10);
grafoP.adicionarAresta('D', 'E', 2);

const distancias = grafoP.dijkstra('A');
console.log('Dijkstra a partir de A:');
for (let v in distancias) {
    console.log(`A -> ${v}: ${distancias[v]}`);
}

// Floyd-Warshall
const fw = new FloydWarshall(['A', 'B', 'C', 'D']);
fw.adicionarAresta('A', 'B', 3);
fw.adicionarAresta('A', 'C', 8);
fw.adicionarAresta('B', 'C', 2);
fw.adicionarAresta('B', 'D', 5);
fw.adicionarAresta('C', 'D', 1);
// Arestas de volta (grafo não direcionado)
fw.adicionarAresta('B', 'A', 3);
fw.adicionarAresta('C', 'A', 8);
fw.adicionarAresta('C', 'B', 2);
fw.adicionarAresta('D', 'B', 5);
fw.adicionarAresta('D', 'C', 1);

const resultado = fw.executar();
console.log('\nFloyd-Warshall (matriz de distâncias):');
for (let i of fw.vertices) {
    let linha = '';
    for (let j of fw.vertices) {
        linha += (resultado[i][j] === Infinity ? '∞' : resultado[i][j]) + '\t';
    }
    console.log(linha);
}