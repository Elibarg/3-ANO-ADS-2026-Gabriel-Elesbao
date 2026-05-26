# ============================================================
# MÓDULO 04 — Criando sua Primeira Imagem Docker
# Comandos para build e execução | Trilha de Docker | UniSENAI 2026
# ============================================================


# ── PASSO 1: Construir a imagem a partir do Dockerfile ───────

# docker build → lê o Dockerfile e constrói uma imagem camada por camada
# -t           → tag: define o nome (e opcionalmente a versão) da imagem
#   hello-docker → nome dado à imagem (pode ser qualquer nome)
#   :1.0         → versão/tag (opcional; sem isso usaria "latest" por padrão)
# .            → contexto de build: pasta atual onde o Dockerfile está
#                O Docker empacota todos os arquivos desta pasta e os envia
#                ao Docker daemon para processar. Por isso o Dockerfile
#                precisa estar na pasta indicada (ou usar -f para outro caminho)
docker build -t hello-docker:1.0 .

# Verificar que a imagem foi criada:
# docker images → lista todas as imagens disponíveis localmente
# Exibe: REPOSITORY | TAG | IMAGE ID | CREATED | SIZE
docker images


# ── PASSO 2: Executar a imagem criada ────────────────────────

# docker run   → cria um contêiner a partir da imagem e o executa
# hello-docker → nome da imagem que construímos no passo anterior
# :1.0         → versão específica (sem isso, procura "latest")
# O contêiner vai executar o CMD definido no Dockerfile:
#   echo "Bem-vindo ao Docker!"
# e encerrar logo em seguida (não há processo contínuo)
docker run hello-docker:1.0

# Saída esperada no terminal:
# Bem-vindo ao Docker!

# Sobrescrever o CMD sem alterar o Dockerfile:
# O comando passado ao final do "docker run" substitui o CMD da imagem
# Útil para testar variações sem precisar rebuildar
docker run hello-docker:1.0 echo "Comando diferente sem alterar o Dockerfile!"

# Ver o contêiner que finalizou:
# docker ps -a → mostra todos os contêineres, incluindo os já encerrados
# O STATUS deve mostrar "Exited (0)" — código 0 = sucesso, sem erros
docker ps -a