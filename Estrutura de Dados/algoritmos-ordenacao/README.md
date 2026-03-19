# Algoritmos de Ordenação

Este módulo apresenta os principais algoritmos de ordenação, desde os simples (Selection, Insertion, Bubble) até os avançados (Merge, Quick, Heap). São abordadas características como complexidade, estabilidade e comparações de desempenho.

## Algoritmos implementados

- Selection Sort (com contagem de comparações e trocas)
- Insertion Sort (para strings)
- Bubble Sort (análise de complexidade)
- Merge Sort
- Quick Sort (versões com pivô fixo e mediana de três)
- Heap Sort
- Versões estáveis de Heap Sort e Selection Sort (desafio)

## Conceitos

### Estabilidade
Um algoritmo é estável se mantém a ordem relativa de elementos com chaves iguais.

### Complexidades
- **Simples**: O(n²) – Selection, Insertion, Bubble
- **Avançados**: O(n log n) – Merge, Quick (médio), Heap

### Comparações
- Merge Sort: estável, sempre O(n log n)
- Quick Sort: instável, O(n log n) médio, O(n²) pior caso
- Heap Sort: instável, O(n log n) no local

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `algoritmos-ordenacao` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/algoritmos-ordenacao"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js