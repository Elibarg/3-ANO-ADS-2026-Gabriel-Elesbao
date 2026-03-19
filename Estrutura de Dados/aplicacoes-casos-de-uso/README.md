# Aplicações e Casos de Uso de Estruturas de Dados

Este módulo explora aplicações práticas de estruturas de dados em sistemas reais, resolvendo problemas clássicos como o Caixeiro Viajante, busca de padrões em textos, simulação de sistemas de arquivos e redes sociais.

## Estruturas e Algoritmos implementados

- Filas e Pilhas:
  - Fila de impressão (FIFO)
  - Histórico de navegação (pilha com voltar/avançar)
- Problema do Caixeiro Viajante (TSP):
  - Solução exata por força bruta
  - Heurística do vizinho mais próximo
- Busca de padrões em textos:
  - Algoritmo de força bruta
  - Algoritmo KMP (Knuth-Morris-Pratt)
- Sistema de arquivos simplificado com árvore B+
- Rede social como grafo e busca BFS para menor distância

## Conceitos

### Filas e Pilhas
- **Fila**: utilizada em sistemas que exigem ordem de chegada (FIFO), como filas de impressão.
- **Pilha**: utilizada para funcionalidades de desfazer/refazer ou voltar/avançar (LIFO).

### Problema do Caixeiro Viajante (TSP)
Problema de otimização que busca a menor rota visitando todas as cidades exatamente uma vez e retornando à origem.
- **Força bruta**: avalia todas as permutações (inviável para muitas cidades).
- **Vizinho mais próximo**: heurística gulosa que constrói uma rota aproximada.

### Busca de Padrões
- **Força bruta**: compara o padrão em todas as posições do texto.
- **KMP**: utiliza uma tabela de falhas para evitar comparações redundantes, alcançando O(n + m).

### Árvores B+
Estrutura balanceada de múltiplos caminhos usada em bancos de dados e sistemas de arquivos. Neste módulo, implementamos uma versão simplificada para armazenar nomes de arquivos e permitir busca eficiente.

### Grafos e BFS
Grafos modelam relações (ex.: amizades em redes sociais). A busca em largura (BFS) encontra o caminho mais curto em número de arestas.

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `aplicacoes-casos-de-uso` e execute cada arquivo com Node.js:

```bash
cd "Estrutura de Dados/aplicacoes-casos-de-uso"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js