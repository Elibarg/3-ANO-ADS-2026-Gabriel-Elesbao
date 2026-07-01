#  Módulo 05 — Templating e Interface com Servidor
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo capacita os alunos a **renderizar páginas dinâmicas** utilizando dados provenientes do MySQL, com foco em organização de layouts e integração eficiente entre front-end e back-end através de **Server-Side Rendering (SSR)** e **templating engines**.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Compreender o conceito de **Server-Side Rendering (SSR)**
- Utilizar **templating engines** como EJS e Pug
- Configurar templates dinâmicos com **EJS no Express**
- Renderizar dados do **MySQL em páginas HTML**
- Criar **partials e layouts reutilizáveis**
- Processar **formulários** e enviar dados ao banco de dados

---

##  5.1 — Server-Side Rendering (SSR)

### O que é SSR?

SSR é uma técnica em que o HTML é **gerado no servidor** e enviado pronto ao navegador — ao contrário do CSR (Client-Side Rendering), onde o navegador monta a página com JavaScript.

### SSR vs CSR

| Aspecto | SSR | CSR |
|---------|-----|-----|
| Renderização | No servidor | No navegador |
| SEO | ✅ Excelente | ⚠️ Limitado |
| Carregamento inicial | ✅ Mais rápido | ⏳ Mais lento |
| Carga no cliente | ✅ Menor | ❌ Maior |
| Interatividade dinâmica | ⚠️ Requer hidratação | ✅ Nativa |

### Como funciona o SSR?

```
1. Navegador faz requisição HTTP ao servidor
2. Servidor processa e gera o HTML dinâmico
3. HTML completo é enviado ao cliente
4. Navegador exibe a página imediatamente
5. (Opcional) JavaScript hidrata a página para interatividade
```

### Quando usar SSR?

- Sites orientados a conteúdo: blogs, portais de notícias, e-commerce
- Quando **SEO é crucial** para o negócio
- Dispositivos com hardware limitado
- Páginas que precisam de carregamento inicial rápido

---

##  5.2 — Templating Engines: EJS e Pug

### O que são?

Templating engines são ferramentas que permitem criar **páginas HTML dinâmicas** no servidor, injetando dados em tempo real e organizando layouts reutilizáveis.

### EJS (Embedded JavaScript)

- Sintaxe similar ao HTML tradicional
- `<%= %>` → saída de variáveis
- `<% %>` → execução de código JavaScript

```html
<!-- views/index.ejs -->
<h1>Olá, <%= nome %>!</h1>

<ul>
  <% usuarios.forEach(u => { %>
    <li><%= u.nome %> — <%= u.email %></li>
  <% }) %>
</ul>
```

### Pug

- Sintaxe minimalista baseada em **indentação**
- Sem tags de fechamento
- Focado em simplicidade e organização

```pug
h1 Olá, #{nome}!

ul
  each u in usuarios
    li #{u.nome} — #{u.email}
```

### Comparativo

| Aspecto | EJS | Pug |
|---------|-----|-----|
| Sintaxe | Similar ao HTML | Baseada em indentação |
| Curva de aprendizado | Baixa | Média |
| Legibilidade | Alta para quem conhece HTML | Alta para projetos limpos |
| Popularidade | Alta | Média |

---

##  5.3 — Configurando o EJS no Express

### Instalação

```bash
npm install ejs express-ejs-layouts
```

### Configuração (`server.js`)

```js
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Define EJS como motor de templates
app.set('view engine', 'ejs');

// Define a pasta onde ficam os arquivos .ejs
app.set('views', './views');

// Ativa layouts reutilizáveis
app.use(expressLayouts);

// Define o layout principal da aplicação
app.set('layout', 'layout');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

> O servidor passa a usar EJS para montar páginas HTML, busca os arquivos na pasta `views` e aplica um layout padrão para todas as páginas.

### Estrutura do Projeto

```
meu-projeto/
├── server.js
├── routes/
│   ├── pages.js
│   └── usuarios.js
└── views/
    ├── layout.ejs       → layout principal
    ├── index.ejs        → página inicial
    ├── usuarios.ejs     → listagem de usuários
    └── partials/
        ├── header.ejs
        └── footer.ejs
```

### Template Simples (`views/index.ejs`)

```html
<h1>Bem-vindo, <%= titulo %>!</h1>
<p>Esta página foi gerada no servidor.</p>
```

### Rota que renderiza o template (`routes/pages.js`)

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { titulo: 'UniSENAI Node.js' });
});

module.exports = router;
```

---

##  5.4 — Renderizando Dados do MySQL em Páginas Dinâmicas

### Rota com consulta ao banco (`routes/usuarios.js`)

```js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/usuarios', async (req, res) => {
  try {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios');
    res.render('usuarios', { usuarios });
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários: ' + err.message);
  }
});

module.exports = router;
```

### Template de listagem (`views/usuarios.ejs`)

```html
<h1>Lista de Usuários</h1>

<% if (usuarios.length === 0) { %>
  <p>Nenhum usuário cadastrado.</p>
<% } else { %>
  <ul>
    <% usuarios.forEach(u => { %>
      <li><strong><%= u.nome %></strong> — <%= u.email %></li>
    <% }) %>
  </ul>
<% } %>
```

---

##  5.5 — Partials e Layouts Reutilizáveis

### O que são Partials?

Partials são **arquivos reutilizáveis** que contêm partes comuns de um layout, como cabeçalho, rodapé e menus de navegação — eliminando repetição de código entre páginas.

### Criando um Partial (`views/partials/header.ejs`)

```html
<header>
  <nav>
    <a href="/">Início</a>
    <a href="/usuarios">Usuários</a>
  </nav>
</header>
```

### Incluindo Partials em um Template

```html
<!-- views/layout.ejs -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Minha App Node.js</title>
</head>
<body>
  <%- include('partials/header') %>

  <main>
    <%- body %>  <!-- conteúdo de cada página é injetado aqui -->
  </main>

  <%- include('partials/footer') %>
</body>
</html>
```

---

##  5.6 — Formulários: Validação e Envio ao MySQL

### Configuração para Processar Formulários

```js
// Habilita leitura de dados de formulários HTML
app.use(express.urlencoded({ extended: true }));
```

### Template do Formulário (`views/novo-usuario.ejs`)

```html
<h1>Cadastrar Usuário</h1>

<form action="/usuarios" method="POST">
  <label>Nome:
    <input type="text" name="nome" required>
  </label>
  <label>Email:
    <input type="email" name="email" required>
  </label>
  <button type="submit">Cadastrar</button>
</form>
```

### Rota POST para Receber e Salvar os Dados

```js
router.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;

  // Validação básica
  if (!nome || !email) {
    return res.render('novo-usuario', { erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    await pool.execute(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    res.redirect('/usuarios');
  } catch (err) {
    res.render('novo-usuario', { erro: 'Erro ao cadastrar: ' + err.message });
  }
});
```

---

##  Checklist do Módulo

- [ ] Diferença entre SSR e CSR compreendida
- [ ] EJS instalado e configurado como view engine
- [ ] Pasta `views/` criada com template básico
- [ ] Layout principal com `<%- body %>` configurado
- [ ] Partials de header e footer criados e incluídos
- [ ] Rota GET renderizando template com dados estáticos
- [ ] Rota GET buscando dados do MySQL e enviando ao template
- [ ] Template EJS exibindo lista dinâmica com `forEach`
- [ ] Formulário HTML criado com método POST
- [ ] Rota POST recebendo, validando e inserindo dados no MySQL
- [ ] Redirecionamento após cadastro bem-sucedido

---

##  Exercícios do Módulo

### Teóricos
1. O que são templating engines e qual sua utilidade?
2. Explique as diferenças entre EJS e Pug.
3. Como configurar o EJS em um projeto Express?
4. O que são partials e como eles auxiliam na reutilização de código?
5. Como os dados do MySQL podem ser renderizados em um template?
6. Explique as diferenças entre SSR e CSR e quando usar cada um.
7. Qual o impacto do SSR no SEO? Justifique com exemplos.
8. Quais são as boas práticas ao organizar templates em um projeto?
9. Por que é importante validar dados recebidos de formulários?
10. Explique o papel do `express.urlencoded` em aplicações Express.

### Práticos
- Configure o EJS em um projeto Express e crie um template básico.
- Implemente um template que liste usuários cadastrados em um banco MySQL.
- Crie um layout com cabeçalho e rodapé utilizando partials.
- Desenvolva um formulário para cadastrar novos usuários no banco.
- Configure uma rota POST que receba os dados do formulário e insira no MySQL.
- Crie um template que exiba mensagens de erro ao processar dados inválidos.
- Implemente um sistema de navegação entre páginas usando layouts reutilizáveis.
- Adicione uma rota `/about` com SSR que exiba informações fictícias sobre o site.
- Integre dados do MySQL em um menu dinâmico renderizado via EJS.
- Valide os campos do formulário e exiba mensagens de erro quando necessário.

---

##  Aplicabilidade

**Sites com SSR:**
- Blogs, portais de notícias e e-commerce com foco em SEO
- Dashboards administrativos com dados dinâmicos do banco

**Sistemas Web Completos:**
- Formulários de cadastro integrados ao MySQL
- Páginas de listagem, detalhe e edição de registros

**Organização de Projetos:**
- Layouts reutilizáveis eliminam repetição de código
- Partials facilitam manutenção de cabeçalhos, rodapés e menus

---

> **Resumo:** O Módulo 05 conecta o backend Node.js ao mundo visível do navegador. Com SSR e EJS, o aluno aprende a gerar páginas HTML dinâmicas a partir de dados reais do MySQL, organizar a estrutura visual com layouts e partials, e processar formulários com validação e persistência no banco — habilidades essenciais para qualquer sistema web completo.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Node.js |
| 02 | Fundamentos |
| 03 | Integração com MySQL |
| 04 | Desenvolvimento Web |
| **05** | **Templating e Interface com Servidor** |
| 06 | Autenticação e Segurança |
| 07 | Aplicações Avançadas |
| 08 | APIs RESTful e MySQL |
| 09 | Projeto Final |
