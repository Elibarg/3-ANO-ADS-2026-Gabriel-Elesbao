// 4. Comparação de desempenho entre Encadeamento e Probing Linear

const TAMANHO_TABELA = 100;
const NUM_OPERACOES = 1000;

// Função hash simples
function hashSimples(key, tamanho) {
    return key % tamanho;
}

// --- Encadeamento ---
class HashEncadeamento {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }
    _hash(key) { return hashSimples(key, this.tamanho); }
    inserir(key, value) {
        const idx = this._hash(key);
        const lista = this.tabela[idx];
        for (let p of lista) if (p.key === key) { p.value = value; return; }
        lista.push({ key, value });
    }
    buscar(key) {
        const lista = this.tabela[this._hash(key)];
        for (let p of lista) if (p.key === key) return p.value;
        return null;
    }
}

// --- Probing Linear ---
class HashProbing {
    constructor(tamanho) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null);
    }
    _hash(key) { return hashSimples(key, this.tamanho); }
    inserir(key, value) {
        let idx = this._hash(key);
        const inicio = idx;
        while (this.tabela[idx] !== null) {
            if (this.tabela[idx] && this.tabela[idx].key === key) {
                this.tabela[idx].value = value;
                return;
            }
            idx = (idx + 1) % this.tamanho;
            if (idx === inicio) throw new Error('Cheia');
        }
        this.tabela[idx] = { key, value };
    }
    buscar(key) {
        let idx = this._hash(key);
        const inicio = idx;
        while (this.tabela[idx] !== null) {
            if (this.tabela[idx] && this.tabela[idx].key === key) return this.tabela[idx].value;
            idx = (idx + 1) % this.tamanho;
            if (idx === inicio) break;
        }
        return null;
    }
}

// Função para medir tempo médio
function compararDesempenho() {
    const loadFactor = 0.75;
    const elementosInserir = Math.floor(TAMANHO_TABELA * loadFactor); // ~75 elementos

    console.log(`Tamanho da tabela: ${TAMANHO_TABELA}`);
    console.log(`Número de inserções: ${elementosInserir}`);
    console.log(`Número de buscas: ${NUM_OPERACOES}`);

    // Encadeamento
    const hashEnc = new HashEncadeamento(TAMANHO_TABELA);
    let inicio = performance.now();
    for (let i = 0; i < elementosInserir; i++) {
        hashEnc.inserir(i, `valor${i}`);
    }
    for (let i = 0; i < NUM_OPERACOES; i++) {
        const chave = Math.floor(Math.random() * elementosInserir);
        hashEnc.buscar(chave);
    }
    let fim = performance.now();
    const tempoEnc = fim - inicio;

    // Probing Linear
    const hashProb = new HashProbing(TAMANHO_TABELA);
    inicio = performance.now();
    for (let i = 0; i < elementosInserir; i++) {
        hashProb.inserir(i, `valor${i}`);
    }
    for (let i = 0; i < NUM_OPERACOES; i++) {
        const chave = Math.floor(Math.random() * elementosInserir);
        hashProb.buscar(chave);
    }
    fim = performance.now();
    const tempoProb = fim - inicio;

    console.log(`Tempo Encadeamento: ${tempoEnc.toFixed(2)} ms`);
    console.log(`Tempo Probing Linear: ${tempoProb.toFixed(2)} ms`);
}

compararDesempenho();