# ==============================================================
# MÓDULO 08 — GERENCIAMENTO DE IMAGENS
# ==============================================================
 
# ── EXERCÍCIO 1: Criar uma imagem a partir de um Dockerfile ──
 
# docker build  → constrói uma imagem a partir de um Dockerfile
# -t            → tag: dá um nome e versão à imagem no formato nome:versão
#   minha-app   → nome da imagem
#   :1.0        → versão/tag (se omitido, usa "latest" por padrão)
# .             → contexto de build: pasta onde o Dockerfile está (pasta atual)
#                 O Docker empacota todos os arquivos desta pasta para o build
docker build -t minha-app:1.0 .
 
# Boa prática: também taguear como "latest" para facilitar referência
# docker tag → cria um "apelido" para uma imagem existente (não duplica dados)
# Formato: docker tag IMAGEM_ORIGEM NOVA_TAG
docker tag minha-app:1.0 minha-app:latest
 
 
# ── EXERCÍCIO 2: Listar imagens criadas no ambiente ──
 
# docker images → lista todas as imagens disponíveis localmente
# Exibe: REPOSITORY (nome), TAG (versão), IMAGE ID, CREATED, SIZE
docker images
 
# Versão com filtro para uma imagem específica:
# docker images → mesmo comando
# minha-app    → filtra apenas imagens com esse nome
docker images minha-app
 
# docker image ls --format → exibe em formato customizado (mais legível)
# "table ..." → formata como tabela com as colunas especificadas
docker image ls --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}"
 
# docker image inspect → exibe JSON completo com todos os detalhes da imagem
# Útil para ver camadas, variáveis de ambiente, porta exposta, etc.
docker image inspect minha-app:1.0
 
 
# ── EXERCÍCIO 3: Remover imagem não utilizada ──
 
# Antes de remover, verificar se algum contêiner usa a imagem:
# docker ps -a → lista todos os contêineres (rodando e parados)
docker ps -a
 
# docker rmi → remove uma imagem (rmi = remove image)
# minha-app:1.0 → nome:tag da imagem a remover
# ATENÇÃO: falha se algum contêiner (mesmo parado) ainda usa a imagem
docker rmi minha-app:1.0
 
# Se houver contêiner usando: parar e remover primeiro
# docker stop + rm → para e remove o contêiner que impede a remoção da imagem
docker stop nome-do-conteiner
docker rm nome-do-conteiner
docker rmi minha-app:1.0
 
# docker image prune → remove TODAS as imagens "dangling" (sem tag/sem uso)
# São imagens intermediárias que ficaram orphãs após rebuilds
# -a → remove também imagens que não estão sendo usadas por nenhum contêiner
# --force → não pede confirmação
docker image prune -a --force
 
# docker system prune → limpeza geral: remove contêineres parados, redes
# não usadas, imagens dangling e cache de build
# Use com cuidado em produção!
docker system prune --force
 
 
# ==============================================================
# MÓDULO 09 — PUBLICAÇÃO DE IMAGENS NO DOCKER HUB
# ==============================================================
 
# ── EXERCÍCIO 1: Publicar imagem no Docker Hub ──
 
# PASSO 1: Autenticar no Docker Hub
# docker login → abre prompt pedindo usuário e senha do hub.docker.com
# Após login bem-sucedido, as credenciais ficam salvas localmente
docker login
 
# PASSO 2: Taguear a imagem com o prefixo do seu usuário Docker Hub
# Obrigatório: o Docker Hub exige o formato "usuario/nome-imagem:versao"
# docker tag → cria um alias sem duplicar a imagem no disco
#   minha-app:1.0              → imagem local existente
#   seuusuario/minha-app:1.0   → nova tag com prefixo do usuário (para o Hub)
docker tag minha-app:1.0 seuusuario/minha-app:1.0
 
# Taguear também como latest (boa prática):
docker tag minha-app:1.0 seuusuario/minha-app:latest
 
# PASSO 3: Enviar a imagem para o Docker Hub
# docker push → faz upload das camadas da imagem para o repositório remoto
# Camadas já existentes no Hub são ignoradas (upload incremental)
docker push seuusuario/minha-app:1.0
docker push seuusuario/minha-app:latest
 
 
# ── EXERCÍCIO 2: Baixar e executar imagem de outro usuário ──
 
# docker pull → baixa uma imagem do Docker Hub sem executá-la ainda
# Útil para baixar previamente antes de precisar (ambientes sem internet depois)
# Formato: docker pull usuario/imagem:tag
docker pull nginx:alpine
 
# docker run → baixa (se necessário) e executa a imagem
# -d          → roda em segundo plano
# -p 8080:80  → mapeia porta 8080 do host para porta 80 do contêiner
# --name      → nome amigável para o contêiner
docker run -d -p 8080:80 --name servidor-nginx nginx:alpine
 
# Verifica que está rodando e acessível
docker ps
# Acesse http://localhost:8080 no navegador para ver o Nginx funcionando
 
 
# ── Verificar histórico de camadas de uma imagem ──
# docker history → mostra cada camada da imagem com seu tamanho e comando que a criou
# Ajuda a entender como a imagem foi construída e identificar camadas pesadas
docker history minha-app:1.0