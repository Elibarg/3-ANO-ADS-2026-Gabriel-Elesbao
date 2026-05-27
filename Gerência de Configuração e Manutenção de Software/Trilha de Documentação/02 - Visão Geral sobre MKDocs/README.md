# Módulo 02 — Visão Geral sobre MKDocs
> **Trilha de Documentação | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

## Sobre este Módulo

Este módulo apresenta o **MKDocs**, uma ferramenta estática de geração de documentação escrita em Markdown. O objetivo é familiarizar o estudante com os conceitos fundamentais da ferramenta, sua instalação, configuração inicial e o uso do Markdown para criação de conteúdo técnico organizado e acessível.

---

## Objetivo do Módulo

Compreender o que é o MKDocs e como utilizá-lo para criar sites de documentação técnica, abordando:

- O que é o MKDocs e suas **principais características**
- **Instalação** e configuração do ambiente
- Criação e execução de um **projeto inicial**
- Uso do **Markdown** para criação de conteúdo

---

## Conteúdo do Módulo

### 1. O que é o MKDocs?

O MKDocs é uma ferramenta que transforma arquivos Markdown em sites de documentação completos e estilizados, sem exigir conhecimento avançado de HTML ou CSS.

**Principais Características:**

| Característica | Descrição |
|----------------|-----------|
| Formato de entrada | Arquivos Markdown (`.md`) |
| Saída gerada | Sites de documentação estática |
| Configuração | Simples via arquivo `mkdocs.yml` |
| Temas | Suporte a temas predefinidos e personalizáveis |
| Servidor local | Visualização em tempo real durante o desenvolvimento |

---

### 2. Instalação e Configuração

#### Passo 1: Verificar o Python

```bash
python --version
# Resultado esperado: Python 3.13.3
```

#### Passo 2: Instalar o MKDocs via pip

```bash
pip install mkdocs
```

#### Passo 3: Criar um novo projeto

```bash
mkdocs new meu-projeto
cd meu-projeto
```

#### Estrutura gerada

```
meu-projeto/
    mkdocs.yml    # Arquivo de configuração do MKDocs
    docs/
        index.md  # Documento principal em Markdown
```

#### Passo 4: Executar o servidor local

```bash
mkdocs serve
```

> Acesse `http://127.0.0.1:8000/` para visualizar a documentação em tempo real.

---

### 3. Configuração Básica — `mkdocs.yml`

```yaml
site_name: 'Minha Documentação'
site_description: 'Documentação detalhada sobre o projeto'

theme:
  name: 'material'
```

| Campo | Descrição |
|-------|-----------|
| `site_name` | Nome do site de documentação |
| `site_description` | Descrição exibida nos metadados |
| `theme.name` | Tema visual aplicado ao site |

---

### 4. Markdown — Elementos Essenciais

#### Títulos

```markdown
# Título de Nível 1
## Título de Nível 2
### Título de Nível 3
```

#### Listas

```markdown
# Lista não ordenada
- Item 1
- Item 2

# Lista ordenada
1. Primeiro item
2. Segundo item
```

#### Links e Imagens

```markdown
[Google](https://www.google.com)
![Texto alternativo](caminho/para/imagem.png)
```

#### Código

```markdown
# Código em linha
Use o comando `npm install` para instalar dependências.

# Bloco de código
```python
print("Hello, World!")
```
```

---

## Lista de Exercícios de Fixação

1. **Exercício 1:** Explique o que é o MKDocs e quais são suas principais vantagens em relação a outras ferramentas de documentação.
2. **Exercício 2:** Instale o MKDocs em sua máquina e crie um novo projeto com o nome "Documentação do Meu Projeto". Configure o nome do site e o tema `material`.
3. **Exercício 3:** Escreva um exemplo simples de documentação usando Markdown que inclua um título, uma lista ordenada e um bloco de código. Visualize localmente usando o servidor do MKDocs.
4. **Exercício 4:** Modifique o `mkdocs.yml` para alterar o nome do site e adicione uma seção de navegação personalizada com pelo menos duas páginas (`index.md` e uma nova página de conteúdo).
5. **Exercício 5:** Explique como o Markdown facilita a criação de conteúdo em projetos de documentação e liste pelo menos três vantagens de usá-lo.

---

## Checklist do Módulo

- [ ] Python instalado e verificado
- [ ] MKDocs instalado via `pip install mkdocs`
- [ ] Projeto criado com `mkdocs new`
- [ ] Estrutura de diretórios compreendida (`mkdocs.yml` + `docs/`)
- [ ] Servidor local executado com `mkdocs serve`
- [ ] Arquivo `mkdocs.yml` configurado com nome e tema
- [ ] Conteúdo criado em Markdown com títulos, listas e código
- [ ] Navegação personalizada configurada no `mkdocs.yml`

---

## Módulos da Trilha

| Módulo | Tema |
|--------|------|
| **02** | **Visão Geral sobre MKDocs** |
| 03 | Criação de Documentação com MKDocs |
| 04 | Versionamento e Deploy da Documentação |
| 05 | Práticas de Escrita Técnica |
| 06 | Documentação Automatizada e API Docs |
| 07 | Estudos de Caso e Aplicações Práticas |