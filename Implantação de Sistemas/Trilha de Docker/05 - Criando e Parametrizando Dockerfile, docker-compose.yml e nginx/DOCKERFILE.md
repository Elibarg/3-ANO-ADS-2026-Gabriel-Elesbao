# ============================================================
# DOCKERFILE - Define como a imagem da aplicação é construída
# ============================================================

# FROM → define a imagem base que será usada como ponto de partida.
# Aqui usamos o Node.js versão 18 com sistema Alpine (bem leve, ~50MB).
# Formato: FROM imagem:versão
FROM node:18-alpine

# LABEL → metadados opcionais da imagem (autor, descrição, versão).
# Não afeta o funcionamento, mas é boa prática de documentação.
LABEL maintainer="Akira <akira@unisenai.com>"
LABEL description="Aplicação Node.js simples containerizada"
LABEL version="1.0"

# WORKDIR → define o diretório de trabalho DENTRO do contêiner.
# Todos os comandos seguintes (COPY, RUN, CMD) serão executados a partir daqui.
# Se o diretório não existir, o Docker cria automaticamente.
WORKDIR /app

# COPY package*.json ./ → copia APENAS os arquivos de dependências primeiro.
# Isso aproveita o cache de camadas do Docker: se o package.json não mudar,
# o Docker reutiliza a camada instalada, tornando o build muito mais rápido.
# Formato: COPY <origem_no_host> <destino_no_contêiner>
COPY package*.json ./

# RUN → executa comandos durante a CONSTRUÇÃO da imagem (não na execução).
# Aqui instalamos as dependências do Node.js listadas no package.json.
# O flag --production evita instalar pacotes de desenvolvimento (devDependencies).
RUN npm install --production

# COPY . . → copia todo o restante do código-fonte para dentro do contêiner.
# O primeiro "." é a pasta atual do host, o segundo "." é o WORKDIR (/app).
# Feito APÓS o npm install para não invalidar o cache desnecessariamente.
COPY . .

# EXPOSE → documenta qual porta a aplicação vai escutar dentro do contêiner.
# ATENÇÃO: isso é apenas informativo! Não publica a porta automaticamente.
# A publicação real acontece no docker-compose.yml (ports) ou no docker run (-p).
EXPOSE 3000

# ENV → define variáveis de ambiente disponíveis em tempo de execução.
# NODE_ENV=production ativa otimizações de performance no Node.js.
ENV NODE_ENV=production

# CMD → comando executado quando o CONTÊINER INICIA (não durante o build).
# Diferente do RUN, o CMD é executado toda vez que o contêiner sobe.
# Formato preferido: array JSON ["executável", "argumento1", "argumento2"]
CMD ["node", "server.js"]