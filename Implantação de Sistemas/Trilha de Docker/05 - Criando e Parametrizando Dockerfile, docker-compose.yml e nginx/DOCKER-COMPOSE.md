# ============================================================
# DOCKER-COMPOSE.YML - Orquestra múltiplos contêineres juntos
# ============================================================
# Funciona como um "maestro": define quais contêineres existem,
# como eles se comunicam, quais portas expõem e em que ordem sobem.
# Comando para subir tudo: docker-compose up -d
# Comando para derrubar tudo: docker-compose down

# version → define qual versão da sintaxe do Compose está sendo usada.
# A versão '3.8' é moderna e compatível com a maioria dos ambientes.
version: '3.8'

# services → bloco principal que lista todos os contêineres da aplicação.
# Cada item dentro de services é um serviço (= um contêiner).
services:

  # ── SERVIÇO 1: aplicação web (backend Node.js) ──────────────
  web:
    # build → instrui o Compose a construir a imagem a partir do Dockerfile
    # O "." significa: procure o Dockerfile na pasta atual (mesma do compose).
    build: .

    # container_name → nome fixo para o contêiner (facilita identificação).
    # Sem isso, o Docker gera um nome aleatório tipo "modulo05_web_1".
    container_name: app_web

    # ports → mapeia portas no formato "HOST:CONTÊINER".
    # "3000:3000" significa: acesse localhost:3000 → cai na porta 3000 do contêiner.
    ports:
      - "3000:3000"

    # environment → variáveis de ambiente injetadas no contêiner em tempo de execução.
    # A aplicação Node.js lê essas variáveis via process.env.NOME_DA_VARIAVEL.
    environment:
      - NODE_ENV=production          # modo de execução da aplicação
      - DB_HOST=db                   # host do banco = nome do serviço abaixo
      - DB_PORT=3306                 # porta padrão do MySQL
      - DB_USER=appuser              # usuário do banco de dados
      - DB_PASSWORD=senhaSegura123   # senha do usuário
      - DB_NAME=app_db               # nome do banco a ser usado

    # volumes → sincroniza pastas entre o host e o contêiner.
    # "./logs:/app/logs" = a pasta "logs" local aparece em /app/logs no contêiner.
    # Útil para persistir arquivos de log sem perder quando o contêiner reinicia.
    volumes:
      - ./logs:/app/logs

    # depends_on → define a ORDEM de inicialização dos serviços.
    # O serviço "web" só sobe DEPOIS que o serviço "db" estiver rodando.
    # ATENÇÃO: garante ordem de start, mas não garante que o MySQL esteja pronto.
    depends_on:
      - db

    # networks → conecta o serviço à rede interna definida lá embaixo.
    # Serviços na mesma network se comunicam pelo nome do serviço (ex: "db").
    networks:
      - app_network

    # restart → política de reinicialização automática do contêiner.
    # "unless-stopped" = reinicia sempre, exceto se você parar manualmente.
    restart: unless-stopped

  # ── SERVIÇO 2: banco de dados MySQL ─────────────────────────
  db:
    # image → usa uma imagem pronta do Docker Hub (não precisa de Dockerfile).
    # "mysql:8.0" usa a versão 8.0 oficial do MySQL.
    image: mysql:8.0

    container_name: app_db

    # environment → configurações obrigatórias do MySQL na primeira execução.
    # Sem MYSQL_ROOT_PASSWORD o contêiner não sobe.
    environment:
      - MYSQL_ROOT_PASSWORD=rootSenha123   # senha do usuário root (admin total)
      - MYSQL_DATABASE=app_db              # banco criado automaticamente ao iniciar
      - MYSQL_USER=appuser                 # usuário comum para a aplicação
      - MYSQL_PASSWORD=senhaSegura123      # senha do usuário comum

    # volumes → persistência dos dados do banco.
    # "db_data:/var/lib/mysql" = os dados ficam no volume nomeado "db_data".
    # Sem isso, TODOS os dados são perdidos quando o contêiner é removido!
    volumes:
      - db_data:/var/lib/mysql
      # Opcional: inicializar o banco com um script SQL customizado
      # - ./init.sql:/docker-entrypoint-initdb.d/init.sql

    # ports → expõe o MySQL para acesso externo (ex: MySQL Workbench no host).
    # Em produção, geralmente NÃO se expõe o banco para fora — só internamente.
    ports:
      - "3306:3306"

    networks:
      - app_network

    restart: unless-stopped

  # ── SERVIÇO 3: servidor Nginx (proxy reverso + arquivos estáticos) ──
  nginx:
    # image → usa o Nginx oficial em versão Alpine (bem leve).
    image: nginx:alpine

    container_name: app_nginx

    # ports → o Nginx fica na "porta de entrada" da aplicação.
    # "80:80" = requisições em localhost:80 chegam ao Nginx.
    ports:
      - "80:80"

    # volumes → injeta nossa configuração customizada dentro do contêiner Nginx,
    # substituindo o arquivo de configuração padrão dele.
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro   # :ro = read-only (segurança)
      - ./frontend:/usr/share/nginx/html:ro      # arquivos estáticos do frontend

    # O Nginx só faz sentido subir depois que a aplicação web estiver no ar.
    depends_on:
      - web

    networks:
      - app_network

    restart: unless-stopped

# ── VOLUMES NOMEADOS ────────────────────────────────────────────
# volumes → declara os volumes que foram referenciados nos serviços acima.
# Volumes nomeados são gerenciados pelo Docker e sobrevivem ao "docker-compose down".
# Para remover junto com tudo: docker-compose down -v
volumes:
  db_data:
    # driver: local → armazena os dados no disco local da máquina host.
    driver: local

# ── REDES INTERNAS ──────────────────────────────────────────────
# networks → cria uma rede virtual isolada para os contêineres se comunicarem.
# Serviços na mesma network se enxergam pelo nome do serviço (ex: http://web:3000).
# Serviços fora da network não conseguem acessá-los diretamente.
networks:
  app_network:
    driver: bridge   # bridge = rede isolada padrão, cada contêiner tem seu IP