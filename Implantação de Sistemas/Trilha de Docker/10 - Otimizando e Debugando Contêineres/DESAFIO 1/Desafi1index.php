<?php
// index.php — Página de teste da aplicação PHP
// Demonstra conexão com MySQL via PDO e exibe informações do ambiente

// Lê as variáveis de ambiente injetadas pelo docker-compose.yml
// getenv() → busca variável de ambiente; o segundo argumento é o valor padrão
$host     = getenv('DB_HOST')     ?: 'mysql';
$port     = getenv('DB_PORT')     ?: '3306';
$dbname   = getenv('DB_NAME')     ?: 'app_db';
$user     = getenv('DB_USER')     ?: 'appuser';
$password = getenv('DB_PASSWORD') ?: '';

$status = '';
$erro   = '';

// PDO (PHP Data Objects) → interface unificada para conexão com bancos de dados
// Vantagem sobre mysqli: suporta múltiplos bancos (MySQL, PostgreSQL, SQLite, etc.)
try {
    // new PDO() → abre conexão com o banco de dados
    // "mysql:host=$host;port=$port;dbname=$dbname" → DSN (Data Source Name)
    // PDO::ATTR_ERRMODE → define que erros geram exceções (mais fácil de tratar)
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8",
        $user,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // query() → executa uma consulta SQL simples
    // SELECT VERSION() → retorna a versão do MySQL em execução
    $versao = $pdo->query('SELECT VERSION()')->fetchColumn();
    $status = "✅ Conexão com MySQL bem-sucedida! Versão: $versao";

} catch (PDOException $e) {
    // PDOException → exceção lançada quando a conexão ou consulta falha
    $erro = "❌ Erro ao conectar: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>PHP + Docker — Desafio 1</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; }
        .ok  { background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 5px; }
        .err { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 5px; }
        pre  { background: #f4f4f4; padding: 10px; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🐳 Ambiente Docker — PHP + Nginx + MySQL</h1>

    <h2>Informações do PHP</h2>
    <pre>Versão do PHP: <?= PHP_VERSION ?></pre>
    <pre>SAPI: <?= PHP_SAPI ?> (esperado: fpm-fcgi)</pre>

    <h2>Conexão com o Banco</h2>
    <?php if ($status): ?>
        <div class="ok"><?= $status ?></div>
    <?php else: ?>
        <div class="err"><?= $erro ?></div>
    <?php endif; ?>

    <h2>Variáveis de Ambiente</h2>
    <pre>
DB_HOST: <?= $host ?>

DB_PORT: <?= $port ?>

DB_NAME: <?= $dbname ?>

DB_USER: <?= $user ?>
    </pre>
</body>
</html>