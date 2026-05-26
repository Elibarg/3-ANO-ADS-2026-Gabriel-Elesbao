# 🐳 Módulos 08 e 09 — Gerenciamento e Publicação de Imagens
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulos

Estes módulos cobrem o **ciclo de vida completo de uma imagem Docker**: como criá-la, inspecioná-la, gerenciá-la localmente e publicá-la no Docker Hub para compartilhamento com a equipe ou o mundo. Dominar esses fluxos é essencial para trabalhar com Docker em times e pipelines de CI/CD.

---

## 🎯 Objetivo dos Módulos

**Módulo 08 — Gerenciamento:**
- Criar imagens a partir de Dockerfiles
- Listar, inspecionar e remover imagens locais
- Entender o sistema de camadas e o cache do Docker

**Módulo 09 — Publicação:**
- Autenticar no Docker Hub
- Taguear e publicar imagens
- Versionar imagens com boas práticas

---

## 📚 Conteúdo

### Módulo 08 — Gerenciamento de Imagens

#### 1. Sistema de Camadas

O Docker cria imagens usando um **sistema de camadas imutáveis**. Cada instrução do Dockerfile gera uma camada independente, que pode ser compartilhada entre imagens diferentes.

```
Dockerfile:              Camadas resultantes:
                         ┌─────────────────────┐
CMD ["node", "server"]   │ Camada 6 — CMD       │ ← muda raramente
COPY . .                 │ Camada 5 — Código    │ ← muda a cada commit
RUN npm install          │ Camada 4 — npm deps  │ ← muda ao alterar package.json
COPY package*.json ./    │ Camada 3 — package   │
WORKDIR /app             │ Camada 2 — workdir   │
FROM node:18-alpine      │ Camada 1 — Base      │ ← reutilizada entre projetos
                         └─────────────────────┘
```

#### 2. Cache de Camadas

O Docker reutiliza camadas que não mudaram desde o último build. Se uma camada muda, **todas abaixo dela são invalidadas**.

```
✅ Regra de ouro: coloque o que muda menos no TOPO,
   e o que muda mais (código-fonte) no FINAL do Dockerfile.
```

**Impacto prático:**

| Cenário | Sem ordem correta | Com ordem correta |
|---|---|---|
| Mudança no código | Reinstala npm (~3 min) | Pula npm, só copia (~5s) |
| Mudança em package.json | Reinstala npm (~3 min) | Reinstala npm (~3 min) |

---

### Módulo 09 — Publicação no Docker Hub

#### 1. Fluxo de Publicação

```
[Imagem local] ──docker tag──► [Imagem tagueada] ──docker push──► [Docker Hub]
 minha-app:1.0                  usuario/app:1.0                    (público/privado)
```

#### 2. Versionamento de Imagens

| Tag | Significado | Mutável? |
|---|---|---|
| `usuario/app:latest` | Versão mais recente estável | ✅ Sim |
| `usuario/app:1.2.3` | Versão exata (semântico) | ❌ Nunca sobrescrever |
| `usuario/app:1.2` | Patch mais recente da minor 1.2 | ✅ Sim |
| `usuario/app:dev` | Build de desenvolvimento (instável) | ✅ Sim |

> ⚠️ **Boa prática:** Nunca sobrescreva tags de versão específica (`1.0.0`, `2.3.1`). Isso garante que qualquer pessoa que baixe uma versão específica receba exatamente o que espera.

---

## 🛠️ Comandos do Módulo

```bash
# ── GERENCIAMENTO (Módulo 08) ────────────────────────────────

# Construir imagem com nome e versão
docker build -t minha-app:1.0 .

# Criar alias (tag) para uma imagem existente
# Não duplica a imagem — apenas cria outro nome para ela
docker tag minha-app:1.0 minha-app:latest

# Listar imagens locais
docker images

# Listar com formato personalizado
docker image ls --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Inspecionar todos os detalhes de uma imagem (JSON completo)
docker image inspect minha-app:1.0

# Ver histórico de camadas com tamanho de cada uma
docker history minha-app:1.0

# Remover imagem específica
docker rmi minha-app:1.0

# Remover imagens sem uso (dangling = sem tag, órfãs de builds antigos)
docker image prune

# Remover TODAS as imagens não utilizadas por nenhum contêiner
docker image prune -a --force

# Limpeza geral: contêineres parados + imagens + redes não usadas + cache
docker system prune --force


# ── PUBLICAÇÃO (Módulo 09) ───────────────────────────────────

# Autenticar no Docker Hub
docker login

# Taguear para o Docker Hub (formato obrigatório: usuario/nome:versao)
docker tag minha-app:1.0 seuusuario/minha-app:1.0
docker tag minha-app:1.0 seuusuario/minha-app:latest

# Publicar no Docker Hub
docker push seuusuario/minha-app:1.0
docker push seuusuario/minha-app:latest

# Baixar imagem publicada por outro usuário
docker pull nginx:alpine

# Encerrar sessão do Docker Hub
docker logout
```

---

## 📝 Exercícios de Fixação

### Módulo 08 — Exercício 1, 2 e 3: Criar, Listar e Remover

```bash
# 1. Criar imagem a partir do Dockerfile
docker build -t minha-app:1.0 .

# 2. Listar imagens criadas
docker images minha-app

# 3. Verificar que nenhum contêiner usa a imagem antes de remover
docker ps -a

# Remover
docker rmi minha-app:1.0
```

---

### Módulo 08 — Exercício 4: Cache de Camadas

O Docker armazena o resultado de cada instrução do Dockerfile em cache. Na próxima execução do `docker build`, verifica instrução por instrução se houve mudança. Se não houve, reutiliza a camada cacheada — que já foi processada, testada e está pronta. Se houve mudança em uma instrução, ela e todas as instruções abaixo são reexecutadas.

**Por isso é fundamental copiar `package.json` antes do código:**

```dockerfile
COPY package*.json ./   # camada 3 — só invalida cache se dependências mudarem
RUN npm install         # camada 4 — reutilizada em 99% dos commits
COPY . .                # camada 5 — sempre invalida (código muda a cada commit)
```

Resultado: um `npm install` que levaria 3 minutos é ignorado em praticamente todos os builds diários — apenas o código é recopiado.

---

### Módulo 09 — Exercício 1: Publicar imagem

```bash
docker login
docker tag minha-app:1.0 seuusuario/minha-app:1.0
docker push seuusuario/minha-app:1.0
# Acesse hub.docker.com e veja a imagem publicada no seu perfil
```

### Módulo 09 — Exercício 2: Baixar e executar imagem de outro usuário

```bash
# Baixar e executar o Nginx de outro usuário/oficial
docker run -d -p 8080:80 --name teste-nginx nginx:alpine
# Acesse http://localhost:8080 para ver o Nginx funcionando
```

### Módulo 09 — Exercício 3: Importância do versionamento

Sem versionamento, todos os ambientes usariam sempre `latest` — e uma mudança quebrada publicada acidentalmente afetaria todos instantaneamente, sem possibilidade de rollback confiável. Com tags de versão semânticas (`1.0.0`, `1.1.0`, `2.0.0`): dev usa `2.0.0-beta`; produção usa `1.9.5`; rollback é `docker run usuario/app:1.9.4` — instantâneo e rastreável.

---

## ✅ Checklist do Módulo

- [ ] Construiu imagem com `docker build -t nome:versao .`
- [ ] Listou imagens com `docker images` e `docker image ls`
- [ ] Inspecionou camadas com `docker history`
- [ ] Removeu imagem com `docker rmi`
- [ ] Autenticou no Docker Hub com `docker login`
- [ ] Tagueou imagem no formato `usuario/nome:versao`
- [ ] Publicou imagem com `docker push`
- [ ] Consegue explicar o sistema de cache de camadas
- [ ] Consegue explicar a importância do versionamento semântico

---

## 🌐 Aplicabilidade

**CI/CD:** Pipelines constroem a imagem, tagueiam com o número do commit ou versão e publicam no registry — automaticamente a cada merge na branch principal.

**Equipes distribuídas:** Um desenvolvedor publica a imagem; todos os outros a puxam com `docker pull` — sem precisar configurar o ambiente localmente.

**Rollback em produção:** Se um deploy com `2.1.0` quebrar, basta alterar o serviço para usar `2.0.3` — a imagem estável está no registry e o rollback leva segundos.

---

> 📌 **Resumo:** Imagens são construídas em camadas reutilizáveis (cache). Gerenciar bem as tags e versões garante rastreabilidade e rollback confiável. O Docker Hub é o canal de distribuição — de imagens pessoais a oficiais compartilhadas com o mundo.

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
| **08 e 09** | **Gerenciamento e Publicação de Imagens** |
| 10 | Otimizando e Debugando Contêineres |