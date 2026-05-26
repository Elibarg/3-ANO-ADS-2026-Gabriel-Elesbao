# 🐳 Módulo 10 — Otimizando e Debugando Contêineres
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulo

Este é o módulo de **aplicação integradora** da Trilha de Docker. Além de apresentar técnicas de debug e otimização de imagens, propõe dois desafios práticos que consolidam todos os conceitos anteriores: criação de ambientes completos com múltiplos serviços. Ao concluir este módulo, o aluno terá construído projetos reais prontos para apresentação.

---

## 🎯 Objetivo do Módulo

- Investigar e corrigir problemas em contêineres usando logs e shell interativo
- Otimizar Dockerfiles para imagens menores e builds mais rápidos
- Aplicar todos os conceitos da trilha em dois projetos completos:
  - **Desafio 1:** PHP + Nginx + MySQL + Composer
  - **Desafio 2:** Vue.js + Nginx + Node.js API + MySQL

---

## 📚 Conteúdo

### 1. Debugging de Contêineres

Quando um contêiner não inicia, trava ou apresenta comportamento inesperado, existem dois recursos principais de diagnóstico:

#### 1.1 Logs do Contêiner

```bash
# Exibe todo o histórico de saída (stdout + stderr) do contêiner
docker logs <nome>

# Modo follow: exibe em tempo real (como tail -f)
docker logs -f <nome>

# Últimas N linhas
docker logs --tail 50 <nome>

# Logs dos últimos 5 minutos
docker logs --since 5m <nome>

# Com docker compose (mostra serviço de origem com cor)
docker compose logs -f
docker compose logs -f backend
```

> 💡 **Dica:** Se o contêiner reinicia rapidamente (loop de crash), os logs são a primeira e mais importante fonte de diagnóstico.

#### 1.2 Shell Interativo

```bash
# Acessar o terminal de um contêiner em execução (imagens Alpine)
docker exec -it <nome> sh

# Para imagens baseadas em Debian/Ubuntu (possuem bash)
docker exec -it <nome> bash

# Executar comandos pontuais sem abrir shell
docker exec <nome> cat /etc/nginx/nginx.conf
docker exec <nome> env
docker exec <nome> ls -la /var/www/html
```

#### 1.3 Inspeção e Estatísticas

```bash
# Uso de CPU, memória e rede em tempo real (equivalente ao top do Linux)
docker stats

# Detalhes completos do contêiner em JSON
docker inspect <nome>

# Extrair IP interno do contêiner
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <nome>
```

---

### 2. Otimização de Imagens

#### 2.1 Boas Práticas de Dockerfile

```dockerfile
# ✅ Use Alpine quando possível (~7MB vs ~900MB do Ubuntu)
FROM node:18-alpine

# ✅ Combine comandos RUN para reduzir camadas
RUN apt-get update \
    && apt-get install -y curl unzip \
    && rm -rf /var/lib/apt/lists/*

# ✅ Copie package.json antes do código (cache de camadas)
COPY package*.json ./
RUN npm ci --only=production

# ✅ Copie o código por último (muda com mais frequência)
COPY . .
```

#### 2.2 Multi-Stage Build

Técnica avançada para criar imagens de produção mínimas. O estágio de build instala ferramentas pesadas; a imagem final recebe apenas o artefato necessário.

```dockerfile
# ── ESTÁGIO 1: build (imagem pesada com ferramentas) ────────
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build           # gera pasta dist/

# ── ESTÁGIO 2: produção (imagem leve sem Node.js) ───────────
FROM nginx:alpine
# Copia apenas os arquivos compilados do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```

**Resultado:** Imagem final com ~20MB em vez de ~400MB — sem código-fonte, sem Node.js, sem ferramentas de build.

#### 2.3 .dockerignore

```
# .dockerignore — impede cópia de arquivos desnecessários no build
node_modules/
.git/
*.log
.env
dist/
coverage/
```

---

### 3. Desafio 1 — PHP + Nginx + MySQL + Composer

#### Arquitetura

```
Usuário ──► Nginx :80 ──FastCGI──► PHP-FPM :9000 ──PDO──► MySQL :3306
                  └──────────── arquivos estáticos (.css, .js, img)
```

#### Estrutura de arquivos

```
desafio1/
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── php/
    ├── Dockerfile
    ├── composer.json
    └── index.php
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./php:/var/www/html:ro
    depends_on:
      - php
    networks:
      - php_network

  php:
    build: ./php
    expose:
      - "9000"
    volumes:
      - ./php:/var/www/html
    environment:
      - DB_HOST=mysql
      - DB_NAME=app_db
      - DB_USER=appuser
      - DB_PASSWORD=senha123
    depends_on:
      - mysql
    networks:
      - php_network

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootSenha
      - MYSQL_DATABASE=app_db
      - MYSQL_USER=appuser
      - MYSQL_PASSWORD=senha123
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - php_network

volumes:
  mysql_data:

networks:
  php_network:
    driver: bridge
```

#### nginx.conf — FastCGI para PHP-FPM

```nginx
server {
    listen 80;
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Encaminha arquivos .php para o PHP-FPM
    location ~ \.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

#### Dockerfile do PHP

```dockerfile
FROM php:8.2-fpm
RUN apt-get update && apt-get install -y \
    libpdo-mysql-dev unzip curl \
    && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo_mysql zip
RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /var/www/html
COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader
COPY . .
EXPOSE 9000
CMD ["php-fpm", "-F"]
```

---

### 4. Desafio 2 — Vue.js + Nginx + Node.js API + MySQL

#### Arquitetura

```
Usuário ──► Nginx :80 ─┬─ GET /        ──► Vue build (dist/)
                        └─ GET /api/*   ──proxy──► Node.js :3000 ──► MySQL :3306
```

#### Estrutura de arquivos

```
desafio2/
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   └── server.js
└── frontend/
    ├── Dockerfile
    └── src/
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - vue_build:/usr/share/nginx/html:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app_network

  frontend:
    build:
      context: ./frontend
      args:
        - VITE_API_URL=/api
    volumes:
      - vue_build:/usr/share/nginx/html
    networks:
      - app_network

  backend:
    build: ./backend
    expose:
      - "3000"
    environment:
      - DB_HOST=mysql
      - DB_NAME=app_db
      - DB_USER=appuser
      - DB_PASSWORD=senha123
    depends_on:
      - mysql
    networks:
      - app_network

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootSenha
      - MYSQL_DATABASE=app_db
      - MYSQL_USER=appuser
      - MYSQL_PASSWORD=senha123
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - app_network

volumes:
  mysql_data:
  vue_build:

networks:
  app_network:
    driver: bridge
```

---

## 🛠️ Comandos dos Desafios

```bash
# Subir o ambiente completo e reconstruir imagens
docker compose up -d --build

# Verificar se todos os serviços estão rodando
docker compose ps

# Testar a API
curl http://localhost/api/health

# Ver logs em tempo real de todos os serviços
docker compose logs -f

# Acessar o shell do backend para debug
docker compose exec backend sh

# Acessar o MySQL interativamente
docker compose exec mysql mysql -u appuser -p app_db

# Derrubar o ambiente (mantém volumes)
docker compose down

# Derrubar e remover volumes (apaga dados do banco)
docker compose down -v
```

---

## 📝 Critérios de Avaliação

| Critério | Descrição |
|---|---|
| **Funcionalidade** | Ambiente sobe sem erros; serviços comunicam corretamente |
| **Persistência** | Banco de dados mantém dados após restart |
| **Proxy reverso** | Nginx roteia `/api/` para o backend corretamente |
| **Organização** | Arquivos em estrutura de pastas clara e lógica |
| **Comentários** | Dockerfiles e docker-compose.yml comentados |
| **Debug** | Consegue investigar erros com `logs` e `exec` |

---

## ✅ Checklist do Módulo

**Debug e Otimização:**
- [ ] Verificou logs com `docker logs` e `docker compose logs`
- [ ] Acessou shell interativo com `docker exec -it`
- [ ] Usou `docker stats` para monitorar recursos
- [ ] Aplicou `.dockerignore` no projeto
- [ ] Testou Multi-Stage Build em pelo menos um Dockerfile

**Desafio 1 (PHP):**
- [ ] `docker-compose.yml` com nginx, php e mysql
- [ ] `Dockerfile` do PHP com Composer instalado
- [ ] `nginx.conf` com FastCGI apontando para `php:9000`
- [ ] Banco persistindo dados em volume
- [ ] `docker compose up -d --build` sem erros
- [ ] Página PHP acessível no navegador

**Desafio 2 (Vue + Node):**
- [ ] `docker-compose.yml` com nginx, frontend, backend e mysql
- [ ] Dockerfile do frontend com Multi-Stage Build
- [ ] Dockerfile do backend Node.js
- [ ] `nginx.conf` com `/` servindo Vue e `/api/` com proxy para Node
- [ ] Volume compartilhado entre frontend e nginx
- [ ] Frontend acessível e API respondendo em `/api/health`

---

## 🌐 Aplicabilidade

**Ambientes de desenvolvimento:** Com `docker compose up`, qualquer membro do time tem o ambiente completo rodando em minutos, sem instalar PHP, Node, MySQL ou Nginx na máquina local.

**Staging e produção:** Os mesmos arquivos usados em desenvolvimento podem ser ajustados para produção com variáveis de ambiente — garantindo paridade entre ambientes.

**Portfólio profissional:** Os dois desafios deste módulo representam arquiteturas reais usadas no mercado — projetos PHP monolíticos e stacks modernas com SPA + API REST.

---

> 📌 **Resumo:** Debug com `logs` e `exec`, otimização com Alpine e Multi-Stage Build, e dois projetos completos integrando tudo da trilha. Ao concluir este módulo, você tem a base técnica para containerizar qualquer aplicação real.

---

## 📦 Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Docker |
| 02 | Compreendendo Contêineres e Imagens |
| 03 | Gerenciamento de Contêineres |
| 04 | Criando sua Primeira Imagem Docker |
| 05 | Dockerfile, docker-compose.yml e nginx.conf |
| 06 e 07 | Volumes, Persistência de Dados e Redes |
| 08 e 09 | Gerenciamento e Publicação de Imagens |
| **10** | **Otimizando e Debugando Contêineres** |