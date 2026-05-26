# ============================================================
# NGINX.CONF - Configura o servidor web e o proxy reverso
# ============================================================
# O Nginx fica "na frente" de tudo: recebe as requisições do usuário
# e decide o que fazer com cada uma — servir um arquivo ou redirecionar
# para outro serviço (proxy reverso).

# events → bloco obrigatório que configura como o Nginx gerencia conexões.
events {
    # worker_connections → número máximo de conexões simultâneas por processo.
    # 1024 é o padrão e suficiente para a maioria dos projetos.
    worker_connections 1024;
}

# http → bloco principal que configura o comportamento HTTP do Nginx.
http {

    # include → importa definições de tipos MIME (associa extensões a content-types).
    # Ex: .html → text/html, .js → application/javascript, .png → image/png
    include /etc/nginx/mime.types;

    # default_type → content-type padrão quando o arquivo não está no mime.types.
    default_type application/octet-stream;

    # sendfile → ativa envio eficiente de arquivos diretamente pelo kernel do SO.
    # Melhora muito a performance ao servir arquivos estáticos grandes.
    sendfile on;

    # keepalive_timeout → tempo (em segundos) que o Nginx mantém uma conexão aberta.
    # Evita o overhead de abrir uma nova conexão TCP para cada requisição.
    keepalive_timeout 65;

    # gzip → comprime as respostas antes de enviar ao navegador.
    # Reduz o tamanho dos arquivos transferidos (texto, JS, CSS chegam bem menores).
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # ── BLOCO DO SERVIDOR ────────────────────────────────────────
    # server → define um servidor virtual (como se fosse um "site" no Nginx).
    # Você pode ter vários blocos server para hospedar múltiplos sites.
    server {

        # listen → porta em que o Nginx vai escutar requisições HTTP.
        # A porta 80 é a porta padrão do protocolo HTTP.
        listen 80;

        # server_name → domínio ou IP que este servidor atende.
        # "localhost" = funciona localmente. Em produção: "meusite.com".
        server_name localhost;

        # ── LOCATION 1: arquivos estáticos (frontend) ───────────
        # location / → regra para TODAS as requisições que chegarem na raiz.
        # Qualquer URL que não bater em outra regra cai aqui.
        location / {
            # root → pasta dentro do contêiner onde os arquivos estáticos estão.
            # O Nginx vai procurar os arquivos a partir deste diretório.
            root /usr/share/nginx/html;

            # index → arquivo padrão servido quando a URL é uma pasta (/).
            # Sequência: tenta index.html, depois index.htm.
            index index.html index.htm;

            # try_files → tenta servir o arquivo/pasta solicitado.
            # $uri        → tenta o caminho exato (ex: /sobre.html)
            # $uri/       → tenta como diretório (ex: /sobre/)
            # /index.html → fallback: serve o index.html para qualquer rota não encontrada.
            # Essencial para aplicações de página única (SPA) como React e Vue.
            try_files $uri $uri/ /index.html;
        }

        # ── LOCATION 2: proxy reverso para a API (backend) ──────
        # location /api/ → regra específica para URLs que começam com /api/.
        # Ex: /api/usuarios, /api/produtos → vai para o backend Node.js.
        location /api/ {
            # proxy_pass → redireciona a requisição para outro serviço interno.
            # "web" é o nome do serviço Node.js definido no docker-compose.yml.
            # O Nginx faz a ponte entre o usuário e o backend sem o usuário saber.
            proxy_pass http://web:3000/;

            # proxy_set_header Host → repassa o cabeçalho Host original da requisição.
            # Necessário para o backend saber qual domínio foi acessado.
            proxy_set_header Host $host;

            # proxy_set_header X-Real-IP → repassa o IP real do cliente.
            # Sem isso, o backend receberia o IP do Nginx como origem.
            proxy_set_header X-Real-IP $remote_addr;

            # proxy_set_header X-Forwarded-For → lista de IPs que a requisição passou.
            # Padrão de mercado para rastrear o caminho da requisição.
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            # proxy_set_header X-Forwarded-Proto → informa o protocolo original (http/https).
            # O backend usa isso para saber se o usuário acessou via HTTP ou HTTPS.
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ── LOCATION 3: arquivos estáticos com cache agressivo ──
        # Otimização: imagens, fontes e scripts recebem cabeçalho de cache longo.
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
            root /usr/share/nginx/html;

            # expires → instrui o navegador a cachear estes arquivos por 30 dias.
            # Reduz drasticamente o número de requisições ao servidor.
            expires 30d;

            # add_header Cache-Control → reforça a política de cache no navegador.
            add_header Cache-Control "public, no-transform";
        }

        # ── PÁGINA DE ERRO CUSTOMIZADA ───────────────────────────
        # error_page → redireciona erros HTTP para uma página customizada.
        # Erros 500 502 503 504 = erros do servidor (backend fora do ar, etc.).
        error_page 500 502 503 504 /50x.html;

        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}