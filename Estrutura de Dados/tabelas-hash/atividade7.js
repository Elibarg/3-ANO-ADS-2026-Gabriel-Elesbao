// Função de hash que distribui uniformemente para tabela tamanho 100
function hashPersonalizada(str, tamanho = 100) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) % tamanho; // polinômio com primo 31
    }
    return hash;
}

// Testar distribuição
function testarDistribuicao(listaStrings, tamanho = 100) {
    const contador = new Array(tamanho).fill(0);
    listaStrings.forEach(s => {
        const idx = hashPersonalizada(s, tamanho);
        contador[idx]++;
    });

    // Estatísticas simples
    const ocupados = contador.filter(v => v > 0).length;
    const max = Math.max(...contador);
    const min = Math.min(...contador.filter(v => v > 0));
    const media = listaStrings.length / ocupados;
    const colisoes = listaStrings.length - ocupados; // cada índice ocupado tem pelo menos 1, o resto são colisões adicionais

    console.log(`Tamanho tabela: ${tamanho}`);
    console.log(`Índices ocupados: ${ocupados} de ${tamanho}`);
    console.log(`Máximo elementos por índice: ${max}`);
    console.log(`Mínimo elementos por índice (não zero): ${min}`);
    console.log(`Média elementos por índice ocupado: ${media.toFixed(2)}`);
    console.log(`Total de elementos: ${listaStrings.length}`);
    console.log(`Colisões totais (elementos - índices ocupados): ${colisoes}`);
    // Mostrar distribuição (compacta)
    console.log('Distribuição (primeiros 20 índices):', contador.slice(0,20));
}

// Gerar 500 strings aleatórias
function gerarStrings(quantidade, tamMin = 3, tamMax = 10) {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const palavras = [];
    for (let i = 0; i < quantidade; i++) {
        let len = Math.floor(Math.random() * (tamMax - tamMin + 1)) + tamMin;
        let palavra = '';
        for (let j = 0; j < len; j++) {
            palavra += letras[Math.floor(Math.random() * letras.length)];
        }
        palavras.push(palavra);
    }
    return palavras;
}

const palavrasTeste = gerarStrings(500);
testarDistribuicao(palavrasTeste, 100);
// Para melhorar a distribuição, ajustar o multiplicador (ex: 31) e garantir que o módulo seja um número primo.