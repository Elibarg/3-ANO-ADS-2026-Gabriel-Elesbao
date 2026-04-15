## 1. Explique a diferença entre INSERT INTO e UPDATE. Em que situações cada um deve ser usado?

Resposta:
O comando INSERT INTO é utilizado para inserir novos registros em uma tabela, ou seja, criar novas linhas com dados inéditos. Já o comando UPDATE é usado para modificar registros já existentes.

A diferença central é:

INSERT → cria dados novos
UPDATE → altera dados existentes

Situação de uso:

Use INSERT quando você está adicionando um novo cliente, produto, pedido etc.
Use UPDATE quando você precisa corrigir ou alterar informações, como mudar o email de um cliente ou atualizar o preço de um produto.

Erro comum (e grave):
Usar UPDATE sem WHERE → você altera TODOS os registros. Isso não é erro de sintaxe, é erro de julgamento.

## 2. Qual a função do comando DELETE e como ele se diferencia do comando TRUNCATE?

Resposta:
O comando DELETE remove registros de uma tabela, podendo ser usado com WHERE para excluir dados específicos.

Já o TRUNCATE remove todos os dados da tabela de forma instantânea, sem possibilidade de filtragem.

Diferenças principais:

DELETE
Pode usar WHERE
Remove linha por linha
Pode ser revertido (dependendo da transação)
TRUNCATE
Remove TODOS os dados
Muito mais rápido
Não pode usar WHERE
Geralmente não pode ser revertido

Resumo direto:
DELETE = bisturi
TRUNCATE = bomba nuclear

## 3. Por que é importante usar a cláusula WHERE em comandos como UPDATE e DELETE?

Resposta:
A cláusula WHERE define quais registros serão afetados.

Sem WHERE, você está dizendo:

“faça isso na tabela inteira”

Consequências:

UPDATE sem WHERE → todos os dados são alterados
DELETE sem WHERE → todos os registros são apagados

Isso é uma das causas mais comuns de perda de dados em produção.

Boa prática:
Sempre validar com um SELECT antes:

SELECT * FROM tabela WHERE condição;

Se o resultado estiver correto, aí sim aplicar UPDATE ou DELETE.

## 4. Descreva a utilidade da cláusula ORDER BY e como ela pode ser aplicada em consultas.

Resposta:
A cláusula ORDER BY é usada para ordenar os resultados de uma consulta.

Ela pode ordenar:

Crescente (ASC) → padrão
Decrescente (DESC)

## Exemplo:

SELECT nome, salario
FROM funcionarios
ORDER BY salario DESC;

Utilidade prática:

Listar produtos mais caros primeiro
Mostrar clientes em ordem alfabética
Organizar relatórios

Sem ORDER BY, o banco retorna dados em ordem indefinida.

## 5. O que significa a palavra-chave DEFAULT no contexto de inserção de dados? Dê um ## exemplo de uso.

Resposta:
A palavra-chave DEFAULT define um valor padrão para uma coluna, que será usado quando nenhum valor for informado no INSERT.

## Exemplo:

Tabela:

cidade VARCHAR(50) DEFAULT 'Não Informado'

Inserção:

INSERT INTO clientes (nome)
VALUES ('João');

Resultado:

cidade = 'Não Informado'

Uso real:
Evita dados nulos e mantém consistência.

## 6. Qual a finalidade da cláusula DISTINCT e em que situações ela é útil?

Resposta:
A cláusula DISTINCT remove valores duplicados do resultado de uma consulta.

## Exemplo:

SELECT DISTINCT cidade FROM clientes;

Sem DISTINCT:

SP
SP
RJ

Com DISTINCT:

SP
RJ

Quando usar:

Listar valores únicos
Relatórios agregados
Evitar duplicação visual

Cuidado:
DISTINCT pode impactar performance em tabelas grandes.

## 7. Explique como a cláusula GROUP BY funciona e cite um ## exemplo prático de sua aplicação.

Resposta:
A cláusula GROUP BY agrupa registros com valores iguais em determinadas colunas, permitindo aplicar funções agregadas.

## Exemplo:

SELECT cidade, COUNT(*) AS total_clientes
FROM clientes
GROUP BY cidade;

Resultado:

Agrupa clientes por cidade
Conta quantos existem em cada grupo

Funções comuns:

COUNT() → quantidade
SUM() → soma
AVG() → média

Uso real:
Relatórios, dashboards, análise de dados.

## 8. Qual é o impacto de não usar índices no banco de dados durante consultas que utilizam filtros (WHERE)?

Resposta:
Sem índice, o banco faz um FULL TABLE SCAN — ele lê todas as linhas da tabela.

Impacto:

Consultas muito mais lentas
Alto consumo de CPU e disco
Escalabilidade ruim

Com índice:

Busca direta (como índice de livro)
Muito mais rápido

Resumo brutal:
Sem índice → banco “vasculha tudo”
Com índice → banco “vai direto ao ponto”

## 9. Cite dois operadores de comparação e dois operadores lógicos em SQL, explicando como funcionam.

Resposta:

Operadores de comparação:
= → igualdade
> → maior que

## Exemplo:

WHERE idade > 18
Operadores lógicos:
AND → ambas condições devem ser verdadeiras
OR → pelo menos uma condição verdadeira

## Exemplo:

WHERE idade > 18 AND cidade = 'SP'

Resumo:

Comparação → avalia valores
Lógicos → combinam condições
## 10. Qual a diferença entre HAVING e WHERE? Por que o HAVING é usado em conjunto com o GROUP BY?

Resposta:
A diferença está no momento da execução:

WHERE → filtra antes do agrupamento
HAVING → filtra depois do agrupamento

## Exemplo:

SELECT cidade, COUNT(*) AS total
FROM clientes
GROUP BY cidade
HAVING COUNT(*) > 5;

Aqui:

Primeiro agrupa
Depois filtra grupos com mais de 5 registros

Regra simples:

WHERE → linhas individuais
HAVING → grupos