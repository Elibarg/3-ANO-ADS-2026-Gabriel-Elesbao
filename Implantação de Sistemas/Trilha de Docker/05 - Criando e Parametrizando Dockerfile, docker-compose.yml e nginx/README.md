# 🐳 Módulo 05 — Dockerfile, docker-compose.yml e nginx.conf
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulo

Este módulo apresenta os **três arquivos centrais de todo projeto Docker real**: o `Dockerfile`, o `docker-compose.yml` e o `nginx.conf`. Enquanto o módulo anterior introduziu o Dockerfile de forma simples, aqui aprofundamos suas instruções e aprendemos como orquestrar múltiplos serviços e configurar um servidor web profissional. Juntos, esses três arquivos formam a base de qualquer ambiente containerizado moderno.

---

## 🎯 Objetivo do Módulo

- Dominar as principais instruções do Dockerfile para aplicações reais
- Criar um `docker-compose.yml` para orquestrar múltiplos contêineres
- Configurar o `nginx.conf` como servidor web e proxy reverso
- Compreender o mapeamento de portas no Docker

---

## 📚 Conteúdo

### 1. Dockerfile Completo

O Dockerfile define **como a imagem é construída** passo a passo. Cada instrução gera uma camada imutável na imagem final.

#### Instruções principais

| Instrução | Função |
|---|---|
| `FROM` | Define a imagem base (obrigatória) |
| `LABEL` | Metadados da imagem (autor, versão) |
| `WORKDIR` | Define o diretório de trabalho no contêiner |
| `COPY` | Copia arquivos do host para o contêiner |
| `RUN` | Executa comandos durante o build |
| `EXPOSE` | Documenta a porta que a aplicação usa |
| `ENV` | Define variáveis de ambiente |
| `CMD` | Comando padrão ao iniciar o contêiner |

#### Exemplo comentado — Node.js

```dockerfile
# Imagem base com Node.js 18 sobre Alpine (~50MB)
FROM node:18-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia package.json ANTES do código — aproveita cache de camadas
# Se package.json não mudar, o npm install é ignorado nos próximos builds
COPY package*.json ./

# Instala dependências durante o build
RUN npm install --production

# Copia o restante do código após instalar dependências
COPY . .

# Documenta a porta (não publica automaticamente)
EXPOSE 3000

# Variável de ambiente de produção
ENV NODE_ENV=production

# Comando executado quando o contêiner inicia
CMD ["node", "server.js"]
```

> 💡 **Cache de camadas:** Coloque as instruções que mudam com menor frequência no topo e as que mudam mais (como `COPY . .`) no final. Isso maximiza o reaproveitamento do cache e acelera os builds.

---

### 2. docker-compose.yml

O `docker-compose.yml` permite definir e executar **múltiplos contêineres com um único comando**, controlando como eles se comunicam, quais volumes montam e em que ordem sobem.

> 💡 **Analogia:** O docker-compose é como um shopping — ele organiza várias lojas (serviços). Cada loja vem de uma imagem, que foi criada a partir de um Dockerfile.

#### Estrutura básica

```yaml
version: '3.8'

services:
  web:                          # nome do serviço (= hostname interno)
    build: .                    # constrói a imagem do Dockerfile local
    ports:
      - "8080:80"               # HOST:CONTÊINER
    volumes:
      - ./app:/app              # sincroniza pasta local com o contêiner
    depends_on:
      - db                      # sobe apenas após o serviço "db"
    environment:
      - NODE_ENV=production
    networks:
      - app_network
    restart: unless-stopped

  db:
    image: mysql:8.0            # usa imagem pronta do Docker Hub
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=app_db
    volumes:
      - db_data:/var/lib/mysql  # volume nomeado para persistência
    networks:
      - app_network

volumes:
  db_data:                      # volume gerenciado pelo Docker

networks:
  app_network:
    driver: bridge
```

#### Principais conceitos

| Chave | Função |
|---|---|
| `services` | Define os contêineres da aplicação |
| `ports` | Mapeia portas `HOST:CONTÊINER` |
| `volumes` | Garante persistência de dados |
| `depends_on` | Define a ordem de inicialização |
| `environment` | Injeta variáveis de ambiente |
| `networks` | Rede interna isolada entre serviços |
| `restart` | Política de reinicialização automática |

---

### 3. nginx.conf

O Nginx atua como **servidor web** (arquivos estáticos) e **proxy reverso** (encaminha requisições para outros serviços).

```
Usuário ──► Nginx (porta 80) ──► arquivos estáticos (HTML/CSS/JS)
                              └──► proxy_pass ──► API (porta 3000)
```

#### Exemplo comentado

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    sendfile on;
    gzip on;

    server {
        listen 80;
        server_name localhost;

        # Serve arquivos estáticos do frontend
        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /index.html;  # SPA fallback
        }

        # Proxy reverso para a API backend
        location /api/ {
            proxy_pass http://backend:3000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

---

### 4. Mapeamento de Portas

No Docker, contêineres são isolados. Para tornar uma porta acessível externamente, usa-se o mapeamento no formato:

```
HOST_PORT:CONTAINER_PORT
```

```
Navegador acessa → localhost:8080
                        ↓
               Docker intercepta
                        ↓
          Redireciona para → contêiner:80
                        ↓
              Nginx responde na porta 80
```

**Exemplos comuns:**

| Mapeamento | Serviço |
|---|---|
| `"80:80"` | Nginx / HTTP padrão |
| `"443:443"` | HTTPS |
| `"3306:3306"` | MySQL |
| `"5432:5432"` | PostgreSQL |
| `"8080:80"` | Nginx em porta alternativa |

> ⚠️ **Comunicação interna:** Serviços na mesma rede Docker se comunicam pelo nome do serviço (`http://backend:3000`) sem precisar mapear portas para o host — o que é mais seguro em produção.

---

## 🛠️ Comandos do Módulo

```bash
# Subir todos os serviços do docker-compose.yml
docker compose up -d

# Subir e reconstruir imagens alteradas
docker compose up -d --build

# Derrubar todos os serviços
docker compose down

# Derrubar e remover volumes (apaga dados persistidos)
docker compose down -v

# Ver logs de todos os serviços
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f web
```

---

## 📝 Exercícios de Fixação

### Estrutura do projeto

```
meu-projeto/
├── Dockerfile
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── src/
    └── server.js
```

### Exercício 1 — Dockerfile para aplicação simples

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Exercício 2 — docker-compose.yml com MySQL

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_PASSWORD=root
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=app_db
    volumes:
      - db_data:/var/lib/mysql
volumes:
  db_data:
```

### Exercício 3 — nginx.conf com arquivos estáticos e proxy

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://backend:3000/;
    }
}
```

### Exercício 4 — Mapeamento de portas

O mapeamento `"8080:80"` significa: acessar `localhost:8080` no navegador redireciona para a porta `80` dentro do contêiner, onde o Nginx está escutando. O usuário usa a porta 8080; o contêiner usa a 80. Docker faz a ponte entre as duas transparentemente.

---

## ✅ Checklist do Módulo

- [ ] Dockerfile com `WORKDIR`, `COPY`, `RUN`, `EXPOSE` e `CMD` criado
- [ ] `docker-compose.yml` com serviços `web` e `db` criado
- [ ] `nginx.conf` servindo arquivos estáticos na rota `/`
- [ ] `nginx.conf` com proxy reverso para `/api/`
- [ ] Ambiente subido com `docker compose up -d --build`
- [ ] Consegue explicar o mapeamento de portas `HOST:CONTÊINER`
- [ ] Logs verificados com `docker compose logs -f`

---

## 🌐 Aplicabilidade

**Ambientes completos:** Com esses três arquivos, qualquer desenvolvedor consegue subir um ambiente completo (frontend, backend, banco) com um único `docker compose up`, sem instalar nada manualmente.

**Proxy reverso:** O Nginx como proxy reverso é padrão em produção — ele recebe todo o tráfego e distribui internamente, escondendo a arquitetura de serviços do usuário final.

**Padronização de equipes:** O `docker-compose.yml` no repositório garante que dev, QA e produção usem exatamente a mesma configuração de serviços.

---

> 📌 **Resumo:** `Dockerfile` → constrói a imagem. `docker-compose.yml` → orquestra múltiplos contêineres. `nginx.conf` → configura o servidor web e o proxy reverso. Os três juntos formam o ambiente completo de qualquer aplicação moderna.

---

## 📦 Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Docker |
| 02 | Compreendendo Contêineres e Imagens |
| 03 | Gerenciamento de Contêineres |
| 04 | Criando sua Primeira Imagem Docker |
| **05** | **Dockerfile, docker-compose.yml e nginx.conf** |
| 06 e 07 | Volumes, Persistência e Redes |
| 08 e 09 | Gerenciamento e Publicação de Imagens |
| 10 | Otimizando e Debugando Contêineres |