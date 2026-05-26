# 🐳 Módulo 04 — Criando sua Primeira Imagem Docker
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulo

Este módulo introduce o **Dockerfile** — o arquivo que define como uma imagem Docker personalizada é construída. Até agora usamos imagens prontas do Docker Hub; a partir daqui, criamos nossas próprias. Dominar o Dockerfile é o passo que transforma você de consumidor para criador no ecossistema Docker.

---

## 🎯 Objetivo do Módulo

- Entender a estrutura e o propósito de um Dockerfile
- Criar e construir sua primeira imagem personalizada
- Compreender as instruções `FROM` e `CMD`
- Executar contêineres a partir de imagens próprias

---

## 📚 Conteúdo

### 1. O que é um Dockerfile?

Um **Dockerfile** é um arquivo de texto sem extensão que contém uma sequência de instruções para construir uma imagem Docker personalizada. Cada instrução gera uma **camada** na imagem final.

```
Dockerfile   ──docker build──►   Imagem   ──docker run──►   Contêiner
 (receita)                       (molde)                    (execução)
```

**Benefícios do Dockerfile:**

| Benefício | Descrição |
|---|---|
| **Padronização** | O mesmo ambiente em qualquer máquina |
| **Versionamento** | O arquivo fica no Git junto com o código |
| **Automação** | CI/CD constrói a imagem automaticamente a cada commit |
| **Reprodutibilidade** | Qualquer pessoa pode recriar o ambiente com um comando |

---

### 2. Principais Instruções

| Instrução | Quando executa | Função |
|---|---|---|
| `FROM` | Build | Define a imagem base (obrigatória, sempre a primeira) |
| `WORKDIR` | Build | Define o diretório de trabalho dentro do contêiner |
| `COPY` | Build | Copia arquivos do host para o contêiner |
| `RUN` | Build | Executa comandos durante a construção da imagem |
| `EXPOSE` | Build | Documenta a porta que a aplicação usa (informativo) |
| `ENV` | Build | Define variáveis de ambiente |
| `CMD` | Execução | Comando padrão ao iniciar o contêiner |

> ⚠️ **Diferença fundamental:** `RUN` executa durante o **build** (construção). `CMD` executa durante o **run** (execução do contêiner).

---

### 3. Estrutura Básica de um Dockerfile

```dockerfile
# FROM → imagem base obrigatória — ponto de partida de toda imagem
# alpine → Linux ultra-leve (~7MB), ideal para aprendizado e produção
FROM alpine

# CMD → comando executado quando o contêiner inicia
# Formato array JSON ["executável", "argumento"] — recomendado (exec form)
CMD ["echo", "Bem-vindo ao Docker!"]
```

---

### 4. A instrução FROM

`FROM` é a **primeira instrução obrigatória** de todo Dockerfile. Define a imagem base sobre a qual tudo será construído. Sem ela, o Docker não sabe de onde começar.

**Exemplos comuns:**

```dockerfile
FROM alpine              # Linux mínimo (~7MB)
FROM node:18-alpine      # Node.js 18 sobre Alpine (~50MB)
FROM python:3.11-slim    # Python enxuto (~130MB)
FROM ubuntu:22.04        # Ubuntu completo (~80MB)
FROM nginx:alpine        # Nginx sobre Alpine (~20MB)
```

---

### 5. A instrução CMD

`CMD` define o **comando padrão executado quando o contêiner inicia**. É executado em tempo de execução — não durante o build.

```dockerfile
# Exec form (recomendada) — executa diretamente, sem shell intermediário
CMD ["echo", "Bem-vindo ao Docker!"]

# Shell form — executa via /bin/sh -c
CMD echo "Bem-vindo ao Docker!"
```

> 💡 O CMD pode ser **sobrescrito** passando um comando ao final do `docker run`:
> ```bash
> docker run minha-imagem echo "Outro comando"
> # Ignora o CMD do Dockerfile e executa o comando fornecido
> ```

---

## 🛠️ Comandos do Módulo

```bash
# Construir a imagem a partir do Dockerfile na pasta atual
# -t → tag: define o nome (e opcionalmente a versão) da imagem
# .  → contexto de build: pasta onde o Dockerfile está
docker build -t hello-docker .

# Construir com versão específica
docker build -t hello-docker:1.0 .

# Executar a imagem criada
docker run hello-docker

# Executar sobrescrevendo o CMD do Dockerfile
docker run hello-docker echo "Comando alternativo"

# Listar imagens disponíveis localmente
docker images

# Ver histórico de camadas da imagem
docker history hello-docker
```

---

## 📝 Exercícios de Fixação

### Exemplo prático — Dockerfile original

```dockerfile
FROM alpine
CMD ["echo", "Hello Docker!"]
```

```bash
# Construir
docker build -t hello-docker .

# Executar → imprime: Hello Docker!
docker run hello-docker
```

---

### Exercício 1 — Dockerfile modificado

```dockerfile
# Dockerfile modificado para exibir nova mensagem
FROM alpine
CMD ["echo", "Bem-vindo ao Docker!"]
```

```bash
# Reconstruir a imagem com a alteração
docker build -t hello-docker .

# Executar → imprime: Bem-vindo ao Docker!
docker run hello-docker
```

---

### Exercício 2 — Explicação das instruções

**Função da instrução `FROM`**

`FROM` define a imagem base — o ponto de partida de toda imagem Docker. É obrigatória e deve ser sempre a primeira instrução. Ela determina o sistema de arquivos inicial, os utilitários disponíveis e a arquitetura do ambiente. No exemplo, `FROM alpine` diz ao Docker: "comece com o Linux Alpine e construa sobre ele".

**Função da instrução `CMD`**

`CMD` define o comando executado quando o contêiner inicia. Diferente do `RUN` (que roda durante o build e congela o resultado em uma camada), o `CMD` é executado toda vez que alguém faz `docker run`. Pode ser sobrescrito pelo usuário sem alterar o Dockerfile. Só pode existir um `CMD` por Dockerfile — se houver mais de um, apenas o último é executado.

**Por que o Dockerfile é importante para padronização?**

Antes do Docker, o problema clássico era *"funciona na minha máquina"* — cada ambiente tinha versões e configurações diferentes instaladas manualmente. O Dockerfile é um **documento executável do ambiente**: em vez de uma lista de passos manuais, é um script que o Docker executa de forma idêntica em qualquer máquina. Qualquer pessoa que clone o projeto e rode `docker build` terá exatamente o mesmo ambiente, independente do sistema operacional. Além disso, o Dockerfile fica no repositório Git — mudanças no ambiente ficam registradas no histórico junto com o código.

---

## ✅ Checklist do Módulo

- [ ] Criou o arquivo `Dockerfile` (sem extensão) na raiz do projeto
- [ ] Adicionou as instruções `FROM alpine` e `CMD`
- [ ] Construiu a imagem com `docker build -t hello-docker .`
- [ ] Executou a imagem com `docker run hello-docker`
- [ ] Modificou o `CMD` para exibir outra mensagem e reconstruiu
- [ ] Consegue explicar a diferença entre `FROM`, `RUN` e `CMD`
- [ ] Verificou a imagem criada com `docker images`

---

## 🌐 Aplicabilidade

**Desenvolvimento de software:** Todo projeto pode ter seu próprio Dockerfile, garantindo que todos os membros da equipe trabalhem em ambientes idênticos, sem conflitos de versão.

**CI/CD (Integração e Entrega Contínua):** Pipelines como GitHub Actions e GitLab CI usam o Dockerfile para construir automaticamente a imagem a cada push, garantindo que o build seja sempre reproduzível.

**Microsserviços:** Cada serviço tem seu próprio Dockerfile, podendo usar linguagens e versões diferentes de forma totalmente isolada.

---

> 📌 **Resumo:** O Dockerfile é o "modo de preparo" da imagem. `FROM` define o ponto de partida; `CMD` define o que acontece quando o contêiner sobe. `docker build` transforma o Dockerfile em imagem; `docker run` transforma a imagem em contêiner.

---

## 📦 Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Docker |
| 02 | Compreendendo Contêineres e Imagens |
| 03 | Gerenciamento de Contêineres |
| **04** | **Criando sua Primeira Imagem Docker** |
| 05 | Dockerfile, docker-compose.yml e nginx.conf |
| 06 e 07 | Volumes, Persistência e Redes |
| 08 e 09 | Gerenciamento e Publicação de Imagens |
| 10 | Otimizando e Debugando Contêineres |