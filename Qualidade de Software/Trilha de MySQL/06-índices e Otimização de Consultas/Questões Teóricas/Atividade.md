## 1. O que são índices em bancos de dados e qual sua função?

Resposta:
Índices são estruturas auxiliares criadas pelo banco para acelerar a busca de dados.

Analogia direta:

Sem índice → você lê o livro inteiro
Com índice → vai direto na página

Função principal:

Reduzir o número de linhas analisadas

Eles são usados principalmente em:

WHERE
JOIN
ORDER BY
## 2. Quais são os principais benefícios do uso de índices?

Resposta:

Aceleram consultas (SELECT)
Melhoram performance em filtros
Reduzem custo computacional
Tornam o sistema mais escalável

Resumo real:
Índice não é “otimização avançada” — é o básico pra não travar.

## 3. Quais são as desvantagens do uso de índices?

Resposta:

Aumentam o tempo de INSERT, UPDATE, DELETE
Consomem espaço em disco
Precisam de manutenção automática

Por quê?

Cada vez que você altera dados, o índice também precisa ser atualizado.

Resumo brutal:
Índice melhora leitura, piora escrita.

## 4. O que é um índice simples?

Resposta:
É um índice criado em uma única coluna.

Exemplo:

CREATE INDEX idx_nome ON clientes(nome);

Uso ideal:

Colunas usadas frequentemente em filtros
## 5. O que é um índice único (UNIQUE)?

Resposta:
Um índice único garante que não existam valores duplicados em uma coluna.

Exemplo:

CREATE UNIQUE INDEX idx_email ON clientes(email);

Uso comum:

Email
CPF
Login

Ele combina:

Performance + integridade
## 6. O que é um índice composto?

Resposta:
É um índice criado com duas ou mais colunas.

Exemplo:

CREATE INDEX idx_nome_cidade ON clientes(nome, cidade);

Importante (isso aqui muita gente erra):

Ele funciona bem para:

WHERE nome = ?
WHERE nome = ? AND cidade = ?

Mas NÃO funciona bem para:

WHERE cidade = ?

Ordem importa. Muito.

## 7. O que é o comando EXPLAIN e para que ele serve?

Resposta:
O EXPLAIN mostra como o banco executa uma consulta.

Ele revela:

Se está usando índice
Quantas linhas está lendo
Tipo de busca (index, full scan, etc.)

Exemplo:

EXPLAIN SELECT * FROM clientes WHERE nome = 'João';

Se aparecer:

type: ALL → ruim (full scan)
type: index → bom

Resumo:
EXPLAIN é seu raio-x de performance.

## 8. O que é um FULL TABLE SCAN e por que deve ser evitado?

Resposta:
É quando o banco precisa percorrer toda a tabela para encontrar os dados.

Problema:

Extremamente lento em tabelas grandes
Alto custo de processamento

Causa principal:

Falta de índice

Resumo direto:
FULL TABLE SCAN = banco trabalhando no modo “força bruta”

## 9. Em quais situações o uso de índices é mais recomendado?

Resposta:

Use índices em:

Colunas usadas em WHERE
Colunas usadas em JOIN
Colunas usadas em ORDER BY
Campos de busca frequente

Evite índices em:

Colunas muito alteradas
Colunas com poucos valores distintos (baixa cardinalidade)
## 10. Qual a importância da otimização de consultas em sistemas reais?

Resposta:
A otimização impacta diretamente:

Tempo de resposta
Consumo de recursos
Escalabilidade
Experiência do usuário

Problema real:

Uma query mal otimizada pode:

Travar o sistema
Derrubar o banco
Gerar prejuízo

Resumo brutal:

Você não otimiza porque é “bonito”
Você otimiza porque sistemas quebram sem isso