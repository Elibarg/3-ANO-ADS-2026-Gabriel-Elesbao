# Módulo 03 — Criação de Documentação com MKDocs
> **Trilha de Documentação | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

## Sobre este Módulo

Este módulo aprofunda o uso prático do MKDocs, cobrindo a configuração completa do arquivo `mkdocs.yml`, o gerenciamento de temas e personalização visual, e o uso de plugins para estender as funcionalidades da documentação. O foco é construir projetos de documentação bem estruturados e visualmente agradáveis.

---

## Objetivo do Módulo

Criar e configurar projetos de documentação completos com o MKDocs, contemplando:

- Configuração avançada do arquivo **`mkdocs.yml`**
- Gerenciamento e personalização de **temas**
- Instalação e uso de **plugins**
- Organização de **estrutura de diretórios** personalizada

---

## Conteúdo do Módulo

### 1. O Arquivo `mkdocs.yml`

O `mkdocs.yml` é o coração do projeto MKDocs. Nele são definidas todas as configurações principais do site.

#### Exemplo de configuração completa

```yaml
site_name: 'Minha Documentação'
site_description: 'Documentação detalhada sobre o projeto'

nav:
  - Home: index.md
  - Introdução: introducao/inicio.md
  - Guia do Usuário: guia-do-usuario/configuracao.md
```

| Campo | Descrição |
|-------|-----------|
| `site_name` | Define o nome do site de documentação |
| `site_description` | Texto descritivo do projeto |
| `theme` | Escolhe e configura o tema visual |
| `nav` | Controla a barra de navegação e a estrutura de páginas |

---

### 2. Gerenciamento de Temas e Personalização Visual

O MKDocs suporta vários temas. O mais popular é o **Material for MkDocs**, que oferece interface moderna e altamente configurável.

#### Instalar o tema Material

```bash
pip install mkdocs-material
```

#### Configurar o tema no `mkdocs.yml`

```yaml
theme:
  name: 'material'
  palette:
    primary: 'blue'
    accent: 'pink'
```

#### Exemplo com paleta personalizada

```yaml
theme:
  name: 'material'
  palette:
    primary: 'indigo'
    accent: 'orange'
```

> Cores disponíveis: `red`, `pink`, `purple`, `indigo`, `blue`, `cyan`, `teal`, `green`, `lime`, `yellow`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`.

---

### 3. Plugins — Estendendo Funcionalidades

O MKDocs pode ser estendido com plugins instalados via `pip` e registrados no `mkdocs.yml`.

#### Instalação de plugin (exemplo: SEO)

```bash
pip install mkdocs-meta-descriptions-plugin
```

#### Configuração no `mkdocs.yml`

```yaml
plugins:
  - search
  - meta-descriptions
```

#### Plugins Úteis

| Plugin | Descrição |
|--------|-----------|
| `search` | Busca interna na documentação (padrão) |
| `meta-descriptions` | Otimização para motores de busca (SEO) |
| `tags` | Suporte a tags para organização flexível do conteúdo |
| `mkdocs-versioning` | Gerenciamento de múltiplas versões da documentação |

---

### 4. Estrutura de Diretórios Personalizada

Para projetos maiores, é recomendado organizar a documentação em subdiretórios dentro de `docs/`.

```
meu-projeto/
├── mkdocs.yml
└── docs/
    ├── index.md
    ├── introducao/
    │   └── inicio.md
    └── guia-do-usuario/
        ├── instalacao.md
        └── configuracao.md
```

#### Navegação correspondente no `mkdocs.yml`

```yaml
nav:
  - Home: index.md
  - Introdução: introducao/inicio.md
  - Guia do Usuário:
      - Instalação: guia-do-usuario/instalacao.md
      - Configuração: guia-do-usuario/configuracao.md
```

---

## Lista de Exercícios de Fixação

1. **Exercício 1:** Descreva a estrutura de diretórios padrão de um projeto MKDocs e explique o propósito de cada diretório e arquivo.
2. **Exercício 2:** Crie um projeto MKDocs e adicione uma nova página `sobre.md` no diretório `docs/`. Configure a navegação no `mkdocs.yml` para incluir essa página.
3. **Exercício 3:** Personalize a paleta de cores do tema `Material` no MKDocs, modificando as cores primária e de destaque. Teste a visualização localmente.
4. **Exercício 4:** Instale e configure o plugin de SEO no MKDocs. Explique como ele pode ajudar na otimização para motores de busca.
5. **Exercício 5:** Pesquise outros plugins disponíveis para o MKDocs e escolha um para instalar. Escreva um exemplo de como esse plugin pode melhorar sua documentação.

---

## Checklist do Módulo

- [ ] `mkdocs.yml` configurado com `site_name`, `site_description` e `nav`
- [ ] Tema `material` instalado e configurado
- [ ] Paleta de cores personalizada aplicada
- [ ] Plugin de busca (`search`) ativo
- [ ] Pelo menos um plugin adicional instalado e configurado
- [ ] Estrutura de subdiretórios criada dentro de `docs/`
- [ ] Navegação no `mkdocs.yml` refletindo a estrutura de diretórios
- [ ] Documentação visualizada localmente com `mkdocs serve`

---

## Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 02 | Visão Geral sobre MKDocs |
| **03** | **Criação de Documentação com MKDocs** |
| 04 | Versionamento e Deploy da Documentação |
| 05 | Práticas de Escrita Técnica |
| 06 | Documentação Automatizada e API Docs |
| 07 | Estudos de Caso e Aplicações Práticas |