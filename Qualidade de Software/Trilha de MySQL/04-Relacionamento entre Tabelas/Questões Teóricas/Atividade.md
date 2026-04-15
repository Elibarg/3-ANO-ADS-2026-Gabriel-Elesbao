## 1. O que é uma chave primária (PRIMARY KEY) e qual sua importância?

Resposta:
A chave primária é um atributo (ou conjunto de atributos) que identifica unicamente cada registro dentro de uma tabela.

Características obrigatórias:

Não pode ter valores duplicados
Não pode ser nula
Deve ser estável (não mudar com frequência)

Importância real (não a resposta de prova):

Garante identidade do dado
Permite relacionamento com outras tabelas
Evita duplicidade (ex: dois clientes com mesmo ID)

Sem PRIMARY KEY, seu banco vira um caos — você perde controle sobre quem é quem.

## 2. O que é uma chave estrangeira (FOREIGN KEY) e qual sua função?

Resposta:
A chave estrangeira é um campo que referencia a chave primária de outra tabela, criando um vínculo entre elas.

Função:

Garantir que o dado referenciado exista
Manter consistência entre tabelas

Exemplo mental:

clientes(id_cliente) → PRIMARY KEY
pedidos(id_cliente) → FOREIGN KEY

Isso impede coisas absurdas como:

um pedido ligado a um cliente que não existe

## 3. O que é integridade referencial e por que ela é importante?

Resposta:
Integridade referencial é a regra que garante que as relações entre tabelas sejam válidas e consistentes.

Ela impede:

Inserir FK que não existe
Excluir registros que ainda estão sendo usados
Criar dados “órfãos”

Exemplo clássico de erro evitado:

Pedido sem cliente
Produto inexistente em uma venda

Sem isso, seu banco pode até funcionar… mas os dados deixam de ser confiáveis.

## 4. O que acontece ao tentar inserir um valor em uma FOREIGN KEY que não existe na tabela referenciada?

Resposta:
O banco rejeita a operação.

Motivo:

A FOREIGN KEY exige que o valor já exista na tabela referenciada. Caso contrário, a inserção viola a integridade referencial.

Resultado:

Erro de constraint
Nenhum dado é inserido

Isso força consistência — não é opcional.

## 5. O que acontece ao tentar excluir um registro que está sendo referenciado por outra tabela?

Resposta:
Por padrão, a exclusão é bloqueada.

Exemplo:

Você tenta apagar um cliente
Mas existem pedidos ligados a ele

Resultado:

Erro
Exclusão não acontece

Isso evita perda de relacionamento e inconsistência.

## 6. O que é ON DELETE CASCADE e quando ele deve ser usado?

Resposta:
ON DELETE CASCADE faz com que, ao excluir um registro da tabela principal, todos os registros relacionados sejam automaticamente excluídos.

Exemplo:

Apaga cliente
Todos os pedidos desse cliente são apagados automaticamente

Quando usar:

Quando os dados dependem totalmente do registro principal

Quando NÃO usar (erro comum):

Quando você precisa de histórico (ex: vendas)

Resumo brutal:
CASCADE é poderoso — e perigoso.

## 7. Explique o relacionamento Um para Um (1:1) e dê um exemplo.

Resposta:
Um relacionamento 1:1 ocorre quando um registro em uma tabela se relaciona com apenas um registro em outra.

Exemplo:

clientes
detalhes_cliente (CPF, data nascimento)

Cada cliente → 1 detalhe
Cada detalhe → 1 cliente

Uso real:

Separar dados sensíveis
Organizar melhor a estrutura
## 8. Explique o relacionamento Um para Muitos (1:N) e dê um exemplo.

Resposta:
Um relacionamento 1:N ocorre quando um registro pode estar associado a vários registros em outra tabela.

Exemplo clássico:

1 cliente → vários pedidos

Tabela:

clientes (1 lado)
pedidos (N lado)

Esse é o tipo mais comum em banco de dados.

## 9. Explique o relacionamento Muitos para Muitos (N:M) e como ele é implementado.

Resposta:
Um relacionamento N:M ocorre quando vários registros de uma tabela se relacionam com vários registros de outra.

Exemplo:

alunos ↔ cursos

Um aluno faz vários cursos
Um curso tem vários alunos

Como implementar:

Você NÃO liga direto.
Você cria uma tabela intermediária.

Exemplo:

alunos
cursos
alunos_cursos (tabela de ligação)

Essa tabela contém:

id_aluno
id_curso

Sem isso, o modelo quebra.

## 10. Qual a importância dos relacionamentos em bancos de dados relacionais?

Resposta:
Relacionamentos permitem:

Evitar redundância de dados
Manter consistência
Organizar melhor a informação
Permitir consultas complexas (JOINs)

Sem relacionamentos:

Você duplica dados
Aumenta erro humano
Perde integridade

Resumo direto:

Sem relacionamento → planilha bagunçada
Com relacionamento → sistema estruturado