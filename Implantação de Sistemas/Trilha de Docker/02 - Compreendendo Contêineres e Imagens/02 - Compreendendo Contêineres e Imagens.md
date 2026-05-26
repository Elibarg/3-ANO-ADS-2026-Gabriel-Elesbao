# ============================================================
# MÓDULO 02 — Compreendendo Contêineres e Imagens
# Trilha de Docker | UniSENAI 2026
# ============================================================


# ── EXERCÍCIO 1: Executar docker run alpine e observar o comportamento ──

# docker run → verifica se a imagem existe localmente; se não, baixa do Docker Hub,
#              cria um contêiner a partir dela e o executa
# alpine     → imagem Linux ultra-leve (~7MB), sem nenhum processo contínuo rodando

docker run alpine

# COMPORTAMENTO ESPERADO:
# O contêiner sobe e encerra IMEDIATAMENTE.
# Por quê? Porque o Alpine não tem nenhum comando padrão para manter o processo vivo.
# Sem algo para executar, o contêiner conclui e finaliza sozinho.
# Isso demonstra que contêiner NÃO é necessariamente um servidor sempre ligado —
# ele é apenas um processo isolado que roda e termina quando sua tarefa acaba.

# Para ver o contêiner que já encerrou:
# docker ps -a → lista TODOS os contêineres, incluindo os que já finalizaram
# -a = --all: sem essa flag, só aparecem os contêineres ativos no momento
docker ps -a

# Para fazer o Alpine fazer algo visível antes de encerrar:
# docker run alpine echo "Olá, Docker!"
# Neste caso o contêiner sobe, imprime a mensagem e finaliza.


# ── EXERCÍCIO 3: Baixar e executar imagem do MySQL ──────────────

# docker pull → baixa a imagem do Docker Hub sem executá-la ainda
# mysql       → imagem oficial do MySQL (sem tag = pega a versão "latest")
# Útil quando você quer baixar a imagem previamente antes de usar
docker pull mysql

# docker run  → cria e executa o contêiner MySQL
# -d          → detached: roda em segundo plano, liberando o terminal
# --name      → dá um nome amigável ao contêiner para referenciar depois
# -e          → environment: injeta uma variável de ambiente no contêiner
#   MYSQL_ROOT_PASSWORD=root → senha obrigatória do usuário root do MySQL
#                               Sem ela, o MySQL se recusa a iniciar
# mysql       → nome da imagem a usar (baixada no passo anterior)
docker run -d --name meu-mysql -e MYSQL_ROOT_PASSWORD=root mysql

# Verifica que o MySQL está rodando
# docker ps → lista os contêineres EM EXECUÇÃO com: nome, imagem, porta, status
docker ps