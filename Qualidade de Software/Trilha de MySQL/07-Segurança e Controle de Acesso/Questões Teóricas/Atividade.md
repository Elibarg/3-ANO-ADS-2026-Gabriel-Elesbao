## 1. Por que a segurança em bancos de dados é importante?

Resposta:
A segurança garante que apenas usuários autorizados possam acessar ou manipular os dados.

Sem isso, você abre espaço para:

Vazamento de informações
Alteração indevida de dados
Exclusão acidental ou maliciosa
Acesso não autorizado

Impacto real:

Perda de dados
Problemas legais
Prejuízo financeiro

Resumo direto:
Sem segurança, seu banco não é confiável.

## 2. O que é o gerenciamento de usuários no MySQL?

Resposta:
É o controle de quem pode acessar o banco e o que cada usuário pode fazer.

Isso inclui:

Criar usuários
Alterar senhas
Definir permissões
Remover acessos

Objetivo:

Evitar que qualquer pessoa tenha acesso total ao sistema.

## 3. Qual a função do comando CREATE USER?

Resposta:
O comando CREATE USER cria uma nova conta de acesso no banco de dados.

Exemplo:

CREATE USER 'usuario1'@'localhost' IDENTIFIED BY 'senha123';

Componentes:

usuário
origem (localhost ou %)
senha

Uso:

Criar usuários específicos para diferentes funções (admin, leitura, etc.)

## 4. Para que serve o comando ALTER USER?

Resposta:
O ALTER USER é usado para modificar configurações de um usuário existente, principalmente senha.

Exemplo:

ALTER USER 'usuario1'@'localhost' IDENTIFIED BY 'nova_senha';

Uso comum:

Troca de senha
Atualização de configurações de segurança
## 5. Qual a finalidade do comando DROP USER?

Resposta:
O comando DROP USER remove um usuário do banco.

Exemplo:

DROP USER 'usuario1'@'localhost';

Impacto:

O usuário perde acesso imediatamente
Não pode mais autenticar no sistema

Uso:

Remover usuários inativos
Encerrar acessos desnecessários
## 6. O que fazem os comandos GRANT e REVOKE?

Resposta:

GRANT → concede permissões
REVOKE → remove permissões

Exemplo:

GRANT SELECT, INSERT ON banco.* TO 'usuario1'@'localhost';
REVOKE INSERT ON banco.* FROM 'usuario1'@'localhost';

Permissões comuns:

SELECT (leitura)
INSERT (inserção)
UPDATE (alteração)
DELETE (remoção)
## 7. O que significa o princípio do menor privilégio?

Resposta:
Significa que um usuário deve ter apenas as permissões mínimas necessárias para executar sua função.

Exemplo:

Usuário de relatório → só SELECT
Usuário de cadastro → INSERT + UPDATE

Erro comum:

Dar acesso total (ALL PRIVILEGES) para todo mundo.

Consequência:

Se der problema, o dano é muito maior.

## 8. Qual a diferença entre acesso local e remoto no MySQL?

Resposta:

localhost → acesso apenas da máquina local
% → acesso de qualquer lugar

Exemplo:

'usuario'@'localhost'

vs

'usuario'@'%'

Risco:

Permitir acesso remoto sem controle = porta aberta para ataque.

## 9. Quais são boas práticas de segurança em bancos de dados?

Resposta:

Usar senhas fortes
Aplicar princípio do menor privilégio
Evitar acesso remoto desnecessário
Monitorar acessos
Remover usuários não utilizados
Fazer backups frequentes

Resumo:
Segurança não é uma ação — é rotina.

## 10. Quais os riscos de uma má configuração de permissões?

Resposta:

Acesso indevido a dados sensíveis
Alteração ou exclusão de dados críticos
Vazamento de informações
Ataques internos ou externos

Exemplo real:

Usuário com permissão de DELETE sem necessidade → pode apagar tudo.

Resumo brutal:

Permissão mal configurada = desastre silencioso esperando acontecer