# Módulo 04 — Versionamento e Deploy da Documentação
> **Trilha de Documentação | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

## Sobre este Módulo

Este módulo cobre a integração do MKDocs com sistemas de controle de versão (Git) e a publicação da documentação em plataformas públicas como o **GitHub Pages**. O foco é garantir que a documentação seja versionada, rastreável e continuamente atualizada através de práticas de CI/CD.

---

## Objetivo do Módulo

Versionar e publicar documentação técnica de forma automatizada, contemplando:

- Integração do MKDocs com **Git e GitHub**
- Publicação no **GitHub Pages**
- Configuração de **deploy contínuo** com GitHub Actions
- Boas práticas de **manutenção contínua** da documentação

---

## Conteúdo do Módulo

### 1. Integração com Git

O Git permite rastrear todas as alterações feitas na documentação, revertê-las quando necessário e colaborar com outros membros da equipe de forma organizada.

#### Clonar o repositório (via SSH)

```bash
git clone git@github.com:seu-usuario/seu-repositorio.git
```

#### Versionar e enviar alterações

```bash
git add .
git commit -m "Adiciona uma documentação inicial"
git push
```

> Toda alteração na documentação deve ser commitada para garantir histórico completo de mudanças.

---

### 2. Publicação no GitHub Pages

O GitHub Pages hospeda sites estáticos diretamente a partir de um repositório GitHub, de forma gratuita.

#### Pré-requisitos

- Repositório **público** no GitHub, ou permissão de GitHub Pages ativa
- Branch `gh-pages` configurado como fonte de publicação (Settings → Pages → Deploy from a branch → `gh-pages` → `/ (root)`)

#### Passos para publicação

**1. Gerar o build da documentação**

```bash
mkdocs build
# Gera a pasta site/ com todos os arquivos HTML estáticos
```

**2. Fazer o deploy direto no GitHub Pages**

```bash
mkdocs gh-deploy
# Faz o build e envia os arquivos para o branch gh-pages automaticamente
```

**3. Acessar a documentação publicada**

```
https://seu-usuario.github.io/seu-repositorio/
```

---

### 3. Deploy Contínuo com GitHub Actions

Automatize o processo de publicação criando um workflow no GitHub Actions. A cada `push` na branch `main`, a documentação é reconstruída e publicada automaticamente.

#### Estrutura do arquivo de workflow

```
.github/
└── workflows/
    └── deploy.yml
```

#### Exemplo de `deploy.yml`

```yaml
name: Deploy MkDocs

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - run: pip install mkdocs mkdocs-material
      - run: mkdocs gh-deploy --force
```

#### Benefícios do Deploy Contínuo

| Benefício | Descrição |
|-----------|-----------|
| Eliminação de comandos manuais | Não é necessário rodar `mkdocs build` ou `gh-deploy` manualmente |
| Consistência | Toda alteração no `main` resulta em documentação atualizada |
| Redução de erros | O processo automatizado evita esquecimentos e falhas operacionais |
| Extensibilidade | Permite adicionar validações (lint, testes) antes do deploy |

---

### 4. Boas Práticas de Manutenção

| Prática | Descrição |
|---------|-----------|
| **Commits frequentes** | Commite sempre que houver alterações significativas na documentação |
| **Revisão colaborativa** | Use pull requests para revisar mudanças antes de integrá-las |
| **Deploy contínuo** | Configure GitHub Actions para publicar automaticamente a cada push |
| **Organização de versões** | Use o plugin `mkdocs-versioning` para manter documentação de múltiplas versões |

---

## Lista de Exercícios de Fixação

1. **Exercício 1:** Explique a importância de utilizar sistemas de controle de versão, como Git, no gerenciamento de documentação técnica.
2. **Exercício 2:** Crie um repositório Git para seu projeto MKDocs e faça o commit e push da documentação inicial.
3. **Exercício 3:** Realize o deploy da sua documentação no GitHub Pages utilizando o comando `mkdocs gh-deploy`. Após a publicação, acesse o link gerado e verifique se a documentação está acessível.
4. **Exercício 4:** Configure um sistema de deploy contínuo utilizando GitHub Actions. Teste se a documentação é atualizada automaticamente ao fazer mudanças no repositório.
5. **Exercício 5:** Pesquise como organizar múltiplas versões da documentação com MKDocs e implemente uma solução que permita ao usuário alternar entre versões.

---

## Checklist do Módulo

- [ ] Repositório criado no GitHub
- [ ] Projeto MKDocs clonado localmente via SSH
- [ ] Primeiras alterações versionadas com `git add`, `git commit` e `git push`
- [ ] GitHub Pages configurado no repositório (branch `gh-pages`)
- [ ] Build gerado com `mkdocs build`
- [ ] Deploy realizado com `mkdocs gh-deploy`
- [ ] Documentação acessível via URL pública do GitHub Pages
- [ ] Arquivo `.github/workflows/deploy.yml` criado
- [ ] Deploy contínuo testado com push na branch `main`

---

## Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 02 | Visão Geral sobre MKDocs |
| 03 | Criação de Documentação com MKDocs |
| **04** | **Versionamento e Deploy da Documentação** |
| 05 | Práticas de Escrita Técnica |
| 06 | Documentação Automatizada e API Docs |
| 07 | Estudos de Caso e Aplicações Práticas |