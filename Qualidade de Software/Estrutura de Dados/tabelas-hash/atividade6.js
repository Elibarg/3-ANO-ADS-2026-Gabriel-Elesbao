// 6. Análise de Desempenho: diferentes tamanhos de tabela

const NUM_ELEMENTOS = 500;
const TAMANHOS = [50, 100, 250];
const BUSCAS = 1000; // número de buscas para medir tempo médio

// Função hash simples (para inteiros)
function hash(key, tamanho) {
    return key % tamanho;
}

// Tabela com encadeamento (para teste)
class HashTeste {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }
    inserir(key, value) {
        const idx = hash(key, this.tamanho);
        this.tabela[idx].push({ key, value });
    }
    buscar(key) {
        const idx = hash(key, this.tamanho);
        const lista = this.tabela[idx];
        for (let p of lista) if (p.key === key) return p.value;
        return null;
    }
    remover(key) {
        const idx = hash(key, this.tamanho);
        const lista = this.tabela[idx];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].key === key) {
                lista.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

// Função para medir tempo médio de busca e remoção
function analisarDesempenho() {
    console.log(`Inserindo ${NUM_ELEMENTOS} elementos...`);
    for (let tamanho of TAMANHOS) {
        const hashTable = new HashTeste(tamanho);

        // Inserir 500 elementos
        for (let i = 0; i < NUM_ELEMENTOS; i++) {
            hashTable.inserir(i, `valor${i}`);
        }

        // Medir tempo de busca
        const inicioBusca = performance.now();
        for (let i = 0; i < BUSCAS; i++) {
            const chave = Math.floor(Math.random() * NUM_ELEMENTOS);
            hashTable.buscar(chave);
        }
        const fimBusca = performance.now();
        const tempoBusca = (fimBusca - inicioBusca) / BUSCAS; // tempo médio por busca

        // Medir tempo de remoção (remove aleatório)
        const inicioRemocao = performance.now();
        for (let i = 0; i < 100; i++) { // remove 100 elementos
            const chave = Math.floor(Math.random() * NUM_ELEMENTOS);
            hashTable.remover(chave);
        }
        const fimRemocao = performance.now();
        const tempoRemocao = (fimRemocao - inicioRemocao) / 100;

        console.log(`\nTamanho da tabela: ${tamanho}`);
        console.log(`  Tempo médio de busca (${BUSCAS} buscas): ${tempoBusca.toFixed(4)} ms`);
        console.log(`  Tempo médio de remoção (100 remoções): ${tempoRemocao.toFixed(4)} ms`);
    }
}

analisarDesempenho();