# ── EXERCÍCIO 1: Criar contêiner com volume para persistência ──
 
# Cria o diretório local que será o volume no host
mkdir -p ./meus-dados
 
# docker run → cria e executa um contêiner
# -d           → detached: roda em segundo plano (não trava o terminal)
# --name       → dá um nome fixo ao contêiner para facilitar referenciá-lo
# -v           → monta um volume no formato "CAMINHO_HOST:CAMINHO_CONTÊINER"
#                $(pwd)/meus-dados → pasta atual no host
#                /dados            → caminho dentro do contêiner onde ela aparece
# alpine       → imagem base ultra-leve (~7MB), ideal para testes
# sh -c "..."  → executa um comando shell ao iniciar o contêiner
#   echo "..." → escreve o conteúdo no arquivo (criando-o se não existir)
#   && sleep   → mantém o contêiner vivo por 600 segundos (10 min) para teste
 
docker run -d \
  --name conteiner-volume \
  -v $(pwd)/meus-dados:/dados \
  alpine \
  sh -c "echo 'Dado importante salvo em $(date)' > /dados/registro.txt && sleep 600"
 
# Verifica que o arquivo foi criado DENTRO do contêiner
docker exec conteiner-volume cat /dados/registro.txt
 
# Verifica que o arquivo existe NO HOST (fora do contêiner)
# Prova que o volume está funcionando: o arquivo existe nos dois lados
cat ./meus-dados/registro.txt
 
 
# ── EXERCÍCIO 2: Remover contêiner e verificar persistência ──
 
# docker stop → envia sinal SIGTERM para parar o contêiner graciosamente
# Equivalente a pedir para o processo se encerrar de forma limpa
docker stop conteiner-volume
 
# docker rm → remove o contêiner parado do sistema
# O contêiner some, mas o VOLUME (pasta no host) permanece intacto
docker rm conteiner-volume
 
# docker ps -a → lista TODOS os contêineres (incluindo os parados e removidos)
# -a = --all: sem esse flag, só mostra os que estão rodando
# Resultado esperado: "conteiner-volume" NÃO deve aparecer mais
docker ps -a
 
# Verifica que os dados AINDA existem no host mesmo após remover o contêiner
# Esse é o ponto central dos volumes: dados sobrevivem ao contêiner
cat ./meus-dados/registro.txt
 
# Conclusão esperada: o arquivo registro.txt continua existindo no host
# mesmo com o contêiner completamente removido
 
 
# ==============================================================
# MÓDULO 07 — REDES NO DOCKER
# ==============================================================
 
# ── EXERCÍCIO 1: Criar rede, subir contêineres e verificar conectividade ──
 
# docker network create → cria uma rede virtual isolada no Docker
# --driver bridge       → tipo de rede (bridge = padrão, isola do host mas
#                         permite comunicação entre contêineres conectados)
# minha-rede            → nome dado à rede criada
docker network create --driver bridge minha-rede
 
# Sobe o primeiro contêiner conectado à rede customizada
# -d              → roda em segundo plano
# --name          → nome do contêiner (usado como "hostname" dentro da rede)
# --network       → conecta à rede "minha-rede" que acabamos de criar
# alpine          → imagem base
# sleep 1000      → mantém o contêiner vivo sem fazer nada (para testes)
docker run -d --name container1 --network minha-rede alpine sleep 1000
 
# Sobe o segundo contêiner na mesma rede
docker run -d --name container2 --network minha-rede alpine sleep 1000
 
# docker exec → executa um comando dentro de um contêiner já em execução
# -it          → modo interativo com terminal (necessário para comandos que
#                esperam entrada ou exibem output em tempo real)
# container1   → nome do contêiner onde o comando será executado
# ping -c 4    → envia 4 pacotes ICMP para testar conectividade
# container2   → resolve para o IP do container2 automaticamente pela rede Docker
#                Prova que contêineres se comunicam pelo NOME, não por IP
docker exec -it container1 ping -c 4 container2
 
# docker network inspect → exibe detalhes completos de uma rede
# Mostra: quais contêineres estão conectados, seus IPs, gateway, etc.
docker network inspect minha-rede
 
# Limpeza: para e remove os contêineres de teste
docker stop container1 container2
docker rm container1 container2
 
# docker network rm → remove a rede criada (só funciona se nenhum contêiner
# estiver conectado a ela)
docker network rm minha-rede