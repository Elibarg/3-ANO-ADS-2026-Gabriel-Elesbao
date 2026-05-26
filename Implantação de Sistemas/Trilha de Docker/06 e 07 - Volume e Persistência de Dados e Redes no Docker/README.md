# 🐳 Módulos 06 e 07 — Volumes, Persistência de Dados e Redes
> **Trilha de Docker | UniSENAI 2026**
> Autores: William Sestito, Emerson Amancio

---

## 📋 Sobre este Módulo

Estes dois módulos abordam dois pilares críticos para qualquer ambiente Docker em produção: **como os dados sobrevivem à remoção de contêineres** (volumes) e **como os contêineres se comunicam entre si de forma segura** (redes). Sem volumes, dados são perdidos a cada restart. Sem redes customizadas, a comunicação entre serviços é frágil e insegura.

---

## 🎯 Objetivo dos Módulos

**Módulo 06 — Volumes:**
- Compreender por que contêineres perdem dados ao ser removidos
- Criar e montar volumes para persistência de dados
- Verificar a sobrevivência de dados após remoção do contêiner

**Módulo 07 — Redes:**
- Criar redes Docker personalizadas
- Conectar múltiplos contêineres à mesma rede
- Compreender os tipos de rede e quando usar cada um

---

## 📚 Conteúdo

### Módulo 06 — Volumes e Persistência

#### 1. O Problema da Efêmeridade

Por padrão, tudo que um contêiner grava internamente **desaparece quando ele é removido**. A camada gravável do contêiner é temporária — vinculada ao ciclo de vida dele.

```
SEM volume:                          COM volume:
┌────────────────┐                   ┌────────────────┐
│   Contêiner    │                   │   Contêiner    │
│  ┌──────────┐  │  docker rm        │  ┌──────────┐  │  docker rm
│  │ /dados/  │  │ ──────────►  ✗   │  │ /dados/  │  │ ──────────►
│  │ db.sql   │  │   (sumiu!)        │  │ db.sql   │  │
│  └──────────┘  │                   │  └─────┬────┘  │
└────────────────┘                   └────────│───────┘
                                              │ montado em
                                     ┌────────▼───────┐
                                     │  Host: ./dados/ │  ✅ persiste!
                                     │  db.sql         │
                                     └─────────────────┘
```

---

#### 2. Tipos de Volume

| Tipo | Sintaxe | Quando usar |
|---|---|---|
| **Bind Mount** | `./pasta:/pasta` | Desenvolvimento — sincroniza código do host |
| **Volume Nomeado** | `db_data:/var/lib/mysql` | Produção — gerenciado pelo Docker |
| **Volume Anônimo** | `/pasta` | Temporário — sem persistência entre deploys |

---

#### 3. Volume Nomeado no docker-compose.yml

```yaml
services:
  db:
    image: mysql:8.0
    volumes:
      # Volume nomeado: dados persistem mesmo após "docker compose down"
      # Só são removidos com "docker compose down -v"
      - db_data:/var/lib/mysql

volumes:
  db_data:       # declaração obrigatória dos volumes nomeados
    driver: local
```

---

### Módulo 07 — Redes no Docker

#### 1. Por que usar Redes Personalizadas?

Sem redes customizadas, contêineres se comunicam por IP — que muda a cada reinicialização. Com redes nomeadas, eles se comunicam pelo **nome do serviço**, que funciona como um DNS interno estável e seguro.

```
Sem rede personalizada:              Com rede personalizada:
  web → 172.17.0.3:3306              web → "db:3306"
  (IP muda a cada restart!)          (nome fixo, sempre funciona)
```

---

#### 2. Tipos de Rede Docker

| Tipo | Comportamento | Quando usar |
|---|---|---|
| **bridge** | Rede virtual isolada no host. Contêineres na mesma bridge se comunicam pelo nome | Padrão para projetos com docker-compose |
| **host** | Contêiner compartilha a rede do host — sem IP próprio | Máxima performance de rede; perde isolamento |
| **overlay** | Conecta contêineres em múltiplas máquinas físicas | Clusters Docker Swarm / Kubernetes |
| **none** | Contêiner sem nenhuma interface de rede | Processamento offline sem necessidade de rede |

---

#### 3. Rede no docker-compose.yml

```yaml
services:
  web:
    build: .
    networks:
      - app_network   # conecta à rede abaixo

  db:
    image: mysql:8.0
    networks:
      - app_network   # mesmo serviço na mesma rede

# O serviço "web" acessa o banco via "db:3306" — sem expor ao host
networks:
  app_network:
    driver: bridge
```

---

## 🛠️ Comandos do Módulo

```bash
# ── VOLUMES ─────────────────────────────────────────────────

# Executar com bind mount (pasta local → pasta no contêiner)
docker run -d \
  -v $(pwd)/dados:/dados \
  --name meu-conteiner \
  alpine sleep 600

# Criar arquivo dentro do contêiner (via bind mount)
docker exec meu-conteiner sh -c "echo 'dado importante' > /dados/teste.txt"

# Verificar que o arquivo existe NO HOST (fora do contêiner)
cat ./dados/teste.txt

# Remover o contêiner
docker stop meu-conteiner && docker rm meu-conteiner

# Verificar que os dados AINDA existem no host
cat ./dados/teste.txt   # ✅ arquivo persiste!

# Listar volumes gerenciados pelo Docker
docker volume ls

# Remover volumes não utilizados
docker volume prune --force


# ── REDES ───────────────────────────────────────────────────

# Criar rede personalizada
docker network create --driver bridge minha-rede

# Subir contêineres conectados à rede
docker run -d --name container1 --network minha-rede alpine sleep 1000
docker run -d --name container2 --network minha-rede alpine sleep 1000

# Testar conectividade entre contêineres (pelo nome!)
docker exec -it container1 ping -c 4 container2

# Inspecionar a rede (IPs, contêineres conectados, gateway)
docker network inspect minha-rede

# Listar todas as redes
docker network ls

# Remover rede (requer que nenhum contêiner esteja conectado)
docker network rm minha-rede
```

---

## 📝 Exercícios de Fixação

### Módulo 06 — Exercício 1 e 2: Persistência com volume

```bash
# 1. Criar contêiner com volume
docker run -d \
  --name teste-volume \
  -v $(pwd)/meus-dados:/dados \
  alpine \
  sh -c "echo 'Persistido em $(date)' > /dados/registro.txt && sleep 600"

# 2. Verificar arquivo dentro do contêiner
docker exec teste-volume cat /dados/registro.txt

# 3. Remover o contêiner completamente
docker stop teste-volume && docker rm teste-volume

# 4. Verificar que o arquivo AINDA existe no host
cat ./meus-dados/registro.txt  # ✅ dados persistiram!
```

---

### Módulo 06 — Exercício 3: Por que volumes são essenciais em produção?

Contêineres são efêmeros — ao serem removidos, perdem tudo armazenado internamente. Em produção, isso seria catastrófico: um banco de dados sem volume perderia todos os dados a cada update da aplicação. Volumes permitem:

- **Sobrevivência a updates:** parar o contêiner antigo, subir o novo com a mesma imagem atualizada — os dados permanecem no volume
- **Backup direto:** a pasta mapeada no host pode ser incluída em rotinas de backup sem precisar acessar o Docker
- **Compartilhamento:** múltiplos contêineres podem montar o mesmo volume e compartilhar arquivos

---

### Módulo 07 — Exercício 1: Verificar conectividade

```bash
docker network create minha-rede
docker run -d --name c1 --network minha-rede alpine sleep 1000
docker run -d --name c2 --network minha-rede alpine sleep 1000

# Ping de c1 para c2 pelo NOME (resolução DNS interna do Docker)
docker exec -it c1 ping -c 4 c2
# Resultado esperado: 4 pacotes transmitidos, 0 perdidos
```

---

### Módulo 07 — Exercício 2 e 3: Função das redes e tipos

**Função das redes Docker:** Criar ambientes de comunicação isolados entre contêineres. Sem redes customizadas, a comunicação depende de IPs voláteis. Com redes nomeadas, serviços se enxergam pelo nome (DNS interno), garantindo configuração estável e segura.

**Tipos:** bridge (padrão, isolada no host), host (compartilha rede do host, sem isolamento), overlay (multi-host para clusters), none (sem rede).

---

## ✅ Checklist do Módulo

- [ ] Criou contêiner com volume bind mount
- [ ] Verificou que o arquivo persiste após remover o contêiner
- [ ] Consegue explicar por que volumes são essenciais em produção
- [ ] Criou rede personalizada com `docker network create`
- [ ] Conectou dois contêineres à mesma rede
- [ ] Testou conectividade com `ping` pelo nome do contêiner
- [ ] Consegue descrever os tipos bridge, host e overlay

---

## 🌐 Aplicabilidade

**Bancos de dados em produção:** MySQL, PostgreSQL e MongoDB sempre usam volumes nomeados — sem eles, qualquer restart do contêiner significaria perda total dos dados.

**Microsserviços:** Cada serviço roda em seu contêiner e se comunica com os demais pela rede interna, sem expor portas desnecessariamente para o host.

**Segurança:** Redes isoladas impedem que um contêiner comprometido alcance outros serviços fora da mesma rede.

---

> 📌 **Resumo:** Volumes salvam dados além da vida do contêiner. Redes permitem comunicação segura entre serviços pelo nome. Juntos, são os fundamentos de qualquer ambiente Docker em produção.

---

## 📦 Módulos da Trilha

| Módulo | Tema |
|--------|------|
| 01 | Introdução ao Docker |
| 02 | Compreendendo Contêineres e Imagens |
| 03 | Gerenciamento de Contêineres |
| 04 | Criando sua Primeira Imagem Docker |
| 05 | Dockerfile, docker-compose.yml e nginx.conf |
| **06 e 07** | **Volumes, Persistência de Dados e Redes** |
| 08 e 09 | Gerenciamento e Publicação de Imagens |
| 10 | Otimizando e Debugando Contêineres |