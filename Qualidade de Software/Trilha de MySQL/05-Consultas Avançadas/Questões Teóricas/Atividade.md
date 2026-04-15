## 1. O que é um JOIN e qual sua importância em bancos de dados relacionais?

Resposta:
JOIN é o mecanismo que permite combinar dados de duas ou mais tabelas com base em um relacionamento.

Sem JOIN:

Você só consulta uma tabela por vez
Dados ficam fragmentados

Com JOIN:

Você reconstrói o contexto completo

Exemplo mental:

clientes (nome)
pedidos (valor)

Sem JOIN → dados separados
Com JOIN → “João comprou R$150”

Importância real:
JOIN é o que transforma um banco relacional em algo útil.

## 2. Explique o funcionamento do INNER JOIN.

Resposta:
O INNER JOIN retorna apenas os registros que possuem correspondência em ambas as tabelas.

Exemplo:

SELECT c.nome, p.valor_total
FROM clientes c
INNER JOIN pedidos p ON c.id_cliente = p.id_cliente;

Resultado:

Só aparecem clientes que têm pedidos

Se não houver correspondência → o registro é ignorado.

Resumo:
INNER JOIN = interseção

## 3. Explique o funcionamento do LEFT JOIN.

Resposta:
O LEFT JOIN retorna:

Todos os registros da tabela da esquerda
E os correspondentes da direita

Quando não há correspondência:

Retorna NULL

Exemplo:

SELECT c.nome, p.valor_total
FROM clientes c
LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente;

Resultado:

Clientes com pedido → aparecem normalmente
Clientes sem pedido → aparecem com NULL

Uso real:
Encontrar “quem não tem” algo.

## 4. Explique o funcionamento do RIGHT JOIN.

Resposta:
O RIGHT JOIN é o inverso do LEFT JOIN.

Ele retorna:

Todos os registros da tabela da direita
E os correspondentes da esquerda

Se não houver correspondência:

valores da esquerda ficam NULL

Na prática:
Quase ninguém usa — porque você pode inverter a ordem e usar LEFT JOIN.

## 5. O que é FULL OUTER JOIN e como ele pode ser emulado no MySQL?

Resposta:
O FULL OUTER JOIN retorna:

Todos os registros de ambas as tabelas
Correspondentes ou não

Ou seja:

Junta tudo, preenchendo com NULL onde não há correspondência

Problema:
MySQL não suporta nativamente

Solução (emulação):

SELECT * FROM A
LEFT JOIN B ON ...
UNION
SELECT * FROM A
RIGHT JOIN B ON ...;

Isso combina os dois lados.

## 6. O que são subconsultas (subqueries)?

Resposta:
Subconsultas são consultas dentro de outras consultas.

Elas são usadas para:

Filtrar resultados
Calcular valores intermediários
Tomar decisões baseadas em outra consulta

Exemplo:

SELECT nome
FROM clientes
WHERE id_cliente IN (
    SELECT id_cliente FROM pedidos
);

Aqui:

A subconsulta define o critério
A consulta externa usa esse resultado
## 7. Qual a diferença entre subconsulta e JOIN?

Resposta:

JOIN	Subconsulta
Junta tabelas diretamente	Usa resultado de outra consulta
Mais performático (geralmente)	Pode ser mais simples de escrever
Melhor para grandes volumes	Pode ficar lento

Resumo prático:

JOIN → quando você quer combinar dados
Subquery → quando você quer filtrar ou calcular algo

Erro comum:
Usar subquery onde JOIN seria melhor → desempenho pior.

## 8. O que são funções de agregação e quais são as principais?

Resposta:
Funções de agregação operam sobre um conjunto de linhas e retornam um único valor.

Principais:

COUNT() → quantidade
SUM() → soma
AVG() → média
MAX() → maior valor
MIN() → menor valor

Exemplo:

SELECT COUNT(*) FROM pedidos;

Uso real:
Relatórios, dashboards, análise de dados.

## 9. Como JOINs e GROUP BY podem ser usados juntos?

Resposta:
Você usa JOIN para juntar dados e GROUP BY para agregá-los.

Exemplo:

SELECT c.nome, COUNT(p.id_pedido) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente
GROUP BY c.nome;

O que acontece:

Junta clientes + pedidos
Agrupa por cliente
Conta pedidos

Resultado:
Total de pedidos por cliente

## 10. Qual o impacto de consultas mal estruturadas com JOINs?

Resposta:
Consultas mal feitas com JOIN podem causar:

Lentidão extrema
Uso alto de CPU
Resultados duplicados
Erros lógicos

Problemas comuns:

JOIN sem condição (ON) → CROSS JOIN acidental
JOIN em colunas sem índice
JOIN desnecessário

Resumo direto:
JOIN mal feito não quebra só a query — quebra o sistema inteiro.