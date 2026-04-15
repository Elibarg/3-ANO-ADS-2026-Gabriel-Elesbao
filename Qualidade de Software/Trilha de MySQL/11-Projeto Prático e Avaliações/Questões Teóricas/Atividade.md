## 1. Qual é o objetivo de um projeto prático em banco de dados?

Resposta:
O objetivo é integrar todos os conceitos aprendidos em um cenário realista.

Isso inclui:

Modelagem de dados
Criação de tabelas
Relacionamentos
Consultas
Otimização
Segurança

Não é sobre saber comandos isolados — é sobre saber resolver um problema completo.

## 2. Quais são as principais entidades de um sistema de vendas?

Resposta:

Segundo o módulo:

Clientes
Produtos
Pedidos
Estoque

Cada entidade representa uma parte do sistema.

Resumo:

Sem entender entidades, você não modela — você improvisa.

## 3. Qual a importância da modelagem do banco de dados?

Resposta:
A modelagem define como os dados serão organizados e relacionados.

Impacto direto:

Evita redundância
Garante integridade
Facilita consultas
Melhora performance

Erro comum:

Começar pelo código sem modelar → sistema mal estruturado.

## 4. O que é normalização e por que ela é importante?

Resposta:
Normalização é o processo de organizar dados para:

Eliminar redundância
Evitar inconsistência

Exemplo:

Ao invés de repetir dados do cliente em várias tabelas, você cria uma tabela única e relaciona.

Resultado:

Menos erro
Mais organização
## 5. Qual a função da tabela clientes em um sistema de vendas?

Resposta:
Armazenar informações dos clientes.

Campos típicos:

id_cliente (PK)
nome
email
telefone

Essa tabela é a base para relacionamentos com pedidos.

## 6. Qual a função da tabela produtos?

Resposta:
Armazenar dados dos produtos disponíveis.

Campos:

id_produto (PK)
nome
preço
estoque

Ela permite controlar vendas e disponibilidade.

## 7. Qual a função da tabela pedidos?

Resposta:
Registrar as vendas realizadas.

Ela conecta:

Cliente
Produto(s)
Valores

Normalmente inclui:

id_pedido
id_cliente (FK)
data
total
## 8. Como os relacionamentos são aplicados nesse sistema?

Resposta:

Cliente → Pedidos (1:N)
Pedido → Produtos (N:M)

Isso exige:

Chaves estrangeiras
Tabela intermediária (ex: itens_pedido)

Sem isso, você não representa corretamente as vendas.

## 9. Qual a importância de otimizar consultas em um sistema real?

Resposta:
Porque sistemas crescem.

Sem otimização:

Consultas ficam lentas
Sistema trava
Experiência do usuário piora

Com otimização:

Respostas rápidas
Melhor uso de recursos
## 10. Como segurança e backup se aplicam ao projeto?

Resposta:

Segurança:
Controle de acesso por usuário
Permissões adequadas
Proteção de dados
Backup:
Garantia de recuperação
Continuidade do sistema

Sem esses dois:

Você até constrói o sistema
Mas não sustenta ele