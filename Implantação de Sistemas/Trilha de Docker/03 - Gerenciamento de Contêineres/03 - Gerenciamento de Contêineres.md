# ============================================================
# MÓDULO 03 — Gerenciamento de Contêineres
# Trilha de Docker | UniSENAI 2026
# ============================================================


# ── EXEMPLO PRÁTICO DO MÓDULO ────────────────────────────────

# docker run → baixa (se necessário) e executa a imagem do Nginx
# -d         → detached: roda em segundo plano sem travar o terminal
#              Sem o -d, o terminal ficaria preso exibindo os logs do Nginx
# nginx      → imagem oficial do servidor web Nginx
docker run -d nginx

# docker ps → lista apenas os contêineres ATIVOS no momento
# Exibe colunas: CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES
docker ps

# docker ps -a → lista TODOS os contêineres: ativos, parados e finalizados
# -a = --all: inclui contêineres que já encerraram e não foram removidos
# Útil para ver o histórico ou remover contêineres antigos
docker ps -a


# ── EXERCÍCIO 1: Parar um contêiner em execução ──────────────

# docker stop → envia o sinal SIGTERM ao processo principal do contêiner
#               O processo tem 10 segundos para encerrar graciosamente
#               (salvar estado, fechar conexões, etc.) antes do SIGKILL forçado
# <id-ou-nome> → pode ser o nome do contêiner (ex: "meu-nginx") ou
#                os primeiros caracteres do CONTAINER ID (ex: "a3f")
docker stop <id-ou-nome-do-container>

# Exemplo real (substituindo pelo nome ou ID que aparecer no docker ps):
# docker stop meu-nginx
# docker stop a3f2c


# ── EXERCÍCIO 2: Remover o contêiner parado ──────────────────

# docker rm → remove permanentemente um contêiner parado do sistema
# Libera o espaço da camada gravável que o contêiner ocupava
# ATENÇÃO: não remove a IMAGEM, apenas o contêiner (instância)
# Se o contêiner ainda estiver rodando, retorna erro —
# use docker stop antes, ou force com docker rm -f
docker rm <id-ou-nome-do-container>

# Atalho: parar e remover em sequência (pipeline)
# docker stop meu-nginx && docker rm meu-nginx

# Remover TODOS os contêineres parados de uma vez (limpeza geral):
# docker container prune → remove todos os contêineres no estado "Exited"
# --force → não pede confirmação
docker container prune --force

# Verificar que foi removido (não deve aparecer mais, nem com -a):
docker ps -a