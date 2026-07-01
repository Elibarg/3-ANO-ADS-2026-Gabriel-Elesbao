#  Módulo 06 — Autenticação e Segurança
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo garante a **segurança nas aplicações web**, protegendo os dados dos usuários por meio de boas práticas de desenvolvimento, autenticação segura e prevenção contra vulnerabilidades comuns presentes no mercado.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Implementar autenticação com **JWT (JSON Web Token)**
- Gerenciar **sessões e cookies** de forma segura
- Proteger aplicações contra **CORS, CSRF e SQL Injection**
- Implementar **autenticação baseada em roles** com MySQL
- Criar **middlewares de autorização** para controle de acesso

---

##  6.1 — Autenticação com JWT

### O que é JWT?

JWT (JSON Web Token) é um padrão aberto para **transmissão segura de informações** entre partes como um objeto JSON compactado e assinado digitalmente.

### Composição do Token

| Parte | Descrição |
|-------|-----------|
| **Header** | Define o tipo de token e o algoritmo de assinatura (ex: `HS256`) |
| **Payload** | Contém as informações (claims) codificadas em Base64 |
| **Signature** | Garante a integridade dos dados — gerada com uma chave secreta |

```
eyJhbGciOiJIUzI1NiJ9  ←  Header
.eyJ1c2VyX2lkIjoxfQ   ←  Payload
.abc123xyz456          ←  Signature
```

### Como funciona?

```
1. Cliente envia login e senha ao servidor
2. Servidor valida as credenciais
3. Servidor gera e retorna um token JWT
4. Cliente armazena o token (localStorage ou cookie)
5. Cliente envia o token em cada requisição (header Authorization)
6. Servidor valida o token e autoriza o acesso
```

### Instalação

```bash
npm install jsonwebtoken bcryptjs dotenv
```

### Exemplo — Geração e Validação de JWT

```js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Gerar token (ex: após login bem-sucedido)
function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Middleware de validação do token
function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados;
    next();
  } catch (err) {
    res.status(403).json({ erro: 'Token inválido ou expirado.' });
  }
}

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

  if (rows.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas.' });

  const usuario = rows[0];
  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas.' });

  const token = gerarToken(usuario);
  res.json({ token });
});

// Rota protegida
app.get('/perfil', autenticar, (req, res) => {
  res.json({ mensagem: `Bem-vindo, usuário ${req.usuario.id}!` });
});
```

> **Variável de ambiente:** adicione `JWT_SECRET=sua_chave_secreta_aqui` no arquivo `.env`.

---

##  6.2 — Gerenciamento de Sessões e Cookies

### Sessões

Armazenam dados temporários do usuário **no servidor**, persistindo estados entre requisições HTTP.

### Cookies

Pequenos arquivos armazenados **no navegador** do cliente, contendo informações como tokens de autenticação.

### Instalação

```bash
npm install express-session cookie-parser
```

### Exemplo no Express

```js
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,   // impede acesso via JavaScript
    secure: true,     // transmite apenas via HTTPS
    maxAge: 1000 * 60 * 60  // expira em 1 hora
  }
}));

// Salvar dado na sessão
app.post('/login', (req, res) => {
  req.session.usuarioId = 1;
  res.json({ mensagem: 'Login realizado!' });
});

// Ler dado da sessão
app.get('/painel', (req, res) => {
  if (!req.session.usuarioId) {
    return res.status(401).json({ erro: 'Não autenticado.' });
  }
  res.json({ mensagem: 'Acesso permitido!' });
});
```

### Dicas de Segurança para Cookies

| Atributo | Função |
|----------|--------|
| `HttpOnly` | Impede acesso ao cookie via JavaScript — protege contra XSS |
| `Secure` | Garante transmissão apenas via HTTPS |
| `SameSite` | Protege contra ataques CSRF |
| `maxAge` | Define tempo de expiração do cookie |

---

##  6.3 — Proteção contra Vulnerabilidades Comuns

### CORS (Cross-Origin Resource Sharing)

Mecanismo que controla como recursos de um servidor podem ser acessados a partir de **domínios diferentes**, bloqueando requisições não autorizadas.

```bash
npm install cors
```

```js
const cors = require('cors');

// Permitir apenas um domínio específico
app.use(cors({
  origin: 'https://meu-frontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

---

### CSRF (Cross-Site Request Forgery)

Ataque onde **comandos maliciosos são enviados** em nome de um usuário autenticado, explorando a confiança do servidor nesse usuário.

**Solução:** tokens CSRF únicos validados pelo servidor a cada requisição.

```bash
npm install csurf
```

```js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/formulario', csrfProtection, (req, res) => {
  res.render('formulario', { csrfToken: req.csrfToken() });
});

app.post('/enviar', csrfProtection, (req, res) => {
  res.json({ mensagem: 'Dados recebidos com segurança!' });
});
```

```html
<!-- No template EJS, inclua o token no formulário -->
<input type="hidden" name="_csrf" value="<%= csrfToken %>">
```

---

### SQL Injection

Ataque que explora falhas nas consultas SQL, permitindo a **injeção de comandos maliciosos** pelo campo de entrada.

```js
// ❌ Vulnerável — concatenação direta
const query = `SELECT * FROM usuarios WHERE email = '${email}'`;

// ✅ Seguro — prepared statements com parâmetros
const [rows] = await pool.execute(
  'SELECT * FROM usuarios WHERE email = ?',
  [email]
);
```

### Resumo das Vulnerabilidades

| Vulnerabilidade | Risco | Solução |
|-----------------|-------|---------|
| **CORS** | Acesso de domínios não autorizados | Configurar origens permitidas |
| **CSRF** | Requisições forjadas em nome do usuário | Tokens CSRF por formulário |
| **SQL Injection** | Manipulação maliciosa do banco | Prepared statements com `?` |

---

##  6.4 — Autenticação Baseada em Roles

### O que é?

Permite **restringir ações com base nos papéis (roles)** dos usuários, como `admin`, `editor` e `usuario` — garantindo que cada perfil acesse apenas o que lhe é permitido.

### Estrutura de Tabelas no MySQL

```sql
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL  -- ex: 'admin', 'editor', 'usuario'
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

### Middleware de Autorização por Role

```js
// Verifica se o usuário autenticado possui o role exigido
function autorizar(roleExigida) {
  return (req, res, next) => {
    if (req.usuario.role !== roleExigida) {
      return res.status(403).json({ erro: 'Acesso negado. Permissão insuficiente.' });
    }
    next();
  };
}

// Rota acessível apenas por admins
app.delete('/usuarios/:id', autenticar, autorizar('admin'), async (req, res) => {
  await pool.execute('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
  res.json({ mensagem: 'Usuário removido.' });
});

// Rota acessível por qualquer usuário autenticado
app.get('/perfil', autenticar, (req, res) => {
  res.json({ mensagem: 'Perfil do usuário.' });
});
```

### Fluxo Completo de Autenticação + Autorização

```
Login → JWT gerado com { id, role }
  ↓
Requisição com token no header Authorization
  ↓
Middleware autenticar → valida o token → popula req.usuario
  ↓
Middleware autorizar('admin') → verifica req.usuario.role
  ↓
Acesso permitido ou negado (403)
```

---

##  Checklist do Módulo

- [ ] JWT gerado após login com `jsonwebtoken`
- [ ] Middleware `autenticar` validando token nas rotas protegidas
- [ ] Senhas armazenadas com hash usando `bcryptjs`
- [ ] `JWT_SECRET` e `SESSION_SECRET` definidos no `.env`
- [ ] Sessões configuradas com `express-session`
- [ ] Cookies com `HttpOnly` e `Secure` ativados
- [ ] CORS configurado com origens permitidas
- [ ] Proteção CSRF implementada com tokens nos formulários
- [ ] Prepared statements usados em todas as queries
- [ ] Tabela de roles criada no MySQL
- [ ] Middleware `autorizar(role)` restringindo rotas por perfil

---

##  Exercícios do Módulo

### Teóricos
1. Explique o que é JWT e quais são suas vantagens.
2. Qual a diferença entre sessões e cookies?
3. Defina CORS e por que é importante configurá-lo corretamente.
4. O que é CSRF e como prevenir este tipo de ataque?
5. Explique o conceito de SQL Injection e seus riscos.
6. Como o atributo `HttpOnly` ajuda a proteger cookies?
7. Quais são as três partes de um token JWT?
8. Liste três boas práticas para evitar SQL Injection em Node.js.
9. O que é autenticação baseada em roles e quais são seus benefícios?
10. Como o middleware `csrf` auxilia na proteção de aplicações web?

### Práticos
- Configure um servidor Express para gerar e validar tokens JWT.
- Implemente um sistema de sessão que armazene informações temporárias do usuário.
- Configure o CORS para permitir apenas requisições de um domínio específico.
- Crie uma rota protegida que utilize tokens CSRF para validação.
- Desenvolva uma função que previna SQL Injection com prepared statements.
- Configure cookies seguros com os atributos `HttpOnly` e `Secure`.
- Crie uma tabela de usuários com roles no MySQL e insira dados fictícios.
- Implemente middleware para restringir acesso com base em roles.
- Simule um ataque CSRF e implemente a solução para preveni-lo.
- Crie um sistema de login completo que emita um JWT e proteja rotas com base no token.

---

##  Aplicabilidade

**Sistemas com Login:**
- Autenticação de usuários com JWT e sessões seguras
- Proteção de rotas privadas em APIs e aplicações web

**Controle de Acesso:**
- Painéis administrativos com diferentes níveis de permissão
- Restrição de funcionalidades por perfil (admin, editor, usuário)

**Segurança em Produção:**
- Prevenção de ataques CORS, CSRF e SQL Injection
- Cookies seguros para aplicações em HTTPS

---

> **Resumo:** O Módulo 06 eleva a aplicação Node.js ao nível de produção, abordando os pilares da segurança web: autenticação com JWT, gerenciamento seguro de sessões e cookies, proteção contra as principais vulnerabilidades (CORS, CSRF, SQL Injection) e controle de acesso baseado em roles. São práticas indispensáveis para qualquer sistema real.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Node.js |
| 02 | Fundamentos |
| 03 | Integração com MySQL |
| 04 | Desenvolvimento Web |
| 05 | Templating e Interface com Servidor |
| **06** | **Autenticação e Segurança** |
| 07 | Aplicações Avançadas |
| 08 | APIs RESTful e MySQL |
| 09 | Projeto Final |
