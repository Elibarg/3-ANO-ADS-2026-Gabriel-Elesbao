#  Módulo 07 — Aplicações Avançadas com Node.js
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo explora **funcionalidades avançadas do Node.js** para capacitar os alunos a desenvolver aplicações modernas, escaláveis e de alta performance — indo além do desenvolvimento básico para técnicas utilizadas em ambientes de produção real.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Dominar **Promises e async/await** para programação assíncrona avançada
- Utilizar **Worker Threads** para processamento paralelo sem bloquear o Event Loop
- Implementar comunicação em tempo real com **Socket.io**
- Escalar aplicações usando **Clusters e Child Processes**
- Monitorar e registrar logs com **PM2 e Winston**

---

##  7.1 — Programação Assíncrona com Promises e Async/Await

### O que é Programação Assíncrona?

Permite que o código execute tarefas **sem bloquear o fluxo principal**, tornando as aplicações mais eficientes ao lidar com operações de I/O como leitura de arquivos, consultas ao banco e requisições HTTP.

### Evolução do Assincronismo no Node.js

| Abordagem | Legibilidade | Tratamento de Erros |
|-----------|-------------|---------------------|
| **Callbacks** | Baixa (callback hell) | `if (err)` aninhado |
| **Promises** | Média (encadeamento) | `.catch()` |
| **Async/Await** | Alta (parece síncrono) | `try/catch` |

### Promises

Representam a eventual conclusão (ou falha) de uma operação assíncrona.

```js
function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nome: 'Akira' });
      } else {
        reject(new Error('ID inválido'));
      }
    }, 1000);
  });
}

buscarUsuario(1)
  .then(usuario => console.log('Encontrado:', usuario))
  .catch(err => console.error('Erro:', err.message));
```

### Async/Await

Sintaxe mais simples e legível para trabalhar com Promises — o código parece síncrono mas continua assíncrono.

```js
async function buscarDados() {
  try {
    const usuario = await buscarUsuario(1);
    console.log('Usuário:', usuario);

    const [pedidos] = await pool.execute(
      'SELECT * FROM pedidos WHERE usuario_id = ?',
      [usuario.id]
    );
    console.log('Pedidos:', pedidos);
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

buscarDados();
```

### Execução Paralela com `Promise.all`

Quando múltiplas operações são independentes, execute-as **simultaneamente** para ganhar performance:

```js
async function carregarPainel(userId) {
  // Executa as três consultas ao mesmo tempo
  const [usuario, pedidos, notificacoes] = await Promise.all([
    buscarUsuario(userId),
    buscarPedidos(userId),
    buscarNotificacoes(userId)
  ]);

  return { usuario, pedidos, notificacoes };
}
```

---

##  7.2 — Worker Threads para Multitarefa

### O que são Worker Threads?

Permitem executar código JavaScript em **threads separados**, ideais para tarefas pesadas (processamento de imagens, cálculos intensivos, compressão de dados) que não devem bloquear o Event Loop principal.

### Instalação

`worker_threads` é um módulo nativo do Node.js — sem instalação adicional.

### Exemplo — Arquivo Principal (`index.js`)

```js
const { Worker } = require('worker_threads');

function executarWorker(dado) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: { numero: dado }
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker encerrado com código ${code}`));
    });
  });
}

async function main() {
  console.log('Iniciando tarefa pesada em worker...');
  const resultado = await executarWorker(1_000_000);
  console.log('Resultado:', resultado);
}

main();
```

### Exemplo — Arquivo do Worker (`worker.js`)

```js
const { workerData, parentPort } = require('worker_threads');

// Simula processamento pesado
let soma = 0;
for (let i = 0; i < workerData.numero; i++) {
  soma += i;
}

// Envia resultado de volta ao processo principal
parentPort.postMessage(soma);
```

> **Quando usar:** cálculos matemáticos intensivos, processamento de arquivos grandes, geração de relatórios complexos, compressão/descompressão de dados.

---

##  7.3 — WebSockets com Socket.io

### O que é Socket.io?

Biblioteca que facilita a **comunicação bidirecional em tempo real** entre cliente e servidor — ideal para chats, notificações ao vivo, dashboards e jogos multiplayer.

### Instalação

```bash
npm install socket.io
```

### Servidor (`server.js`)

```js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const servidor = http.createServer(app);
const io = new Server(servidor);

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  // Recebe mensagem do cliente
  socket.on('mensagem', (dados) => {
    console.log('Mensagem recebida:', dados);
    // Transmite para todos os clientes conectados
    io.emit('mensagem', dados);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

servidor.listen(3000, () => {
  console.log('Servidor WebSocket rodando na porta 3000');
});
```

### Cliente (`index.html`)

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  // Enviar mensagem ao servidor
  function enviar() {
    const texto = document.getElementById('msg').value;
    socket.emit('mensagem', { texto, hora: new Date().toLocaleTimeString() });
  }

  // Receber mensagem do servidor
  socket.on('mensagem', (dados) => {
    const lista = document.getElementById('lista');
    lista.innerHTML += `<li>[${dados.hora}] ${dados.texto}</li>`;
  });
</script>
```

---

##  7.4 — Escalabilidade com Clusters e Child Processes

### Clusters

Por padrão, Node.js roda em **thread única** e usa apenas um núcleo do processador. Com clusters, é possível aproveitar **todos os núcleos disponíveis** da máquina.

```js
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Processo primário iniciado. Criando ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // cria um processo filho por núcleo
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} encerrado. Reiniciando...`);
    cluster.fork(); // reinicia automaticamente em caso de falha
  });

} else {
  const app = express();

  app.get('/', (req, res) => {
    res.send(`Requisição tratada pelo worker PID: ${process.pid}`);
  });

  app.listen(3000);
}
```

### Child Processes

Permite criar **processos filhos independentes** para executar comandos do sistema operacional ou scripts externos.

```js
const { exec, spawn } = require('child_process');

// exec — para comandos simples
exec('ls -la', (err, stdout, stderr) => {
  if (err) return console.error('Erro:', err.message);
  console.log(stdout);
});

// spawn — para processos com saída contínua
const processo = spawn('node', ['script.js']);

processo.stdout.on('data', (data) => {
  console.log('Saída:', data.toString());
});

processo.on('close', (code) => {
  console.log(`Processo encerrado com código ${code}`);
});
```

### Clusters vs Child Processes

| Aspecto | Clusters | Child Processes |
|---------|----------|-----------------|
| Uso principal | Escalar servidores web | Executar tarefas externas |
| Compartilha porta | ✅ Sim | ❌ Não |
| Reinicialização automática | ✅ Com `cluster.fork()` | Manual |
| Ideal para | Alta carga de requisições | Scripts e comandos externos |

---

##  7.5 — Monitoramento e Logging com PM2 e Winston

### PM2 — Gerenciador de Processos

PM2 mantém a aplicação **sempre em execução**, reiniciando automaticamente em caso de falha, e facilita o gerenciamento em produção.

```bash
# Instalação global
npm install -g pm2

# Iniciar aplicação
pm2 start index.js --name "minha-app"

# Ver processos em execução
pm2 list

# Monitorar em tempo real
pm2 monit

# Ver logs
pm2 logs

# Reiniciar aplicação
pm2 restart minha-app

# Configurar inicialização automática no boot
pm2 startup
pm2 save
```

### Winston — Logging Estruturado

Biblioteca para registro de logs com **níveis de severidade**, suporte a múltiplos destinos (console, arquivo, serviços externos) e formatação estruturada.

```bash
npm install winston
```

```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Logs de erro em arquivo separado
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Todos os logs em arquivo combinado
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // Exibição no console em desenvolvimento
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Uso nos diferentes níveis
logger.info('Servidor iniciado na porta 3000');
logger.warn('Uso de memória alto: 85%');
logger.error('Falha na conexão com o banco de dados', { detalhe: 'timeout' });
```

### Níveis de Log do Winston

| Nível | Uso |
|-------|-----|
| `error` | Erros críticos que impedem o funcionamento |
| `warn` | Alertas que merecem atenção |
| `info` | Informações gerais do sistema |
| `debug` | Detalhes para desenvolvimento e depuração |

---

##  Checklist do Módulo

- [ ] Função assíncrona implementada com `async/await` e `try/catch`
- [ ] `Promise.all` utilizado para execução paralela de operações
- [ ] Worker Thread criado para processar tarefa pesada
- [ ] Comunicação entre `index.js` e `worker.js` com `parentPort`
- [ ] Servidor Socket.io configurado com eventos de conexão/desconexão
- [ ] Cliente HTML enviando e recebendo mensagens via Socket.io
- [ ] Cluster configurado aproveitando todos os núcleos da CPU
- [ ] Child Process executando comando externo com `exec` ou `spawn`
- [ ] PM2 instalado e aplicação iniciada/monitorada
- [ ] Winston configurado com logs em console e arquivo
- [ ] Níveis de log (`info`, `warn`, `error`) utilizados adequadamente

---

##  Exercícios do Módulo

### Teóricos
1. Explique a diferença entre callbacks, promises e async/await.
2. O que são Worker Threads no Node.js e qual sua utilidade?
3. Como o Socket.io facilita a comunicação em tempo real?
4. Qual é o papel dos clusters em aplicações Node.js?
5. Liste três vantagens do PM2 para o gerenciamento de processos.
6. O que é um child process e como ele é utilizado?
7. Explique o conceito de logging estruturado e sua importância.
8. Qual é a vantagem de usar Winston para logs em relação ao `console.log`?
9. Por que é importante escalar aplicações Node.js em ambientes de produção?
10. Como a programação assíncrona melhora a performance de aplicações?

### Práticos
- Implemente uma função que utilize `async/await` para buscar dados de uma API.
- Use `Promise.all` para executar três consultas ao banco simultaneamente.
- Configure um Worker Thread que execute uma tarefa de cálculo intensivo.
- Crie um servidor Socket.io que receba mensagens e transmita para todos os clientes.
- Implemente um cluster que utilize todos os núcleos do processador.
- Configure um child process que execute um comando do sistema operacional.
- Instale o PM2 e monitore uma aplicação Node.js em execução.
- Configure o Winston para salvar logs de erro em arquivo e exibir no console.
- Crie uma aplicação de chat em tempo real usando Socket.io.
- Combine Worker Threads e Winston para monitorar tarefas em segundo plano.

---

##  Aplicabilidade

**Alta Performance:**
- Worker Threads para processamento paralelo sem travar o servidor
- `Promise.all` para reduzir tempo de resposta em operações múltiplas

**Tempo Real:**
- Socket.io para chats, notificações ao vivo e dashboards dinâmicos
- WebSockets em sistemas de monitoramento e jogos multiplayer

**Produção e Escalabilidade:**
- Clusters para aproveitar toda a capacidade do servidor
- PM2 para uptime contínuo com reinicialização automática
- Winston para rastreabilidade e auditoria de eventos do sistema

---

> **Resumo:** O Módulo 07 eleva o Node.js ao nível de aplicações de produção de alta performance. Com Worker Threads, clusters, Socket.io, PM2 e Winston, o aluno aprende a construir sistemas escaláveis, resilientes e monitorados — prontos para lidar com cargas reais e ambientes corporativos exigentes.

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
| **07** | **Aplicações Avançadas** |
| 08 | APIs RESTful e MySQL |
| 09 | Projeto Final |
