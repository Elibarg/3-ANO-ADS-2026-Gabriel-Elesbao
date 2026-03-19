// 7. Função de Hash Personalizada para Strings e Análise de Colisões

const TAMANHO_TABELA = 100;
const CONJUNTOS = {
    animais: ['cachorro', 'gato', 'elefante', 'leao', 'tigre', 'girafa', 'zebra', 'macaco', 'pato', 'galinha', 'vaca', 'cavalo', 'ovelha', 'peixe', 'tubarao'],
    frutas: ['banana', 'maca', 'laranja', 'uva', 'pera', 'abacaxi', 'manga', 'morango', 'kiwi', 'melancia', 'limao', 'cereja', 'pessego', 'goiaba', 'coco'],
    cores: ['vermelho', 'azul', 'verde', 'amarelo', 'roxo', 'laranja', 'rosa', 'marrom', 'cinza', 'preto', 'branco', 'bege', 'violeta', 'indigo', 'ouro']
};

// Função de hash personalizada: polinômio (base 31)
function hashPersonalizada(str, tamanho) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) % tamanho;
    }
    return hash;
}

// Função para testar distribuição
function testarDistribuicao(conjunto, nomeConjunto) {
    const indices = new Array(TAMANHO_TABELA).fill(0);
    for (let palavra of conjunto) {
        const idx = hashPersonalizada(palavra, TAMANHO_TABELA);
        indices[idx]++;
    }

    // Estatísticas
    const total = conjunto.length;
    const colisoes = indices.filter(v => v > 1).reduce((acc, v) => acc + (v - 1), 0);
    const percentualColisoes = (colisoes / total) * 100;
    const maxOcupado = Math.max(...indices);
    const posicoesOcupadas = indices.filter(v => v > 0).length;

    console.log(`\nConjunto: ${nomeConjunto} (${total} palavras)`);
    console.log(`  Índices gerados:`, indices.slice(0, 20).map((v,i) => v > 0 ? `${i}:${v}` : '').filter(Boolean).join(', ') + (indices.length>20?'...':''));
    console.log(`  Total de colisões (elementos extras): ${colisoes}`);
    console.log(`  Percentual de colisões: ${percentualColisoes.toFixed(2)}%`);
    console.log(`  Posições ocupadas: ${posicoesOcupadas} de ${TAMANHO_TABELA}`);
    console.log(`  Máximo de elementos em uma posição: ${maxOcupado}`);
}

// Executar testes
for (let [nome, conjunto] of Object.entries(CONJUNTOS)) {
    testarDistribuicao(conjunto, nome);
}

// Teste com um conjunto maior (gerado aleatoriamente)
function gerarPalavras(qtd) {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const palavras = [];
    for (let i = 0; i < qtd; i++) {
        let tam = Math.floor(Math.random() * 8) + 3; // 3 a 10 letras
        let palavra = '';
        for (let j = 0; j < tam; j++) {
            palavra += letras[Math.floor(Math.random() * letras.length)];
        }
        palavras.push(palavra);
    }
    return palavras;
}

const grandes = gerarPalavras(200);
testarDistribuicao(grandes, '200 palavras aleatórias');

// Sugestão de ajuste: testar com base 131 ou usando operações XOR.