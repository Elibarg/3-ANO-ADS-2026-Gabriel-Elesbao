// Função para medir tempo médio de busca e remoção
function analisarDesempenho(tamanhos, numElementos = 500) {
    const chaves = gerarChaves(numElementos, 10000);

    for (let tam of tamanhos) {
        console.log(`\n--- Tamanho da tabela: ${tam} ---`);
        const hash = new HashEncadeamento(tam);

        // Inserir todos
        console.time(`Inserir ${numElementos} elementos`);
        chaves.forEach((chave, i) => hash.inserir(chave, `v${i}`));
        console.timeEnd(`Inserir ${numElementos} elementos`);

        // Buscar todos (sucesso)
        console.time(`Buscar ${numElementos} elementos`);
        chaves.forEach(chave => hash.buscar(chave));
        console.timeEnd(`Buscar ${numElementos} elementos`);

        // Remover metade (aleatório)
        const metade = Math.floor(numElementos / 2);
        console.time(`Remover ${metade} elementos`);
        for (let i = 0; i < metade; i++) {
            hash.remover(chaves[i]);
        }
        console.timeEnd(`Remover ${metade} elementos`);

        console.log(`Fator de carga após inserções: ${numElementos / tam}`);
    }
}

// Executar análise
analisarDesempenho([50, 100, 250], 500);