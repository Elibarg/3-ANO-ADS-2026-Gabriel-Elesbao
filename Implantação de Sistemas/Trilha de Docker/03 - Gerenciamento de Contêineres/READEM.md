Módulo 03 — Gerenciamento de Contêineres

Trilha Docker | UniSENAI 2026
Autores: William Sestito, Emerson Amancio

Sobre este módulo

Este módulo introduz o gerenciamento de contêineres Docker, abordando o ciclo de vida das aplicações conteinerizadas.

O objetivo é compreender como criar, iniciar, listar, parar e remover contêineres, além de entender o conceito de efemeridade, uma das características centrais do Docker.

Objetivos do módulo

Ao final deste módulo o aluno deverá ser capaz de:

Criar contêineres
Executar aplicações em segundo plano
Monitorar contêineres ativos
Gerenciar ciclo de vida
Remover recursos inutilizados
Conceitos Fundamentais
O que é um contêiner?

Um contêiner é uma instância executável criada a partir de uma imagem Docker.

Fluxo:

Imagem → Contêiner → Execução → Finalização
Efemeridade

Contêineres são efêmeros, ou seja:

podem ser criados rapidamente
podem ser destruídos rapidamente
não dependem de instalação permanente

Exemplo:

Criar → Executar → Parar → Remover
Estrutura do gerenciamento

Operações principais:

Operação	Comando
Criar	docker run
Listar	docker ps
Parar	docker stop
Remover	docker rm
Exemplo prático
Criar contêiner Nginx
docker run -d nginx

Explicação:

docker run → cria contêiner
-d → segundo plano
nginx → imagem utilizada
Verificar execução
docker ps

Saída esperada:

CONTAINER ID IMAGE STATUS
xxxx nginx Up
Mostrar todos
docker ps -a

Diferença:

ps → ativos
ps -a → todos
Exercícios resolvidos
Parar
docker stop nginx
Remover
docker rm nginx
Vantagens do conceito efêmero
deploy rápido
escalabilidade
baixo consumo
ambientes reproduzíveis
fácil recuperação
Checklist
 Executou nginx
 Listou contêineres ativos
 Listou todos
 Parou contêiner
 Removeu contêiner
 Entendeu efemeridade
Aplicabilidade
DevOps

Deploy automático

Microserviços

Escalabilidade independente

CI/CD

Ambientes descartáveis

Resumo

O módulo apresenta o ciclo de vida dos contêineres e introduz o conceito de ambientes efêmeros, base para arquiteturas modernas em Docker.

Próximo módulo
M04 → Criando sua Primeira Imagem Docker