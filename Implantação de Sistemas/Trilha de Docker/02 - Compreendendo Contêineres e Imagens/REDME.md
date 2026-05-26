# 🐳 Módulo 02 — Compreendendo Contêineres e Imagens
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulo

Este módulo apresenta os dois conceitos fundamentais do Docker: **imagens** e **contêineres**. Antes de avançar para qualquer prática com Docker, é essencial entender a diferença entre esses dois elementos e como eles se relacionam. Todo o ecossistema Docker é construído sobre essa distinção.

---

## 🎯 Objetivo do Módulo

Compreender conceitualmente e na prática:

- O que é uma **imagem Docker** e como ela é estruturada
- O que é um **contêiner** e como ele se origina de uma imagem
- A diferença fundamental entre imagem e contêiner
- Como utilizar o **Docker Hub** para baixar imagens prontas

---

## 📚 Conteúdo

### 1. Imagem Docker

Uma **imagem** é um pacote **estático e imutável** que contém tudo o que uma aplicação precisa para ser executada:

| Componente | Descrição |
|---|---|
| **Código** | O código-fonte ou binário da aplicação |
| **Dependências** | Bibliotecas e pacotes necessários |
| **Configurações** | Variáveis de ambiente e arquivos de configuração |
| **Sistema base** | Sistema de arquivos mínimo (ex: Alpine Linux) |

> 💡 **Analogia:** A imagem é como a **receita de um bolo** — ela define todos os ingredientes e o modo de preparo, mas por si só não é o bolo.

---

### 2. Contêiner

Um **contêiner** é uma instância em execução de uma imagem. Quando você executa `docker run`, o Docker cria uma camada gravável temporária sobre a imagem e inicia o processo definido nela. Esse processo isolado é o contêiner.

> 💡 **Analogia:** O contêiner é o **bolo pronto** — criado a partir da receita (imagem) e sendo consumido (executado).

---

### 3. Diferença entre Imagem e Contêiner

```
           IMAGEM                        CONTÊINER
     ┌─────────────────┐           ┌─────────────────────┐
     │  Estática        │  docker   │  Dinâmico            │
     │  Imutável        │  ──run──► │  Em execução         │
     │  Somente leitura │           │  Camada gravável     │
     │  Armazenada      │           │  Temporário          │
     └─────────────────┘           └─────────────────────┘
          "Receita"                      "O bolo pronto"
```

| Característica | Imagem | Contêiner |
|---|---|---|
| **Estado** | Imutável | Dinâmico |
| **Ciclo de vida** | Persiste até ser removida | Existe enquanto o processo roda |
| **Armazenamento** | Somente leitura | Tem camada gravável |
| **Multiplicidade** | Uma imagem | Vários contêineres da mesma imagem |

---

### 4. Docker Hub

O **Docker Hub** é o repositório centralizado de imagens Docker, onde desenvolvedores e empresas compartilham imagens prontas para uso.

🔗 Acesso: [https://hub.docker.com](https://hub.docker.com)

**Categorias de imagens disponíveis:**

| Categoria | Exemplos |
|---|---|
| Bancos de dados | MySQL, PostgreSQL, MongoDB |
| Servidores web | Nginx, Apache |
| Linguagens | Node.js, Python, PHP, Java |
| Sistemas | Alpine, Ubuntu, Debian |

---

## 🛠️ Comandos do Módulo

```bash
# Baixar uma imagem do Docker Hub sem executar
docker pull nome-da-imagem

# Executar um contêiner (baixa a imagem automaticamente se necessário)
docker run hello-world

# Executar o Alpine e observar o encerramento imediato
docker run alpine

# Baixar a imagem do MySQL
docker pull mysql

# Executar o MySQL (senha obrigatória via variável de ambiente)
docker run -d --name meu-mysql -e MYSQL_ROOT_PASSWORD=root mysql

# Listar contêineres em execução
docker ps

# Listar todos os contêineres (incluindo os encerrados)
docker ps -a
```

---

## 📝 Exercícios de Fixação

### Exercício 1 — Comportamento do `docker run alpine`

```bash
docker run alpine
```

**Resultado esperado:** O contêiner sobe e encerra imediatamente.

**Por quê?** O Alpine não possui nenhum processo contínuo definido. Sem um comando para manter o processo vivo, o contêiner conclui e finaliza sozinho — demonstrando que um contêiner não é necessariamente um servidor sempre ligado.

---

### Exercício 2 — Conceitos com suas próprias palavras

**a) O que é uma imagem Docker?**

Uma imagem é um pacote estático e imutável que contém tudo que a aplicação precisa para rodar: sistema de arquivos base, código, dependências e configurações. Ela nunca muda depois de criada — cada instrução do Dockerfile gera uma camada congelada. É o molde, não o produto final.

**b) O que é um contêiner?**

Um contêiner é uma imagem em execução. Quando você executa `docker run`, o Docker cria uma camada gravável temporária sobre a imagem e inicia o processo definido. Esse processo isolado, rodando a partir da imagem, é o contêiner.

**c) Qual a diferença entre eles?**

A imagem é o modelo estático (a receita); o contêiner é a instância dinâmica (o bolo pronto). A mesma imagem pode gerar vários contêineres simultâneos e independentes. Quando o contêiner é removido, a imagem permanece intacta.

---

### Exercício 3 — Docker Hub: MySQL

```bash
# a) Baixar a imagem do MySQL
docker pull mysql

# b) Executar o contêiner do MySQL
# -e MYSQL_ROOT_PASSWORD → obrigatório: sem ela o MySQL recusa iniciar
docker run -d \
  --name meu-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  mysql

# Verificar que está rodando
docker ps
```

---

## ✅ Checklist do Módulo

- [ ] Consegue explicar a diferença entre imagem e contêiner
- [ ] Executou `docker run hello-world` com sucesso
- [ ] Executou `docker run alpine` e compreendeu o encerramento imediato
- [ ] Acessou o Docker Hub e encontrou a imagem do MySQL
- [ ] Baixou e executou o contêiner do MySQL com `docker run`
- [ ] Consegue listar contêineres com `docker ps` e `docker ps -a`

---

## 🌐 Aplicabilidade

**Desenvolvimento:** Saber distinguir imagem de contêiner é a base para entender todo o restante do Docker — Dockerfiles criam imagens; `docker run` cria contêineres.

**Times de desenvolvimento:** O Docker Hub elimina a necessidade de instalar manualmente dependências como MySQL, Redis ou Nginx — basta baixar a imagem e executar.

**Onboarding de novos devs:** Um novo desenvolvedor no time consegue ter o ambiente rodando com um único `docker run`, sem instalar nada manualmente no computador.

---

> 📌 **Resumo:** Imagem é o modelo imutável; contêiner é a instância em execução. A mesma imagem pode gerar múltiplos contêineres simultâneos. O Docker Hub centraliza imagens prontas para uso imediato.

---

## 📦 Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Docker |
| **02** | **Compreendendo Contêineres e Imagens** |
| 03 | Gerenciamento de Contêineres |
| 04 | Criando sua Primeira Imagem Docker |
| 05 | Dockerfile, docker-compose.yml e nginx.conf |
| 06 e 07 | Volumes, Persistência e Redes |
| 08 e 09 | Gerenciamento e Publicação de Imagens |
| 10 | Otimizando e Debugando Contêineres |