// server.js — API REST Node.js com Express + MySQL
// Desafio 2 | Módulo 10 | Trilha de Docker | UniSENAI 2026

// express → framework web minimalista para Node.js (equivalente ao Slim do PHP)
const express = require('express');

// mysql2 → driver moderno para MySQL com suporte a Promises (async/await)
// Preferido ao "mysql" clássico por ser mais rápido e suportar MySQL 8.x
const mysql = require('mysql2/promise');

const app = express();

// express.json() → middleware que parseia automaticamente body de requisições JSON
// Sem isso, req.body seria undefined em requisições POST/PUT com Content-Type: application/json
app.use(express.json());

// Configuração do pool de conexões com o MySQL
// Pool → mantém conexões abertas e reutilizáveis (mais eficiente que abrir/fechar a cada query)
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'mysql',    // nome do serviço no docker-compose
  port:     process.env.DB_PORT     || 3306,
  database: process.env.DB_NAME     || 'app_db',
  user:     process.env.DB_USER     || 'appuser',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,   // aguarda conexão disponível em vez de lançar erro
  connectionLimit: 10,        // máximo de conexões simultâneas no pool
  queueLimit: 0               // 0 = fila ilimitada de requisições aguardando conexão
});

// ── ROTA DE SAÚDE (health check) ────────────────────────────
// GET /api/health → retorna status da API e do banco de dados
// Usada pelo Docker/orquestrador para verificar se o serviço está saudável
app.get('/api/health', async (req, res) => {
  try {
    // pool.query() → executa SQL e retorna Promise (async/await)
    // SELECT 1 → consulta mínima para verificar que o banco responde
    const [rows] = await pool.query('SELECT 1 AS ok, VERSION() AS versao');
    res.json({
      status: 'ok',
      api: 'online',
      banco: 'conectado',
      mysql_versao: rows[0].versao,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    // Se o banco não responder, retorna erro 503 (Service Unavailable)
    res.status(503).json({ status: 'erro', mensagem: err.message });
  }
});

// ── ROTA: listar itens ───────────────────────────────────────
// GET /api/itens → retorna todos os itens da tabela
app.get('/api/itens', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM itens ORDER BY id DESC');
    res.json({ dados: rows });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ── ROTA: criar item ─────────────────────────────────────────
// POST /api/itens → insere um novo item no banco
app.post('/api/itens', async (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome) {
    // 400 Bad Request → requisição inválida (campo obrigatório ausente)
    return res.status(400).json({ erro: 'Campo "nome" é obrigatório' });
  }
  try {
    // Prepared statement → evita SQL Injection (nunca concatenar valores diretamente no SQL)
    const [result] = await pool.query(
      'INSERT INTO itens (nome, descricao) VALUES (?, ?)',
      [nome, descricao || '']
    );
    // 201 Created → recurso criado com sucesso
    res.status(201).json({ id: result.insertId, nome, descricao });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// process.env.PORT → lê a porta da variável de ambiente (injetada pelo docker-compose)
// || 3000 → porta padrão caso a variável não esteja definida
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
  console.log(`Banco: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});