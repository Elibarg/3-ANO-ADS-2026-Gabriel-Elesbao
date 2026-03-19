// 4. Grafos com lista de adjacência, DFS e BFS

class Grafo {
    constructor() {
        this.lista = {}; // { vertice: [vizinhos] }
    }

    adicionarVertice(v) {
        if (!this.lista[v]) this.lista[v] = [];
    }

    adicionarAresta(v1, v2, direcionado = false) {
        if (!this.lista[v1]) this.adicionarVertice(v1);
        if (!this.lista[v2]) this.adicionarVertice(v2);
        this.lista[v1].push(v2);
        if (!direcionado) this.lista[v2].push(v1);
    }

    // DFS iterativo usando pilha
    dfs(inicio) {
        const visitados = new Set();
        const pilha = [inicio];

        console.log('DFS a partir de', inicio);
        while (pilha.length > 0) {
            const v = pilha.pop();
            if (!visitados.has(v)) {
                console.log(v);
                visitados.add(v);
                // Adiciona vizinhos não visitados (inverter para manter ordem)
                const vizinhos = this.lista[v] || [];
                for (let i = vizinhos.length - 1; i >= 0; i--) {
                    if (!visitados.has(vizinhos[i])) pilha.push(vizinhos[i]);
                }
            }
        }
    }

    // BFS iterativo usando fila
    bfs(inicio) {
        const visitados = new Set();
        const fila = [inicio];

        console.log('BFS a partir de', inicio);
        while (fila.length > 0) {
            const v = fila.shift();
            if (!visitados.has(v)) {
                console.log(v);
                visitados.add(v);
                const vizinhos = this.lista[v] || [];
                for (const viz of vizinhos) {
                    if (!visitados.has(viz)) fila.push(viz);
                }
            }
        }
    }

    // Exibir lista
    exibir() {
        console.log('Lista de Adjacência:');
        for (let v in this.lista) {
            console.log(v, '->', this.lista[v].join(', '));
        }
    }
}

// Teste
const grafo = new Grafo();
grafo.adicionarAresta('A', 'B');
grafo.adicionarAresta('A', 'C');
grafo.adicionarAresta('B', 'D');
grafo.adicionarAresta('C', 'D');
grafo.adicionarAresta('C', 'E');
grafo.exibir();
// A -> B, C
// B -> A, D
// C -> A, D, E
// D -> B, C
// E -> C

console.log('\n--- DFS ---');
grafo.dfs('A');

console.log('\n--- BFS ---');
grafo.bfs('A');