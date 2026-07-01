#  Módulo 02 — Fundamentos do Node.js
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este módulo explora os **conceitos fundamentais do Node.js** que capacitam desenvolvedores a criar aplicações eficientes, escaláveis e bem estruturadas. O foco está no funcionamento interno da plataforma, seus módulos nativos e os principais padrões de programação utilizados no mercado.

---

##  Objetivo do Módulo

Ao final deste módulo, o aluno será capaz de:

- Compreender profundamente o funcionamento do **Event Loop**
- Trabalhar corretamente com **programação assíncrona**
- Organizar projetos utilizando **módulos**
- Manipular **arquivos, streams e buffers**
- Tratar erros e **depurar aplicações**
- Criar **servidores HTTP** básicos com Node.js puro

---

##  2.1 — Módulos no Node.js: CommonJS vs ES Modules

### O que são Módulos?

Módulos são blocos reutilizáveis de código que ajudam na **organização e manutenção** de projetos.

### CommonJS

Padrão histórico do Node.js.

```js
// math.js — exportação
module.exports = {
  somar: (a, b) => a + b
};

// index.js — importação
const math = require('./math');
console.log(math.somar(2, 3)); // 5
```

### ES Modules (ESM)

Padrão moderno do JavaScript (ECMAScript).

```js
// math.js — exportação
export const somar = (a, b) => a + b;

// index.js — importação
import { somar } from './math.js';
console.log(somar(2, 3)); // 5
```

### Diferenças Principais

| Aspecto | CommonJS | ES Modules |
|---------|----------|------------|
| Importação | `require()` | `import` |
| Exportação | `module.exports` | `export` |
| Carregamento | Síncrono | Assíncrono (estático) |
| Compatibilidade | Node.js legado | Projetos modernos e web |
| Extensão padrão | `.js` | `.mjs` ou `"type": "module"` |

> **Quando usar:** Use CommonJS para aplicações legadas ou completamente server-side. Prefira ESM para projetos modernos ou com compatibilidade web.

---

##  2.2 — Manipulação de Arquivos com o módulo `fs`

O módulo **fs** (File System) permite interagir com o sistema de arquivos: criar, ler, atualizar e excluir arquivos e diretórios.

### Tipos de Operações

| Tipo | Característica |
|------|----------------|
| **Síncrona** | Bloqueia o Event Loop — uso não recomendado em produção |
| **Assíncrona** | Não bloqueia a execução — padrão recomendado |

### Exemplo — Criar e Ler Arquivos (Assíncrono)

```js
const fs = require('fs');

// Criar arquivo
fs.writeFile('arquivo.txt', 'Olá, Node.js!', (err) => {
  if (err) throw err;
  console.log('Arquivo criado!');

  // Ler arquivo
  fs.readFile('arquivo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data); // Olá, Node.js!
  });
});
```

**Aplicabilidade:**
- Processamento de arquivos de log
- Manipulação de uploads
- Leitura de configurações

---

##  2.3 — Streams e Buffers

### Streams

Streams permitem processar dados em **pequenos blocos (chunks)**, sendo ideais para arquivos grandes ou fluxos contínuos de dados, evitando alto consumo de memória.

### Tipos de Streams

| Tipo | Descrição |
|------|-----------|
| **Readable** | Leitura de dados |
| **Writable** | Escrita de dados |
| **Duplex** | Leitura e escrita simultâneas |
| **Transform** | Transforma os dados durante o fluxo |

### Exemplo — Leitura com Stream

```js
const fs = require('fs');

const stream = fs.createReadStream('arquivo-grande.txt', { encoding: 'utf8' });

stream.on('data', (chunk) => {
  console.log('Chunk recebido:', chunk);
});

stream.on('end', () => {
  console.log('Leitura concluída.');
});
```

### Buffers

Buffers armazenam temporariamente **dados binários** durante o processamento, sendo amplamente usados em streams.

```js
const buf = Buffer.from('Node.js');
console.log(buf);           // <Buffer 4e 6f 64 65 2e 6a 73>
console.log(buf.toString()); // Node.js
```

---

##  2.4 — Tratamento de Erros e Depuração

### Tipos de Erros

| Tipo | Quando ocorre |
|------|--------------|
| **Sintaxe** | Durante a compilação do código |
| **Runtime** | Durante a execução |
| **Lógico** | Resultados inesperados por lógica incorreta |

### Try/Catch

```js
try {
  const data = fs.readFileSync('inexistente.txt', 'utf8');
} catch (err) {
  console.error('Erro ao ler arquivo:', err.message);
}
```

### Eventos de Erro em Streams

```js
stream.on('error', (err) => {
  console.error('Erro no stream:', err.message);
});
```

### Depuração com `--inspect`

```bash
node --inspect index.js
```

> Acesse `chrome://inspect` no navegador para debugging interativo.

---

##  2.5 — Servidor HTTP com o módulo `http`

O módulo **http** permite criar servidores que recebem e respondem a requisições HTTP — sem nenhuma dependência externa.

```js
const http = require('http');

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  if (req.url === '/') {
    res.end('Bem-vindo ao Node.js!');
  } else {
    res.writeHead(404);
    res.end('Rota não encontrada.');
  }
});

servidor.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

> **Observação:** Frameworks como Express.js abstraem essa complexidade, mas compreender o módulo `http` é essencial para entender como o backend funciona internamente.

---

##  Checklist do Módulo

- [ ] Diferença entre CommonJS e ES Modules compreendida
- [ ] Módulo criado e importado com `require` e com `import`
- [ ] Arquivo criado e lido com o módulo `fs` de forma assíncrona
- [ ] Stream de leitura implementado para processamento de dados
- [ ] Buffer criado e convertido de/para string
- [ ] Erros tratados com `try/catch` e eventos de erro
- [ ] Servidor HTTP básico criado e testado no navegador
- [ ] Debugging com `--inspect` utilizado ao menos uma vez

---

##  Exercícios do Módulo

### Teóricos
- O que é o Event Loop e qual sua importância no Node.js?
- Diferencie CommonJS de ES Modules.
- O que são Streams e Buffers?
- Liste três tipos de Streams e suas aplicações.
- Explique a diferença entre erros de runtime e erros de sintaxe.
- Qual é a função do módulo `http` no Node.js?

### Práticos
- Crie um servidor HTTP que responda com `"Bem-vindo ao Node.js!"`.
- Escreva um código para criar e ler um arquivo com o módulo `fs`.
- Implemente um stream para processar dados de um arquivo grande.
- Utilize Buffers para manipular uma string e convertê-la em dados binários.
- Crie um módulo CommonJS com uma função simples e importe-o em outro arquivo.
- Crie um script que utilize `try/catch` para tratar erros ao acessar um arquivo inexistente.
- Configure um servidor HTTP que responda de forma diferente para cada rota.

---

##  Aplicabilidade

**Organização de Projetos:**
- Modularização de código com CommonJS ou ESM
- Reutilização de funções entre arquivos

**Processamento de Dados:**
- Leitura eficiente de arquivos grandes com streams
- Manipulação de dados binários com buffers

**Backend:**
- Criação de servidores HTTP sem frameworks
- Base para compreender frameworks como Express.js

---

> **Resumo:** O Módulo 02 aprofunda os fundamentos que sustentam qualquer aplicação Node.js: o sistema de módulos, a manipulação do sistema de arquivos, o processamento eficiente com streams e buffers, o tratamento de erros e a criação de servidores HTTP. Esses conceitos são a espinha dorsal dos módulos mais avançados da trilha.

---

##  Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Node.js |
| **02** | **Fundamentos** |
| 03 | Integração com MySQL |
| 04 | Desenvolvimento Web |
| 05 | Templating e Interface com Servidor |
| 06 | Autenticação e Segurança |
| 07 | Aplicações Avançadas |
| 08 | APIs RESTful e MySQL |
| 09 | Projeto Final |
