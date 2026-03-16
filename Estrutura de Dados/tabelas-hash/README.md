# Tabelas Hash

Este módulo explora o conceito de hashing, funções de hash, tratamento de colisões e aplicações práticas de tabelas hash.

## Estruturas implementadas

- Funções de hash para inteiros e strings
- Tabela hash com encadeamento (chaining)
- Tabela hash com endereçamento aberto (probing linear)
- Comparação de desempenho entre as duas técnicas
- Dicionário simples (armazenar palavras e significados)
- Análise de desempenho com diferentes tamanhos de tabela
- Função de hash personalizada para strings

## Conceitos

### Hashing
Técnica que mapeia chaves de tamanho arbitrário para índices de uma tabela de tamanho fixo.

### Colisão
Quando duas chaves diferentes produzem o mesmo índice. Técnicas de resolução:
- **Encadeamento**: cada posição contém uma lista de pares chave‑valor.
- **Endereçamento aberto**: procura‑se outra posição livre (probing linear, quadrático, duplo hash).

### Fator de carga (load factor)
Razão entre número de elementos e tamanho da tabela. Influencia o desempenho.

### Aplicações
Dicionários, caches, bancos de dados, verificação de integridade.

## Linguagem

Todos os exemplos foram implementados em **JavaScript**.

## Como executar

Navegue até a pasta `tabelas-hash` e execute cada arquivo com Node.js:

```bash
cd "tabelas-hash"
node atividade1.js
node atividade2.js
node atividade3.js
node atividade4.js
node atividade5.js
node atividade6.js
node atividade7.js