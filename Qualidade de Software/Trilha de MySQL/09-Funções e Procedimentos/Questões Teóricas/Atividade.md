## 1. O que são funções no MySQL e qual sua finalidade?

Resposta:
Funções no MySQL são rotinas que recebem valores, processam e retornam um único resultado.

Finalidade:

Manipular dados
Realizar cálculos
Padronizar operações

Exemplo mental:
Você não quer repetir cálculo de desconto em 20 lugares → cria uma função.

## 2. Cite exemplos de funções de manipulação de strings e explique sua utilidade.

Resposta:

Principais:

CONCAT() → junta textos
SUBSTRING() → extrai parte do texto
LOWER() / UPPER() → muda para minúsculo/maiúsculo

Exemplo:

SELECT CONCAT(nome, ' - ', cidade) FROM clientes;

Uso real:

Formatação de dados
Padronização de textos
Geração de identificadores
## 3. Cite exemplos de funções de data e hora e sua aplicação.

Resposta:

NOW() → data e hora atual
CURDATE() → data atual
DATEDIFF() → diferença entre datas
DATE_FORMAT() → formatação

Exemplo:

SELECT DATEDIFF('2026-12-31', CURDATE());

Uso:

Relatórios
Cálculo de prazos
Análise temporal
## 4. Cite exemplos de funções matemáticas e sua utilidade.

Resposta:

ROUND() → arredondamento
FLOOR() → arredonda para baixo
CEIL() → arredonda para cima
ABS() → valor absoluto

Exemplo:

SELECT ROUND(10.567, 2);

Uso:

Financeiro
Estatísticas
Cálculos gerais
## 5. O que são procedimentos armazenados (Stored Procedures)?

Resposta:
São blocos de código SQL que podem ser executados como uma unidade.

Eles permitem:

Automatizar tarefas
Centralizar lógica
Reutilizar código

Resumo direto:
Procedure = “função que executa ações”

## 6. Quais são as vantagens dos procedimentos armazenados?

Resposta:

Redução de código repetido
Melhor performance (executa no servidor)
Maior segurança (controle de acesso)
Organização da lógica

Uso real:
Sistemas grandes dependem disso.

## 7. Como executar um procedimento armazenado?

Resposta:

Usa-se o comando CALL.

Exemplo:

CALL listar_pedidos_cliente(1);

Isso executa o procedimento com parâmetro.

## 8. O que são parâmetros IN em procedimentos?

Resposta:
Parâmetros IN são valores de entrada usados pelo procedimento.

Exemplo:

CREATE PROCEDURE exemplo(IN id INT)

Uso:

Passar dados para o procedimento
Tornar o código dinâmico
## 9. O que são funções definidas pelo usuário (UDFs)?

Resposta:
São funções criadas pelo próprio desenvolvedor.

Características:

Retornam um único valor
Podem ser usadas em SELECT
Não devem alterar dados

Diferença chave:

Function → retorna valor
Procedure → executa ações
## 10. Qual a diferença entre funções e procedimentos armazenados?

Resposta:
Comparação: Funções vs Procedimentos Armazenados

+----------------------+------------------------------+------------------------------+
| Característica       | Função (Function)            | Procedure (Stored Procedure) |
+----------------------+------------------------------+------------------------------+
| Retorno              | Sempre retorna um valor      | Não precisa retornar valor   |
| Uso                  | Pode ser usada em SELECT     | Executada com CALL           |
| Alteração de dados   | Não deve alterar dados       | Pode alterar dados           |
| Complexidade         | Mais simples e limitada      | Mais complexa e poderosa     |
| Finalidade           | Cálculo / processamento      | Execução de ações            |
+----------------------+------------------------------+------------------------------+
Resumo direto:

Função → cálculo
Procedure → ação