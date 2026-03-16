class HashEncadeamento {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }

    hash(chave) {
        if (typeof chave === 'number') return chave % this.tamanho;
        // para string, usar soma dos códigos
        let soma = 0;
        for (let i = 0; i < chave.length; i++) soma += chave.charCodeAt(i);
        return soma % this.tamanho;
    }

    inserir(chave, valor) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];
        // Verifica se chave já existe
        for (let par of lista) {
            if (par.chave === chave) {
                par.valor = valor; // atualiza
                return;
            }
        }
        lista.push({ chave, valor });
    }

    buscar(chave) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];
        for (let par of lista) {
            if (par.chave === chave) return par.valor;
        }
        return null;
    }

    remover(chave) {
        const indice = this.hash(chave);
        const lista = this.tabela[indice];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].chave === chave) {
                lista.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // Para depuração
    exibir() {
        this.tabela.forEach((lista, i) => {
            console.log(`${i}:`, lista.map(p => `(${p.chave}:${p.valor})`).join(' '));
        });
    }
}

// Teste
const hashEnc = new HashEncadeamento(5);
hashEnc.inserir('nome', 'João');
hashEnc.inserir('idade', 30);
hashEnc.inserir('cidade', 'São Paulo');
console.log('Buscar nome:', hashEnc.buscar('nome')); // João
hashEnc.remover('idade');
console.log('Buscar idade:', hashEnc.buscar('idade')); // null
hashEnc.exibir();