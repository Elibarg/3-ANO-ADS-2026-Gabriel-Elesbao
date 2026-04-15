## 1. O que são triggers no MySQL?

Resposta:
Triggers são rotinas automáticas que são executadas quando ocorre um evento em uma tabela.

Eventos que disparam trigger:

INSERT
UPDATE
DELETE

Importante:

Não são executadas manualmente
Estão ligadas diretamente à tabela

Resumo direto:
Trigger = ação automática baseada em mudança de dados

## 2. Qual a finalidade do uso de triggers?

Resposta:

Automatizar processos
Garantir regras de negócio
Manter integridade dos dados
Registrar logs automaticamente

Exemplo real:

Inseriu pedido → atualizar estoque automaticamente

Sem trigger:
Você depende da aplicação
Com trigger:
O banco garante a regra

## 3. Qual a diferença entre BEFORE e AFTER em triggers?

Resposta:

BEFORE → executa antes da operação
AFTER → executa depois da operação

Exemplo:

BEFORE → validar dados antes de inserir
AFTER → registrar log após inserção

Resumo:

BEFORE = prevenção
AFTER = consequência
## 4. Quais eventos podem disparar um trigger?

Resposta:

INSERT → ao inserir dados
UPDATE → ao atualizar dados
DELETE → ao remover dados

Esses são os únicos eventos suportados.

## 5. Dê um exemplo prático de uso de trigger.

Resposta:

Cenário:

Registrar log quando um pedido é inserido.

CREATE TRIGGER log_pedido
AFTER INSERT ON pedidos
FOR EACH ROW
INSERT INTO log_acoes (acao, data_hora)
VALUES ('Pedido inserido', NOW());

Resultado:
Toda inserção gera um log automaticamente.

## 6. Como excluir um trigger?

Resposta:

Comando:

DROP TRIGGER nome_do_trigger;

Isso remove completamente o trigger do banco.

## 7. O que são eventos no MySQL (Event Scheduler)?

Resposta:
Eventos são tarefas agendadas que executam comandos SQL automaticamente em horários definidos.

Funciona como:

Um “cron” dentro do banco

Exemplo de uso:

Limpar registros antigos
Atualizar dados periodicamente
## 8. Qual a diferença entre triggers e eventos?

Resposta:
| Trigger                        | Evento            |
| ------------------------------ | ----------------- |
| Baseado em ação (INSERT, etc.) | Baseado em tempo  |
| Reativo                        | Proativo          |
| Ligado à tabela                | Independente      |
| Execução automática por evento | Execução agendada |

Trigger	Evento
Baseado em ação (INSERT, etc.)	Baseado em tempo
Reativo	Proativo
Ligado à tabela	Independente
Execução automática por evento	Execução agendada

Resumo direto:

Trigger → reage a mudança
Evento → executa no tempo
## 9. Quais são as vantagens do uso de eventos?

Resposta:

Automatizam tarefas recorrentes
Reduzem dependência de scripts externos
Melhoram manutenção do sistema

Exemplo:

Rodar limpeza todo dia à meia-noite
## 10. Quais cuidados devem ser tomados ao usar triggers e eventos?

Resposta:

Evitar lógica complexa demais
Monitorar impacto na performance
Evitar loops ou dependências ocultas
Documentar bem

Problema real:

Trigger mal feito:

Difícil de debugar
Pode gerar efeitos colaterais invisíveis
