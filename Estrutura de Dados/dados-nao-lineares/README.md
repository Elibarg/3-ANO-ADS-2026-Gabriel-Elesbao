# Estruturas de Dados Não Lineares

Este módulo aborda árvores e grafos, estruturas fundamentais para representar hierarquias e relações complexas.

## Estruturas implementadas

- Árvore binária (percursos in‑order, pre‑order, post‑order)
- Árvore binária de busca (BST) com inserção, busca e remoção
- Árvore AVL (inserção e remoção com balanceamento)
- Max‑Heap e fila de prioridade
- Grafo com lista de adjacência e algoritmos DFS, BFS
- Dijkstra (caminho mínimo) e Floyd‑Warshall (todos os pares)

## Conceitos

### Árvores
Estruturas hierárquicas formadas por nós. A raiz é o nó principal; folhas são nós sem filhos.

### Árvore Binária de Busca (BST)
Para cada nó, os valores da subárvore esquerda são menores e os da direita são maiores.

### Árvores Balanceadas (AVL)
Garantem altura O(log n) através de rotações após inserções/remoções.

### Heaps
Árvores binárias completas onde cada nó é maior (max‑heap) ou menor (min‑heap) que os filhos. Úteis para filas de prioridade.

### Grafos
Conjunto de vértices conectados por arestas. Podem ser direcionados ou não, ponderados ou não.

Algoritmos:
- DFS (busca em profundidade)
- BFS (busca em largura)
- Dijkstra (caminho mínimo com pesos não negativos)
- Floyd‑Warshall (caminhos mínimos entre todos os pares)

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `dados-nao-lineares` e execute cada arquivo com Node.js:

```bash
cd "dados-nao-lineares"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
node atividade6.js