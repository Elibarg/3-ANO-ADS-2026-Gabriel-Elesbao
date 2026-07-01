#  Módulo 03 — Integração com MySQL
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo ensina como **integrar aplicações Node.js com o banco de dados MySQL**, realizando operações CRUD (Create, Read, Update, Delete) de forma assíncrona, segura e organizada, seguindo boas práticas adotadas no mercado.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Configurar o ambiente Node.js + MySQL
- Conectar aplicações Node.js ao MySQL
- Executar consultas SQL de forma assíncrona
- Implementar operações CRUD completas
- Proteger a aplicação contra **SQL Injection**
- Utilizar **pool de conexões**
- Organizar o código em módulos reutilizáveis

---

##  3.1 — Configuração do Ambiente

### Requisitos

| Requisito | Descrição |
|-----------|-----------|
| **Node.js** | Versão LTS instalada |
| **MySQL Server** | Configurado e em execução |
| **Editor** | Visual Studio Code (recomendado) |
| **MySQL Workbench** | Opcional, mas recomendado para visualização |

### Configuração do MySQL

1. Baixe o **MySQL Community Server**
2. Configure usuário, senha e porta padrão (`3306`)
3. Crie um schema para o projeto:

```sql
CREATE DATABASE meu_projeto;
USE meu_projeto;
```

### Inicialização do Projeto Node.js

```bash
mkdir meu-projeto && cd meu-projeto
npm init -y
npm install mysql2 dotenv
```

> **Por que `mysql2`?**
> - Suporte nativo a Promises
> - Melhor performance que o pacote `mysql`
> - Compatível com `async/await`

---

##  3.2 — Conectando ao MySQL

### Variáveis de Ambiente (`.env`)

Nunca exponha credenciais diretamente no código. Use um arquivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=meu_projeto
DB_PORT=3306
```

### Conexão Básica

```js
// conexao.js
require('dotenv').config();
const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err.message);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = conexao;
```

```bash
node conexao.js
# Conectado ao MySQL com sucesso!
```

---

##  3.3 — Executando Consultas

### SELECT com Async/Await

Use `mysql2/promise` para aproveitar `async/await`:

```js
const mysql = require('mysql2/promise');
require('dotenv').config();

async function listarUsuarios() {
  const conexao = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const [rows] = await conexao.execute('SELECT * FROM usuarios');
  console.log(rows);
  await conexao.end();
}

listarUsuarios();
```

### Tratamento de Erros

```js
try {
  const [rows] = await conexao.execute('SELECT * FROM usuarios');
  console.log(rows);
} catch (err) {
  console.error('Erro na consulta:', err.message);
}
```

---

##  3.4 — Operações CRUD

### Create — Inserir Dados

```js
async function criarUsuario(nome, email) {
  const [result] = await conexao.execute(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email]
  );
  console.log('Usuário inserido. ID:', result.insertId);
}
```

### Read — Consultar Dados

```js
async function buscarUsuario(id) {
  const [rows] = await conexao.execute(
    'SELECT * FROM usuarios WHERE id = ?',
    [id]
  );
  console.log(rows[0]);
}
```

### Update — Atualizar Dados

```js
async function atualizarUsuario(id, novoEmail) {
  await conexao.execute(
    'UPDATE usuarios SET email = ? WHERE id = ?',
    [novoEmail, id]
  );
  console.log('Usuário atualizado!');
}
```

### Delete — Excluir Dados

```js
async function deletarUsuario(id) {
  await conexao.execute(
    'DELETE FROM usuarios WHERE id = ?',
    [id]
  );
  console.log('Usuário removido!');
}
```

### Proteção contra SQL Injection — Prepared Statements

Os exemplos acima já utilizam **prepared statements** com `?`. Nunca concatene valores diretamente na query:

```js
// ❌ Vulnerável a SQL Injection
conexao.execute(`SELECT * FROM usuarios WHERE nome = '${nome}'`);

// ✅ Seguro com prepared statement
conexao.execute('SELECT * FROM usuarios WHERE nome = ?', [nome]);
```

---

##  3.5 — Pool de Conexões e Boas Práticas

### Por que usar Pool?

O pool reutiliza conexões abertas em vez de criar uma nova a cada requisição, melhorando significativamente a **performance** em aplicações com múltiplos acessos simultâneos.

### Configurando o Pool

```js
// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

### Usando o Pool em Módulos

```js
// usuarios.js
const pool = require('./db');

async function listarUsuarios() {
  const [rows] = await pool.execute('SELECT * FROM usuarios');
  return rows;
}

module.exports = { listarUsuarios };
```

### Organização em Módulos

```
meu-projeto/
├── db.js           → configuração do pool
├── usuarios.js     → operações com a tabela usuarios
├── .env            → variáveis de ambiente
└── index.js        → ponto de entrada da aplicação
```

> **Logs e Monitoramento:** use pacotes como `winston` ou `pino` para registrar logs e configurar alertas para erros críticos.

---

##  Checklist do Módulo

- [ ] MySQL Server instalado e em execução
- [ ] Projeto Node.js iniciado com `npm init`
- [ ] Pacotes `mysql2` e `dotenv` instalados
- [ ] Arquivo `.env` criado com credenciais do banco
- [ ] Conexão básica testada com sucesso
- [ ] SELECT executado com `async/await`
- [ ] CRUD completo implementado (Create, Read, Update, Delete)
- [ ] Prepared statements utilizados em todas as queries
- [ ] Pool de conexões configurado em `db.js`
- [ ] Código organizado em módulos separados

---

##  Exercícios do Módulo

### Teóricos
1. Explique a diferença entre `mysql2` e `mysql2/promise`.
2. Quais as vantagens de usar variáveis de ambiente na conexão com o banco?
3. O que é um prepared statement e como ele ajuda na segurança?
4. Por que é recomendável usar conexões em pool em aplicações Node.js?
5. Descreva o papel do módulo `dotenv` em projetos Node.js.
6. Qual é a estrutura básica para um SELECT com `mysql2`?
7. Liste três boas práticas ao conectar Node.js com MySQL.
8. Explique o conceito de transações no MySQL e como implementá-lo em Node.js.
9. Quais erros podem ocorrer ao conectar ao MySQL e como tratá-los?
10. Por que é importante organizar o código em módulos ao trabalhar com bancos de dados?

---

##  Aplicabilidade

**Sistemas de Cadastro:**
- Inserção e consulta de usuários, produtos e registros

**APIs e Backends:**
- Comunicação entre servidor Node.js e banco de dados relacional
- Resposta a requisições com dados dinâmicos do MySQL

**Boas Práticas de Segurança:**
- Proteção contra SQL Injection com prepared statements
- Gerenciamento seguro de credenciais com variáveis de ambiente

---

> **Resumo:** O Módulo 03 conecta o mundo do Node.js ao banco de dados MySQL, ensinando desde a configuração do ambiente até a implementação segura de operações CRUD. Com o uso de `mysql2/promise`, pool de conexões e variáveis de ambiente, o aluno adquire as bases para construir aplicações backend robustas e seguras.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Node.js |
| 02 | Fundamentos |
| **03** | **Integração com MySQL** |
| 04 | Desenvolvimento Web |
| 05 | Templating e Interface com Servidor |
| 06 | Autenticação e Segurança |
| 07 | Aplicações Avançadas |
| 08 | APIs RESTful e MySQL |
| 09 | Projeto Final |
