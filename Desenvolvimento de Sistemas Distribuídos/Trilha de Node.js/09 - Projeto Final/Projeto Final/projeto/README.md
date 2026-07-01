#  Módulo 09 — Projeto Final
> **Trilha de Node.js | UniSENAI 2026**  
> Autores: William Sestito, Emerson Amancio

---

##  Sobre este Módulo

Este é o módulo final da Trilha de Node.js. Seu objetivo é **integrar e consolidar** todos os conceitos e práticas adquiridos ao longo do curso em um projeto completo e funcional, utilizando Node.js, MySQL e boas práticas de desenvolvimento, documentação e entrega.

---

##  Objetivo do Projeto

Desenvolver uma aplicação backend completa que contemple:

- Modelagem e criação do **banco de dados MySQL**
- Implementação de **API RESTful** com Node.js e Express
- **Autenticação e autorização** com JWT e roles
- **Validação de dados** no backend
- **Documentação técnica e de testes**
- **Deploy** em ambiente de produção
- Entrega via **repositório GitHub** com boas práticas de versionamento

---

##  Escopos de Projetos Sugeridos

### Projeto 1 — Sistema de Gerenciamento de Eventos

**Levantamento de Requisitos:**
- Cadastro de eventos com nome, data, local e descrição
- Listagem de eventos com filtros por data e local
- Cadastro e login de usuários para gestão de eventos
- Restrição de acesso: somente organizadores podem criar/editar eventos
- Geração de relatórios de eventos

**Tecnologias:**

| Recurso | Tecnologia |
|---------|-----------|
| Back-end | Node.js com Express |
| Banco de Dados | MySQL |
| Autenticação | JWT |
| Interface | EJS ou React (opcional) |
| Deploy | Heroku ou Render |

**Documentação Técnica:**
- Visão Geral do Sistema: descrição dos objetivos e funcionalidades principais
- Diagrama de Arquitetura: fluxo de dados entre cliente, servidor e banco de dados
- Endpoints da API: lista completa com descrição, parâmetros e exemplos de requisição/resposta

**Documentação de Testes:**
- Planos de Testes com entradas, saídas esperadas e resultados obtidos
- Testes de API com Postman ou Insomnia

---

### Projeto 2 — Sistema de Controle de Estoque

**Levantamento de Requisitos:**
- Cadastro de produtos com nome, quantidade, preço e categoria
- Controle de entrada e saída de estoque
- Relatórios de produtos mais vendidos e estoque baixo
- Gestão de usuários para controle de acesso

**Tecnologias:**

| Recurso | Tecnologia |
|---------|-----------|
| Back-end | Node.js com Express |
| Banco de Dados | MySQL |
| Autenticação | JWT com roles (admin / usuário comum) |
| Interface | EJS ou API para consumo externo |
| Deploy | Heroku ou DigitalOcean |

**Documentação Técnica:**
- Descrição do Sistema: objetivos e principais funcionalidades
- Diagrama de Relacionamento de Dados: estrutura das tabelas e suas relações
- Detalhamento de Endpoints: tabelas com métodos HTTP, descrições e exemplos

**Documentação de Testes:**
- Testes Unitários com Jest para funções críticas
- Testes de Integração: verificar interação entre back-end e banco de dados
- Testes Funcionais: garantir que as funcionalidades atendam os requisitos definidos

---

### Projeto 3 — Plataforma de Feedback de Produtos

**Levantamento de Requisitos:**
- Cadastro de produtos com nome, descrição e categoria
- Sistema de feedback com avaliações e comentários de usuários
- Exibição de avaliações médias para cada produto
- Moderação de feedbacks pelos administradores

**Tecnologias:**

| Recurso | Tecnologia |
|---------|-----------|
| Back-end | Node.js com Express |
| Banco de Dados | MySQL |
| Autenticação | JWT |
| Interface | EJS ou Vue.js |
| Deploy | Render ou AWS |

**Documentação Técnica:**
- Especificação do Sistema: objetivo, escopo e visão geral
- Modelagem de Dados: tabelas e relações (produtos, usuários, feedbacks)
- Descrição dos Endpoints: exemplos e descrições claras para cada rota

**Documentação de Testes:**
- Testes de Segurança: validação de autenticação e autorização
- Testes de Desempenho: análise do tempo de resposta dos endpoints mais usados
- Testes Manuais: execução de fluxos completos no Postman

---

##  Modelo de Documentação do Projeto

### 1. Introdução

```
Nome do Projeto:
Descrição Geral: Resumo dos objetivos e escopo do projeto.
Tecnologias Utilizadas: Ferramentas e linguagens usadas no desenvolvimento.
```

### 2. Requisitos Funcionais

Liste as funcionalidades essenciais do sistema. Exemplo:
- "Usuários podem cadastrar produtos."
- "Administradores podem gerar relatórios."

### 3. Modelagem de Dados

Inclua um diagrama ER ou descrição textual das tabelas e suas relações.

```sql
-- Exemplo de tabela de usuários com roles
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'usuario') DEFAULT 'usuario',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Estrutura do Projeto

```
meu-projeto/
├── server.js
├── db.js
├── .env
├── routes/
├── controllers/
├── models/
├── middlewares/
└── docs/
    └── swagger.json
```

**Dependências principais:** lista das bibliotecas utilizadas no projeto (`express`, `mysql2`, `jsonwebtoken`, `bcryptjs`, `joi`, `swagger-ui-express`, etc.).

### 5. Endpoints da API

Para cada endpoint, documente:

| Campo | Descrição |
|-------|-----------|
| **Método HTTP** | GET, POST, PUT, DELETE |
| **URL** | Ex.: `/api/usuarios/:id` |
| **Parâmetros** | Path params, query params, body |
| **Exemplo de resposta** | JSON esperado com status code |

### 6. Configuração do Ambiente

Passos para rodar o projeto localmente:

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do MySQL e JWT_SECRET

# 4. Criar o banco de dados
mysql -u root -p < database/schema.sql

# 5. Iniciar o servidor
npm start
```

### 7. Documentação de Testes

- **Planos de Teste:** descrições das verificações realizadas com entradas e saídas esperadas
- **Ferramentas:** Postman, Insomnia, Jest ou Swagger

### 8. Deploy

```
Plataforma Utilizada: Heroku / Render / DigitalOcean / AWS
URL de Produção: https://seu-projeto.onrender.com
```

### 9. Conclusão

Resumo dos principais aprendizados e desafios enfrentados ao longo do desenvolvimento.

---

##  Critérios de Avaliação

| Critério | Descrição |
|----------|-----------|
| **Funcionalidade** | API funcional com CRUD completo e autenticação operando corretamente |
| **Organização** | Código estruturado em camadas (routes, controllers, models) |
| **Segurança** | JWT implementado, prepared statements e variáveis de ambiente configuradas |
| **Validação** | Dados de entrada validados com Joi ou similar |
| **Documentação** | README completo, endpoints documentados (Swagger) e testes descritos |
| **Versionamento** | Repositório GitHub com branches, commits descritivos e pull requests |
| **Deploy** | Aplicação acessível em ambiente de produção |

---

##  Entrega Final

- [ ] Repositório criado no **GitHub** com os professores adicionados como colaboradores
- [ ] **Branches auxiliares** utilizadas durante o desenvolvimento
- [ ] **Pull requests** criados e marcados para revisão de código
- [ ] **URL do repositório** submetida para avaliação
- [ ] **URL da aplicação em produção** submetida para avaliação

---

##  Checklist do Projeto

- [ ] Banco de dados modelado e criado no MySQL
- [ ] Tabelas com relacionamentos e chaves estrangeiras configuradas
- [ ] Projeto estruturado em `routes/`, `controllers/` e `models/`
- [ ] CRUD completo implementado e testado
- [ ] Autenticação JWT com login e rotas protegidas
- [ ] Controle de acesso por roles (admin/usuário)
- [ ] Validação de dados com Joi nas rotas de criação e atualização
- [ ] Paginação e filtros implementados nas listagens
- [ ] API documentada com Swagger (`/api-docs`)
- [ ] Variáveis de ambiente configuradas no `.env`
- [ ] Testes realizados no Postman/Insomnia e documentados
- [ ] README do projeto escrito com instruções de instalação
- [ ] Repositório GitHub organizado com commits descritivos
- [ ] Deploy realizado em plataforma de produção

---

##  Aplicabilidade

**Sistemas Reais de Mercado:**
- Plataformas de gestão empresarial com controle de acesso por perfil
- APIs consumidas por aplicações web e mobile

**Portfólio Profissional:**
- Projeto completo demonstrando domínio do stack Node.js + MySQL
- Código público no GitHub como vitrine para recrutadores

**Preparação para o Mercado:**
- Experiência com versionamento colaborativo (Git/GitHub)
- Prática de deploy em ambientes reais de produção

---

> **Resumo:** O Módulo 09 é a culminação de toda a Trilha de Node.js. O aluno aplica em um único projeto todos os conceitos aprendidos — desde a modelagem do banco de dados até o deploy em produção, passando por autenticação JWT, arquitetura em camadas, validação, paginação e documentação. É a oportunidade de consolidar o aprendizado e construir um projeto real pronto para o portfólio profissional.

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
| 08 | APIs RESTful e MySQL |
| **09** | **Projeto Final** |
