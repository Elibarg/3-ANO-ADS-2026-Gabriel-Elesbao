// Função para gerar chaves aleatórias (números)
function gerarChaves(quantidade, max = 1000) {
    const chaves = [];
    for (let i = 0; i < quantidade; i++) {
        chaves.push(Math.floor(Math.random() * max));
    }
    return chaves;
}

// Medir tempo médio de inserção e busca
function compararDesempenho(tamanhoTabela = 100, numOperacoes = 1000) {
    const chaves = gerarChaves(numOperacoes, 5000);

    // Encadeamento
    const hashEnc = new HashEncadeamento(tamanhoTabela);
    console.time('Encadeamento - inserções');
    chaves.forEach((chave, i) => hashEnc.inserir(chave, `valor${i}`));
    console.timeEnd('Encadeamento - inserções');

    console.time('Encadeamento - buscas');
    chaves.forEach(chave => hashEnc.buscar(chave));
    console.timeEnd('Encadeamento - buscas');

    // Endereçamento aberto (probing linear)
    const hashAberto = new HashAberto(tamanhoTabela);
    console.time('Aberto - inserções');
    chaves.forEach((chave, i) => hashAberto.inserir(chave, `valor${i}`));
    console.timeEnd('Aberto - inserções');

    console.time('Aberto - buscas');
    chaves.forEach(chave => hashAberto.buscar(chave));
    console.timeEnd('Aberto - buscas');
}

// Chamar a comparação com load factor ~0.75 (tamanhoTabela = 1333 para 1000 inserções)
// Mas para teste rápido, use tamanho 100 e 75 inserções:
function comparar() {
    compararDesempenho(100, 75);
}

comparar();
// Os resultados variam. Normalmente encadeamento é mais rápido quando o fator de carga é alto.