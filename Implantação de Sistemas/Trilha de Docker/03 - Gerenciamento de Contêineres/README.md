# 🐳 Módulo 03 — Gerenciamento de Contêineres
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulo

Este módulo apresenta o **ciclo de vida completo de um contêiner**: como criá-lo, executá-lo em segundo plano, listá-lo, pará-lo e removê-lo. O conceito central é a **efêmeridade** — contêineres são descartáveis por design, e entender isso é fundamental para trabalhar com Docker em ambientes reais.

---

## 🎯 Objetivo do Módulo

- Executar contêineres em primeiro e segundo plano
- Listar contêineres ativos e históricos
- Parar e remover contêineres com segurança
- Compreender o conceito de efêmeridade e suas vantagens práticas

---

## 📚 Conteúdo

### 1. O Conceito de Efêmeridade

Contêineres são **efêmeros** — projetados para ter vida curta e descartável. Diferente de servidores tradicionais (que acumulam configurações e estado ao longo de meses), um contêiner nasce limpo a partir da imagem, executa sua tarefa e pode ser destruído sem consequências para o sistema.

```
Servidor tradicional:              Contêiner Docker:
┌────────────────────┐            ┌──────┐  ┌──────┐  ┌──────┐
│ Configurado há 2   │            │ Nasce│  │Executa│  │ Morre│
│ anos, cheio de     │            │limpo │→ │tarefa │→ │limpo │
│ dependências       │            └──────┘  └──────┘  └──────┘
│ acumuladas         │              ↑ Mesmo estado sempre
└────────────────────┘
```

---

### 2. Ciclo de Vida de um Contêiner

```
[Imagem] ──docker run──► [Rodando] ──docker stop──► [Parado] ──docker rm──► [Removido]
                              │                           │
                         docker ps                  docker ps -a
                    (aparece aqui)              (ainda aparece aqui)
```

---

### 3. Modos de Execução

| Modo | Flag | Comportamento |
|---|---|---|
| **Primeiro plano** | *(sem flag)* | Terminal fica preso nos logs do contêiner |
| **Segundo plano** | `-d` (detached) | Terminal é liberado; contêiner roda em background |
| **Interativo** | `-it` | Terminal conectado ao shell do contêiner |

---

## 🛠️ Comandos do Módulo

```bash
# Executar contêiner em segundo plano (detached)
# -d → libera o terminal; o contêiner continua rodando em background
docker run -d nginx

# Listar apenas contêineres ATIVOS
# Exibe: ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES
docker ps

# Listar TODOS os contêineres (ativos, parados e finalizados)
# -a = --all: inclui contêineres que já encerraram
docker ps -a

# Parar um contêiner graciosamente
# Envia SIGTERM; aguarda 10s; depois força com SIGKILL
docker stop <id-ou-nome>

# Remover um contêiner parado
# Libera o espaço da camada gravável do contêiner
docker rm <id-ou-nome>

# Parar e remover em sequência
docker stop meu-nginx && docker rm meu-nginx

# Remover TODOS os contêineres parados de uma vez (limpeza geral)
docker container prune --force
```

---

## 📝 Exercícios de Fixação

### Exercício 1 — Parar um contêiner em execução

```bash
# 1. Subir o Nginx em segundo plano
docker run -d --name servidor-nginx nginx

# 2. Verificar que está rodando
docker ps

# 3. Parar o contêiner
# docker stop envia SIGTERM (encerramento gracioso)
# O processo tem 10s para finalizar antes do SIGKILL forçado
docker stop servidor-nginx

# 4. Verificar que está parado (não aparece mais no docker ps)
docker ps

# 5. Confirmar que ainda existe (aparece no docker ps -a com status "Exited")
docker ps -a
```

---

### Exercício 2 — Remover o contêiner parado

```bash
# Remover o contêiner parado
# ATENÇÃO: só funciona se o contêiner estiver parado
# Para forçar remoção de um contêiner ativo: docker rm -f <nome>
docker rm servidor-nginx

# Confirmar remoção (não deve aparecer nem no docker ps -a)
docker ps -a
```

---

### Exercício 3 — Conceitos sobre Efêmeridade

**a) O que significa dizer que um contêiner é efêmero?**

Significa que ele foi projetado para ter vida curta e descartável. Cada contêiner nasce do zero a partir de uma imagem limpa — sem estado acumulado, sem configurações herdadas de execuções anteriores. Quando é removido, tudo que estava na sua camada gravável interna desaparece junto. É o oposto de um servidor tradicional, onde anos de configuração podem se acumular.

**b) Vantagens da efêmeridade no desenvolvimento e deploy:**

| Vantagem | Descrição |
|---|---|
| **Ambientes limpos** | Cada execução parte do mesmo estado inicial — elimina o "funciona na minha máquina" |
| **Escalabilidade rápida** | Novos contêineres sobem em segundos; basta criar mais instâncias da mesma imagem |
| **Deploy sem medo** | Novo contêiner substitui o antigo; rollback é só subir a versão anterior |
| **Isolamento** | Falha em um contêiner não afeta os demais |
| **Testes limpos** | Crie um contêiner para o teste, use e descarte — sem resíduo no sistema |

---

## ✅ Checklist do Módulo

- [ ] Executou `docker run -d nginx` e o terminal foi liberado
- [ ] Visualizou o contêiner ativo com `docker ps`
- [ ] Compreendeu a diferença entre `docker ps` e `docker ps -a`
- [ ] Parou o contêiner com `docker stop`
- [ ] Removeu o contêiner com `docker rm`
- [ ] Consegue explicar o conceito de efêmeridade e suas vantagens

---

## 🌐 Aplicabilidade

**Deploy de aplicações:** Em produção, atualizar uma aplicação significa parar o contêiner antigo e subir um novo com a imagem atualizada — sem instalações manuais no servidor.

**Ambientes de teste:** QA pode criar um contêiner limpo para cada rodada de testes e descartá-lo ao final — garantindo que um teste não influencia o próximo.

**Microserviços:** Cada serviço roda em seu próprio contêiner. Reiniciar, atualizar ou escalar um serviço não impacta os demais.

---

> 📌 **Resumo:** Contêineres têm ciclo de vida controlado: `run` → `stop` → `rm`. A efêmeridade garante ambientes previsíveis, deploys seguros e escalabilidade rápida — pilares do desenvolvimento moderno.

---

## 📦 Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Docker |
| 02 | Compreendendo Contêineres e Imagens |
| **03** | **Gerenciamento de Contêineres** |
| 04 | Criando sua Primeira Imagem Docker |
| 05 | Dockerfile, docker-compose.yml e nginx.conf |
| 06 e 07 | Volumes, Persistência e Redes |
| 08 e 09 | Gerenciamento e Publicação de Imagens |
| 10 | Otimizando e Debugando Contêineres |