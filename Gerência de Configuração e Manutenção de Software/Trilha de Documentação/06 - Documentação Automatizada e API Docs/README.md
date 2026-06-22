# Módulo 06 — Documentação Automatizada e API Docs
> **Trilha de Documentação | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

## Sobre este Módulo

Este módulo apresenta a **documentação automatizada** como prática que simplifica a criação e manutenção de documentação técnica, gerando conteúdo diretamente a partir do código-fonte. O foco principal é a documentação de APIs com **Swagger/OpenAPI** integrada ao MKDocs, proporcionando uma interface interativa e sempre atualizada.

---

## Objetivo do Módulo

Gerar e integrar documentação automatizada de APIs ao MKDocs, contemplando:

- Conceitos e vantagens da **documentação automatizada**
- Principais **ferramentas** do mercado
- Integração do MKDocs com **Swagger/OpenAPI**
- Criação de uma **interface interativa** de documentação de API

---

## Conteúdo do Módulo

### 1. Documentação Automatizada

A documentação automatizada gera conteúdo a partir de comentários no código ou de ferramentas que interpretam o código-fonte, eliminando a necessidade de escrever toda a documentação manualmente e reduzindo o risco de desatualizações.

#### Vantagens

| Vantagem | Descrição |
|----------|-----------|
| **Redução de erros** | A documentação reflete com precisão o código atual |
| **Economia de tempo** | Desenvolvedores gastam menos tempo escrevendo documentação manual |
| **Manutenção simplificada** | A documentação é atualizada junto com o código, garantindo consistência |

---

### 2. Ferramentas Comuns

| Ferramenta | Linguagem / Uso |
|------------|-----------------|
| **Sphinx** | Python — gera documentação a partir de docstrings |
| **Javadoc** | Java — baseado em comentários no código-fonte |
| **Doxygen** | C++, C, Java — gera documentação de múltiplas linguagens |
| **Swagger/OpenAPI** | APIs RESTful — gera interfaces interativas a partir da especificação da API |

---

### 3. Integração MKDocs + Swagger/OpenAPI

#### Estrutura de Pastas

```
meu-projeto/
├── mkdocs.yml
└── docs/
    ├── index.md
    └── api/
        ├── openapi.yaml
        └── swagger-ui/
            ├── index.html
            ├── swagger-ui-bundle.js
            ├── swagger-ui-standalone-preset.js
            └── swagger-ui.css
```

> ✅ Tudo fica dentro de `docs/` para o MKDocs publicar junto.

---

#### Passo 1 — Criar a Especificação OpenAPI

Crie o arquivo `docs/api/openapi.yaml`:

```yaml
openapi: 3.0.0
info:
  title: API de Exemplo
  description: Exemplo de API para documentação automatizada
  version: 1.0.0
paths:
  /produtos:
    get:
      tags:
        - Produtos
      summary: Lista todos os produtos
      responses:
        '200':
          description: Lista retornada com sucesso
          content:
            application/json:
              example:
                - id: 1
                  nome: "Xbox Series X"
                  preco: 300
                - id: 2
                  nome: "Playstation 5 Pro"
                  preco: 400
```

---

#### Passo 2 — Adicionar o Swagger UI (Arquivos Estáticos)

1. Baixe o [Swagger UI](https://github.com/swagger-api/swagger-ui/releases)
2. Acesse a pasta `swagger-ui-master/dist/`
3. Copie os três arquivos mínimos necessários para `docs/api/swagger-ui/`:
   - `swagger-ui.css`
   - `swagger-ui-bundle.js`
   - `swagger-ui-standalone-preset.js`
4. Implemente o arquivo `docs/api/swagger-ui/index.html` conforme referência do material

---

#### Passo 3 — Configurar o `mkdocs.yml`

```yaml
nav:
  - Home: index.md
  - Introdução: introducao/inicio.md
  - Guia do Usuário: guia-do-usuario/configuracao.md
  - API:
      - Swagger UI: api/swagger-ui/index.html
      - OpenAPI (YAML): api/openapi.yaml
```

---

#### Passo 4 — Build e Deploy

```bash
mkdocs build   # Constrói o site estático
mkdocs serve   # Inicia o servidor local para visualização
```

---

## Lista de Exercícios de Fixação

1. **Exercício 1:** Explique as vantagens da documentação automatizada de código e como ela pode beneficiar uma equipe de desenvolvimento.
2. **Exercício 2:** Crie um pequeno projeto que utilize o MKDocs integrado ao Swagger para documentar uma API de um sistema fictício de gerenciamento de usuários.
3. **Exercício 3:** Usando a especificação OpenAPI, documente uma API com pelo menos três endpoints: um para listar, um para criar e um para atualizar recursos. Gere e visualize a documentação com o MKDocs.
4. **Exercício 4:** Pesquise sobre outra ferramenta de documentação automatizada (como Doxygen ou Sphinx) e explique como ela pode ser integrada ao MKDocs.
5. **Exercício 5:** Modifique o exemplo da API de produtos adicionando um endpoint para excluir um produto e atualize a documentação automaticamente com o Swagger.

---

## Checklist do Módulo

- [ ] Estrutura de pastas `docs/api/` criada corretamente
- [ ] Arquivo `openapi.yaml` criado com pelo menos um endpoint documentado
- [ ] Arquivos do Swagger UI copiados para `docs/api/swagger-ui/`
- [ ] Arquivo `index.html` do Swagger UI implementado
- [ ] Navegação no `mkdocs.yml` atualizada com seção `API`
- [ ] Interface Swagger visualizada localmente com `mkdocs serve`
- [ ] Build gerado com `mkdocs build`
- [ ] Pelo menos três endpoints documentados no `openapi.yaml`
- [ ] Exemplos de requisição e resposta incluídos na especificação

---

## Nota Importante

> Documentar APIs corretamente é fundamental para garantir que desenvolvedores externos e internos consigam interagir com o sistema de forma eficiente. Exemplos práticos de requisição e resposta ajudam os usuários a entenderem como consumir a API.

---

## Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 02 | Visão Geral sobre MKDocs |
| 03 | Criação de Documentação com MKDocs |
| 04 | Versionamento e Deploy da Documentação |
| 05 | Práticas de Escrita Técnica |
| **06** | **Documentação Automatizada e API Docs** |
| 07 | Estudos de Caso e Aplicações Práticas |
