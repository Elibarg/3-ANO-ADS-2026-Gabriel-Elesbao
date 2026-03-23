# Estruturas de Dados Avançadas

Este módulo aborda estruturas de dados sofisticadas utilizadas em algoritmos de grafos e sistemas de banco de dados, incluindo conjuntos disjuntos (Union-Find) e árvores B e B+.

## Estruturas implementadas

- Conjuntos Disjuntos (Union-Find) com path compression e union by rank
- Aplicação: Algoritmo de Kruskal para árvore geradora mínima
- Árvore B (simplificada) com inserção e remoção
- Árvore B+ (simplificada) com inserção
- Análise comparativa entre árvores B e AVL

## Conceitos

### Union-Find (Conjuntos Disjuntos)
Estrutura que mantém uma coleção de conjuntos disjuntos com operações:
- **Find**: determina a qual conjunto um elemento pertence (com compressão de caminho).
- **Union**: une dois conjuntos (por rank).

Aplicações: detecção de ciclos em grafos, algoritmo de Kruskal.

### Árvores B e B+
Árvores balanceadas de múltiplos caminhos, otimizadas para armazenamento em disco. Cada nó pode conter várias chaves e filhos.
- **Árvore B**: chaves e valores distribuídos em todos os nós.
- **Árvore B+**: valores apenas nas folhas; nós internos funcionam como índice. Folhas são ligadas em lista encadeada.

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `dados-avancados` e execute cada arquivo com Node.js:

```bash
cd "Qualidade de Software/Estrutura de Dados/dados-avancados"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
node atividade6.js 