# Módulo 05 — Práticas de Escrita Técnica
> **Trilha de Documentação | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

## Sobre este Módulo

Este módulo aborda as principais técnicas de **escrita técnica** aplicadas à documentação de software. O objetivo é desenvolver a habilidade de transmitir informações complexas de forma simples, objetiva e bem organizada, garantindo que usuários e desenvolvedores compreendam corretamente as funcionalidades e procedimentos de um sistema.

---

## Objetivo do Módulo

Aplicar boas práticas de escrita técnica na criação de documentações claras e eficazes, contemplando:

- Princípios de **escrita concisa e clara**
- **Organização e formatação** de tópicos e seções
- Uso correto de **listas, tabelas, negrito e itálico**
- Representação de processos por meio de **fluxos de trabalho**

---

## Conteúdo do Módulo

### 1. Escrita Concisa e Clara

A clareza é a principal diretriz da escrita técnica. A documentação deve ser compreendida pelo público-alvo sem ambiguidades, transmitindo o máximo de informação com o menor número de palavras possível.

#### Dicas para Escrita Concisa e Clara

| Diretriz | Descrição |
|----------|-----------|
| **Evite jargões complexos** | Use termos técnicos apenas quando necessário; explique os mais difíceis |
| **Frases curtas e diretas** | Sentenças longas com muitas vírgulas dificultam a leitura |
| **Voz ativa** | Prefira instruções diretas ao invés da voz passiva |
| **Estrutura lógica** | Comece com conceitos simples e aumente gradualmente a complexidade |
| **Simplificação** | Não explique o que o público-alvo já sabe |

#### Exemplo — Voz Passiva vs. Voz Ativa

| Estilo | Exemplo |
|--------|---------|
| ❌ Voz passiva | "O código deve ser compilado pelo desenvolvedor." |
| ✅ Voz ativa | "Compile o código." |

#### Exemplo — Texto Longo vs. Texto Conciso

**Antes:**
> "O usuário deverá acessar a interface do sistema, onde ele precisará clicar no botão de adicionar novo item, que estará localizado no canto superior direito da tela."

**Depois:**
> "Na interface, clique no botão 'Adicionar' no canto superior direito."

---

### 2. Organização e Formatação de Tópicos e Seções

Uma documentação bem organizada permite que o leitor encontre rapidamente o que precisa.

#### Elementos de Formatação

| Elemento | Quando usar |
|----------|-------------|
| **Títulos e subtítulos** | Para introduzir tópicos principais e seções menores, criando hierarquia visual |
| **Listas ordenadas** | Para passos que devem ser seguidos em uma sequência específica |
| **Listas não ordenadas** | Para itens sem ordem de prioridade |
| **Parágrafos curtos** | Cada parágrafo deve abordar um único conceito ou ideia |
| **Tabelas** | Para organizar informações mais facilmente compreendidas em grade |
| **Negrito** | Para destacar termos importantes |
| **Itálico** | Para notas ou explicações secundárias |

#### Exemplo — Lista de Passos (Ordenada)

**Configuração do Ambiente**

**Passo 1: Instalação do Python**

1. Baixe o instalador no site oficial [python.org](https://www.python.org/downloads/).
2. Execute o instalador e siga os passos de instalação.

**Passo 2: Instalação do MKDocs**

- Abra o terminal.
- Execute o comando:

```bash
pip install mkdocs
```

---

### 3. Fluxos de Trabalho

Um fluxograma ou uma descrição passo a passo de como um processo deve ser executado ajuda a entender procedimentos complexos. Use sempre que o processo envolver decisões, ramificações ou sequências críticas.

**Exemplo de fluxo — Processo de Login:**

```
Início
  │
  ▼
Usuário insere credenciais
  │
  ▼
Sistema verifica login e senha
  │
  ├── Correto ──► Acesso liberado ──► Fim
  │
  └── Incorreto ──► Exibe mensagem de erro ──► Retorna ao início
```

---

## Lista de Exercícios de Fixação

1. **Exercício 1:** Escreva uma descrição clara e concisa sobre o processo de instalação de um software de sua escolha, evitando frases longas e jargões desnecessários.
2. **Exercício 2:** Reescreva o parágrafo abaixo de forma mais objetiva e direta:
   > "O sistema permite que os usuários façam upload de arquivos, que serão armazenados no servidor para que, posteriormente, os administradores possam acessá-los."
3. **Exercício 3:** Organize a seguinte lista de instruções usando títulos, subtítulos e listas ordenadas:
   - Instalar o Node.js
   - Configurar o ambiente com variáveis de ambiente
   - Testar a instalação com um comando no terminal
   - Criar um novo projeto utilizando `npm init`
4. **Exercício 4:** Crie um exemplo de código que ilustre uma função simples (em qualquer linguagem) e inclua-o em uma explicação sobre como essa função pode ser utilizada.
5. **Exercício 5:** Crie um diagrama de fluxo que represente o processo de login em um sistema (entrada de dados, verificação, sucesso/erro).

---

## Checklist do Módulo

- [ ] Exemplos de voz ativa e passiva identificados e reescritos
- [ ] Texto longo reescrito de forma concisa
- [ ] Documentação organizada com títulos, subtítulos e listas
- [ ] Tabela criada para organizar informações comparativas
- [ ] Bloco de código incluído com explicação contextual
- [ ] Fluxograma ou descrição de fluxo de trabalho elaborado
- [ ] Exercícios de fixação concluídos

---

## Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 02 | Visão Geral sobre MKDocs |
| 03 | Criação de Documentação com MKDocs |
| 04 | Versionamento e Deploy da Documentação |
| **05** | **Práticas de Escrita Técnica** |
| 06 | Documentação Automatizada e API Docs |
| 07 | Estudos de Caso e Aplicações Práticas |
