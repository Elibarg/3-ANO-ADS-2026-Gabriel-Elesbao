class Grafo {
    constructor() {
        this.listaAdj = new Map(); // vértice -> array de vértices vizinhos
    }

    adicionarVertice(v) {
        if (!this.listaAdj.has(v)) this.listaAdj.set(v, []);
    }

    adicionarAresta(v1, v2) {
        // grafo não direcionado
        this.listaAdj.get(v1).push(v2);
        this.listaAdj.get(v2).push(v1);
    }

    // DFS iterativo usando pilha
    dfs(inicio) {
        const visitados = new Set();
        const pilha = [inicio];
        const resultado = [];

        while (pilha.length) {
            const v = pilha.pop();
            if (!visitados.has(v)) {
                visitados.add(v);
                resultado.push(v);
                // Adiciona vizinhos não visitados à pilha
                const vizinhos = this.listaAdj.get(v) || [];
                for (const viz of vizinhos) {
                    if (!visitados.has(viz)) pilha.push(viz);
                }
            }
        }
        return resultado;
    }

    // BFS usando fila
    bfs(inicio) {
        const visitados = new Set();
        const fila = [inicio];
        const resultado = [];

        while (fila.length) {
            const v = fila.shift();
            if (!visitados.has(v)) {
                visitados.add(v);
                resultado.push(v);
                const vizinhos = this.listaAdj.get(v) || [];
                for (const viz of vizinhos) {
                    if (!visitados.has(viz)) fila.push(viz);
                }
            }
        }
        return resultado;
    }
}

// Teste
const grafo = new Grafo();
['A', 'B', 'C', 'D', 'E'].forEach(v => grafo.adicionarVertice(v));
grafo.adicionarAresta('A', 'B');
grafo.adicionarAresta('A', 'C');
grafo.adicionarAresta('B', 'D');
grafo.adicionarAresta('C', 'E');
grafo.adicionarAresta('D', 'E');

console.log('DFS a partir de A:', grafo.dfs('A')); // ordem depende da implementação
console.log('BFS a partir de A:', grafo.bfs('A')); // [ 'A', 'B', 'C', 'D', 'E' ] (se B e C forem adicionados na ordem)