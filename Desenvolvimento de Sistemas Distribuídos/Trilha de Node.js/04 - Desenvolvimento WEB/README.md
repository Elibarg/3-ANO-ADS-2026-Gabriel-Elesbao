#  Módulo 04 — Desenvolvimento Web com Node.js
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo capacita os alunos a desenvolver **aplicações backend robustas e organizadas** com Node.js, utilizando o framework **Express.js**, integrando banco de dados MySQL e aplicando boas práticas de arquitetura, segurança e manutenção. Também aborda a programação orientada a eventos com o **EventEmitter**.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Criar servidores web com **Express.js**
- Definir e organizar **rotas HTTP** (GET, POST, PUT, DELETE)
- Utilizar **middlewares** para logs, validações e autenticação
- Integrar Express.js com **MySQL** para operações CRUD
- Aplicar boas práticas de **segurança no backend**
- Utilizar o **EventEmitter** para programação orientada a eventos

---

##  4.1 — Introdução ao Express.js

Express.js é um **framework minimalista para Node.js** que simplifica a criação de servidores e APIs, oferecendo suporte nativo para middleware, roteamento e integração com bancos de dados.

### Instalação

```bash
npm install express
```

### Servidor Básico

```js
// index.js
const express = require('express');
const app = express();

app.use(express.json()); // habilita leitura de JSON no body

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando!');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

---

##  4.2 — Rotas HTTP

### Tipos de Rotas

| Método | Uso |
|--------|-----|
| **GET** | Buscar/listar dados |
| **POST** | Criar novo registro |
| **PUT** | Atualizar registro existente |
| **DELETE** | Remover registro |

### Exemplo Prático

```js
// GET — listar usuários
app.get('/usuarios', (req, res) => {
  res.json({ mensagem: 'Lista de usuários' });
});

// POST — criar usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  res.status(201).json({ mensagem: 'Usuário criado', nome, email });
});

// PUT — atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.json({ mensagem: `Usuário ${id} atualizado` });
});

// DELETE — excluir usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.json({ mensagem: `Usuário ${id} removido` });
});
```

---

##  4.3 — Middlewares

Middleware é uma **função intermediária** executada entre a requisição do cliente e a resposta do servidor. Ele verifica, prepara ou bloqueia uma requisição antes de chegar à lógica principal.

### Para que é usado?

- Registrar **logs** de requisições (quem acessou, quando e qual rota)
- **Validar dados** antes de processar uma ação
- Verificar **autenticação** e permissões (token válido, usuário logado)
- **Tratar erros** de forma centralizada
- **Padronizar respostas** da API

> Middlewares evitam repetição de código e mantêm a aplicação organizada, segura e fácil de manter.

### Tipos de Middleware

| Tipo | Descrição |
|------|-----------|
| **Global** | Aplica-se a todas as rotas (`app.use()`) |
| **Específico** | Aplica-se a rotas selecionadas |
| **Tratamento de erros** | Recebe 4 parâmetros: `(err, req, res, next)` |

### Exemplo Prático

```js
// Middleware global — log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // passa para o próximo middleware ou rota
});

// Middleware específico — validação
function validarNome(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' });
  }
  next();
}

app.post('/usuarios', validarNome, (req, res) => {
  res.status(201).json({ mensagem: 'Usuário criado!' });
});

// Middleware de tratamento de erros (sempre 4 parâmetros)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});
```

---

##  4.4 — Integração com MySQL

```js
// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

module.exports = pool;
```

### Consulta em Rota Express

```js
const pool = require('./db');

app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});
```

---

##  4.5 — CRUD Completo com MySQL

```js
// CREATE
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email]
  );
  res.status(201).json({ id: result.insertId, nome, email });
});

// READ
app.get('/usuarios/:id', async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE id = ?', [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(rows[0]);
});

// UPDATE
app.put('/usuarios/:id', async (req, res) => {
  const { nome } = req.body;
  await pool.execute(
    'UPDATE usuarios SET nome = ? WHERE id = ?', [nome, req.params.id]
  );
  res.json({ mensagem: 'Atualizado com sucesso!' });
});

// DELETE
app.delete('/usuarios/:id', async (req, res) => {
  await pool.execute(
    'DELETE FROM usuarios WHERE id = ?', [req.params.id]
  );
  res.json({ mensagem: 'Removido com sucesso!' });
});
```

---

##  4.6 — Segurança no Backend

| Prática | Descrição |
|---------|-----------|
| **Prepared Statements** | Previne SQL Injection com `?` nos parâmetros |
| **Variáveis de Ambiente** | Credenciais no `.env`, nunca no código |
| **Validação de Entrada** | Verificar dados recebidos antes de processar |

```js
// ❌ Vulnerável
const query = `SELECT * FROM usuarios WHERE nome = '${nome}'`;

// ✅ Seguro
const [rows] = await pool.execute(
  'SELECT * FROM usuarios WHERE nome = ?', [nome]
);
```

---

##  4.7 — Programação Orientada a Eventos (EventEmitter)

O **EventEmitter** é uma classe central do Node.js que permite criar sistemas baseados em eventos, onde objetos emitem eventos e outras partes do código reagem a eles (padrão publicação/assinatura).

### Importação

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

### Principais Métodos

| Método | Descrição | Quando usar |
|--------|-----------|-------------|
| `on(event, fn)` | Registra listener que executa sempre que o evento ocorre | Logs, notificações, métricas |
| `emit(event, ...args)` | Dispara um evento | Após pagamento aprovado, ação concluída |
| `once(event, fn)` | Listener executado apenas na primeira ocorrência | Inicialização, primeiro acesso |
| `off(event, fn)` | Remove um listener específico | Usuário desconectado, módulo finalizado |
| `removeAllListeners([event])` | Remove todos os listeners do evento | Reinicialização de módulo, encerramento de sessão |
| `listenerCount(event)` | Retorna quantidade de listeners registrados | Debug e monitoramento de memória |

### Exemplo Básico

```js
emitter.on('saudacao', (nome) => {
  console.log(`Olá, ${nome}!`);
});

emitter.emit('saudacao', 'Akira'); // Olá, Akira!
```

### Exemplo Prático — Sistema de Login

```js
const EventEmitter = require('events');
const loginEmitter = new EventEmitter();

loginEmitter.on('loginSucesso', (usuario) => {
  console.log(`[LOG] Login realizado: ${usuario}`);
});

loginEmitter.on('loginFalha', (usuario) => {
  console.warn(`[ALERTA] Falha de login: ${usuario}`);
});

// Simulação
loginEmitter.emit('loginSucesso', 'akira@email.com');
loginEmitter.emit('loginFalha', 'invasor@email.com');
```

### Exemplo Avançado — Chat em Tempo Real

```js
const sala = new EventEmitter();

sala.on('userJoined', (nome) => {
  console.log(`${nome} entrou na sala.`);
});

sala.on('message', ({ usuario, texto }) => {
  console.log(`${usuario}: ${texto}`);
});

sala.emit('userJoined', 'Akira');
sala.emit('message', { usuario: 'Akira', texto: 'Oi, pessoal!' });
```

### Boas Práticas com EventEmitter

```js
// 1. Ajustar limite de listeners se necessário
emitter.setMaxListeners(20);

// 2. Remover listeners desnecessários para evitar vazamento de memória
emitter.off('evento', minhaFuncao);

// 3. Sempre tratar o evento de erro
emitter.on('error', (err) => {
  console.error('Erro capturado:', err.message);
});
```

---

##  Checklist do Módulo

- [ ] Express.js instalado e servidor básico criado
- [ ] Rotas GET, POST, PUT e DELETE implementadas
- [ ] Middleware global de log configurado
- [ ] Middleware específico de validação criado
- [ ] Middleware de tratamento de erros adicionado
- [ ] Integração com MySQL via pool configurada
- [ ] CRUD completo funcionando via rotas Express
- [ ] Prepared statements usados em todas as queries
- [ ] Variáveis de ambiente configuradas no `.env`
- [ ] EventEmitter implementado com `on`, `emit` e `once`
- [ ] Listener de erro registrado no EventEmitter

---

##  Exercícios do Módulo

### Atividades Teóricas
1. O que é o Express.js e quais suas principais vantagens?
2. Quais são os quatro principais métodos de rotas HTTP?
3. Explique o conceito de middleware no Express.js.
4. Como criar uma conexão básica entre Node.js e MySQL?
5. O que é um prepared statement e como ele protege contra SQL Injection?
6. Explique a diferença entre middlewares globais e específicos.
7. Quais são os principais métodos do EventEmitter?
8. Qual a diferença entre `on` e `once`?
9. O que acontece se você emitir um evento sem nenhum listener registrado?
10. Por que é importante remover listeners desnecessários?

### Atividades Práticas
- Crie um servidor Express.js que responda à rota `/` com `"Hello, World!"`.
- Implemente uma rota GET que liste todos os usuários do banco MySQL.
- Adicione um middleware que registre o método HTTP e a URL de cada requisição.
- Crie uma rota POST que insira um novo usuário no banco de dados.
- Implemente uma rota PUT para atualizar o nome de um usuário pelo ID.
- Crie uma rota DELETE que exclua um usuário pelo ID.
- Use prepared statements para consultar um usuário pelo nome de forma segura.
- Estruture um CRUD completo com separação de módulos em arquivos diferentes.
- Crie um programa com EventEmitter que emite um evento `hello` e responde com `"Hello, World!"`.
- Implemente um sistema de logging com os níveis `info`, `warn` e `error`.
- Simule uma sala de chat com eventos `userJoined` e `message`.

---

##  Aplicabilidade

**APIs REST:**
- Criação de endpoints organizados por recurso
- Integração com frontend e aplicações móveis

**Sistemas Corporativos:**
- Middlewares para autenticação e autorização
- Logs estruturados de auditoria

**Aplicações em Tempo Real:**
- Sistemas de notificação com EventEmitter
- Streaming de dados e controle de fluxo em APIs

---

> **Resumo:** O Módulo 04 marca a transição do Node.js puro para o desenvolvimento web estruturado com Express.js. O aluno aprende a construir APIs completas com rotas, middlewares e integração MySQL, além de dominar a programação orientada a eventos com EventEmitter — ferramentas essenciais para o mercado de desenvolvimento backend.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Node.js |
| 02 | Fundamentos |
| 03 | Integração com MySQL |
| **04** | **Desenvolvimento Web** |
| 05 | Templating e Interface com Servidor |
| 06 | Autenticação e Segurança |
| 07 | Aplicações Avançadas |
| 08 | APIs RESTful e MySQL |
| 09 | Projeto Final |
