#  Módulo 08 — APIs RESTful e MySQL
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo capacita o aluno a **projetar, estruturar e implementar APIs RESTful** utilizando Node.js, Express e MySQL, aplicando boas práticas de organização em camadas, validação de dados, paginação, filtros e documentação profissional com Swagger.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Criar APIs seguindo os **padrões REST**
- Integrar aplicações Express com **MySQL**
- Implementar operações **CRUD completas** via endpoints
- Aplicar **validação de dados** no backend com Joi
- Organizar projetos em **camadas** (routes, controllers, models)
- Implementar **paginação e filtros** em consultas
- Documentar APIs de forma profissional com **Swagger**

---

##  8.1 — Estruturando uma API RESTful com Express

### O que é uma API RESTful?

**API (Application Programming Interface)** é uma interface que permite a comunicação entre sistemas, possibilitando o envio e recebimento de dados de forma padronizada.

**RESTful** refere-se a APIs que seguem o padrão arquitetural REST (Representational State Transfer), utilizando verbos HTTP, URLs bem definidas e respostas padronizadas em JSON.

### Por que usar APIs RESTful?

| Vantagem | Descrição |
|----------|-----------|
| **Integração** | Facilita a comunicação entre sistemas diferentes |
| **Simplicidade** | Usa padrões da web já consolidados |
| **Escalabilidade** | Suporta crescimento sem grandes refatorações |
| **Versatilidade** | Ideal para aplicações web e mobile |

### Estrutura do Projeto em Camadas

Separar o projeto em camadas melhora a organização, facilita a manutenção e segue boas práticas de mercado:

```
meu-projeto/
├── server.js                    → configuração e inicialização do Express
├── db.js                        → pool de conexões com MySQL
├── .env                         → variáveis de ambiente
├── routes/
│   └── usuarios.js              → definição das rotas e métodos HTTP
├── controllers/
│   └── usuariosController.js    → lógica de negócio e resposta ao cliente
└── models/
    └── usuarioModel.js          → consultas e operações no banco de dados
```

**Por que essa separação?**

| Camada | Responsabilidade |
|--------|-----------------|
| **Routes** | Define os endpoints e direciona para o controller correto |
| **Controllers** | Recebe a requisição, valida dados e retorna a resposta |
| **Models** | Executa as operações no banco de dados |

### Configuração do Servidor (`server.js`)

```js
const express = require('express');
const usuariosRoutes = require('./routes/usuarios');
require('dotenv').config();

const app = express();

app.use(express.json());

// Middleware global de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api/usuarios', usuariosRoutes);

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
```

---

##  8.2 — Criando Endpoints para CRUD no MySQL

### Modelo de Dados no MySQL

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Definição das Rotas (`routes/usuarios.js`)

```js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
```

### Model — Consultas ao Banco (`models/usuarioModel.js`)

```js
const pool = require('../db');

const listarTodos = async () => {
  const [rows] = await pool.execute('SELECT * FROM usuarios');
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

const criar = async (nome, email) => {
  const [result] = await pool.execute(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email]
  );
  return result.insertId;
};

const atualizar = async (id, nome, email) => {
  await pool.execute(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id]
  );
};

const deletar = async (id) => {
  await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };
```

### Controller — Lógica de Negócio (`controllers/usuariosController.js`)

Os controllers recebem os dados da requisição, validam as informações, chamam o model e retornam a resposta ao cliente.

```js
const model = require('../models/usuarioModel');

// READ — listar todos
const listar = async (req, res) => {
  try {
    const usuarios = await model.listarTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// READ — buscar por ID
const buscarPorId = async (req, res) => {
  try {
    const usuario = await model.buscarPorId(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// CREATE
const criar = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const id = await model.criar(nome, email);
    res.status(201).json({ id, nome, email });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// UPDATE
const atualizar = async (req, res) => {
  try {
    const { nome, email } = req.body;
    await model.atualizar(req.params.id, nome, email);
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// DELETE
const deletar = async (req, res) => {
  try {
    await model.deletar(req.params.id);
    res.json({ mensagem: 'Usuário removido com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
```

---

##  8.3 — Validação de Dados com Joi

### O que é Joi?

Biblioteca para **validação de esquemas e dados** recebidos via requisições, garantindo que os dados enviados pelo cliente atendam os critérios esperados antes de chegar ao banco.

### Instalação

```bash
npm install joi
```

### Exemplo de Esquema de Validação

```js
const Joi = require('joi');

const schemaUsuario = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    'string.min': 'O nome deve ter pelo menos 3 caracteres.',
    'any.required': 'O nome é obrigatório.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Informe um e-mail válido.',
    'any.required': 'O e-mail é obrigatório.'
  })
});

function validarUsuario(req, res, next) {
  const { error } = schemaUsuario.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map(d => d.message);
    return res.status(400).json({ erros });
  }
  next();
}

module.exports = { validarUsuario };
```

### Aplicando a Validação nas Rotas

```js
const { validarUsuario } = require('../middlewares/validacoes');

// Validação aplicada antes de chegar ao controller
router.post('/', validarUsuario, controller.criar);
router.put('/:id', validarUsuario, controller.atualizar);
```

---

##  8.4 — Paginação e Filtros nas Consultas

### O que é Paginação?

Técnica de **dividir os resultados** de uma consulta em páginas menores, evitando sobrecarga no servidor e reduzindo tráfego de dados ao retornar grandes volumes de registros.

### Como funciona?

```
Página 1: registros 1 a 10   → LIMIT 10 OFFSET 0
Página 2: registros 11 a 20  → LIMIT 10 OFFSET 10
Página 3: registros 21 a 30  → LIMIT 10 OFFSET 20
```

### Implementação de Paginação + Filtro

```js
const listarComPaginacao = async (req, res) => {
  try {
    // 1. Parâmetros de paginação (com valores padrão)
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const offset = (pagina - 1) * limite;

    // 2. Filtro opcional por nome
    const nome = req.query.nome || '';

    let query = 'SELECT * FROM usuarios';
    const params = [];

    if (nome) {
      query += ' WHERE nome LIKE ?';
      params.push(`%${nome}%`);
    }

    // 3. LIMIT e OFFSET para paginação
    query += ' LIMIT ? OFFSET ?';
    params.push(limite, offset);

    const [rows] = await pool.execute(query, params);

    res.json({
      pagina,
      limite,
      total: rows.length,
      dados: rows
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
```

**Exemplo de chamada:**

```
GET /api/usuarios?pagina=2&limite=5&nome=ana
→ Retorna até 5 usuários cujo nome contenha "ana", a partir da página 2
```

---

##  8.5 — Documentação da API com Swagger

### O que é Swagger?

Conjunto de ferramentas para **documentar, testar e visualizar** APIs RESTful de forma interativa, baseado no padrão **OpenAPI Specification (OAS)**. Permite que outros desenvolvedores entendam e utilizem a API sem precisar ler o código-fonte.

### O que o Swagger oferece?

| Recurso | Descrição |
|---------|-----------|
| Visualização de endpoints | Lista todas as rotas disponíveis |
| Parâmetros aceitos | Documenta body, query params e path params |
| Exemplos de resposta | Mostra o formato esperado do JSON retornado |
| Testes interativos | Permite disparar requisições direto no navegador |

> Em empresas, APIs sem documentação são consideradas más práticas.

### Instalação

```bash
npm install swagger-ui-express swagger-jsdoc
```

### Configuração (`server.js`)

```js
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'Documentação da API RESTful — Trilha Node.js UniSENAI'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

### Anotações nas Rotas (`routes/usuarios.js`)

```js
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por nome
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', controller.listar);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', validarUsuario, controller.criar);
```

> Acesse `http://localhost:3000/api-docs` para visualizar a documentação interativa.

---

##  Checklist do Módulo

- [ ] Projeto estruturado nas pastas `routes/`, `controllers/` e `models/`
- [ ] Tabela criada no MySQL com script SQL
- [ ] Pool de conexões configurado em `db.js`
- [ ] Rotas GET, POST, PUT e DELETE definidas em `routes/usuarios.js`
- [ ] Model com funções de consulta ao banco implementado
- [ ] Controller com lógica de negócio e tratamento de erros implementado
- [ ] Joi instalado e esquema de validação criado
- [ ] Validação aplicada nas rotas POST e PUT como middleware
- [ ] Paginação implementada com `LIMIT` e `OFFSET`
- [ ] Filtro por nome implementado com `LIKE`
- [ ] Swagger instalado e configurado em `server.js`
- [ ] Endpoints documentados com anotações JSDoc no arquivo de rotas
- [ ] Interface Swagger acessível em `/api-docs`

---

##  Exercícios do Módulo

### Teóricos
1. O que caracteriza uma API RESTful?
2. Quais são os verbos HTTP mais usados em APIs e suas funções?
3. Explique a vantagem de estruturar projetos em camadas como controllers, models e routes.
4. O que é Joi e para que serve?
5. Como a paginação melhora a performance de uma API?
6. Qual é a finalidade do Swagger em projetos de API?
7. O que é o conceito de filtros em consultas e como ele funciona?
8. Explique como implementar um endpoint seguro para criar registros no MySQL.
9. Quais são os principais benefícios de validar dados na camada da API?
10. Como o Express simplifica o desenvolvimento de APIs RESTful?

### Práticos
1. Estruture um projeto para uma API RESTful com as pastas adequadas.
2. Implemente um endpoint para listar todos os registros de uma tabela.
3. Crie um endpoint para inserir um novo registro, validando os dados com Joi.
4. Adicione paginação a um endpoint que lista registros com `LIMIT` e `OFFSET`.
5. Crie um endpoint que permita atualizar registros pelo ID.
6. Implemente um endpoint para excluir registros com base no ID.
7. Configure um filtro para buscar registros pelo nome usando `LIKE`.
8. Documente sua API com Swagger, incluindo todos os endpoints criados.
9. Teste a validação de dados enviando requisições com campos inválidos.
10. Configure um middleware global que registre os logs de cada requisição recebida.

---

##  Aplicabilidade

**Backends de Aplicações Web e Mobile:**
- APIs consumidas por frontends React, Vue, Angular e aplicativos móveis
- Padronização de respostas JSON facilitando integrações

**Sistemas Corporativos:**
- Organização em camadas facilitando manutenção por equipes
- Validação centralizada reduzindo erros e dados inconsistentes

**APIs em Produção:**
- Paginação e filtros para lidar com grandes volumes de dados
- Documentação Swagger acelerando onboarding de novos desenvolvedores

---

> **Resumo:** O Módulo 08 consolida o desenvolvimento backend com Node.js aplicando padrões profissionais de mercado: arquitetura em camadas (routes → controllers → models), validação com Joi, paginação e filtros em consultas MySQL, e documentação interativa com Swagger. São as ferramentas que transformam um projeto funcional em uma API pronta para produção.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Node.js |
| 02 | Fundamentos |
| 03 | Integração com MySQL |
| 04 | Desenvolvimento Web |
| 05 | Templating e Interface com Servidor |
| 06 | Autenticação e Segurança |
| 07 | Aplicações Avançadas |
| **08** | **APIs RESTful e MySQL** |
| 09 | Projeto Final |
