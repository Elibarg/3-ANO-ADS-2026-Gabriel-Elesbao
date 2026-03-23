// 2. Tabela Hash com Encadeamento

class TabelaHashEncadeamento {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }

    // Função hash simples (para inteiros)
    _hash(key) {
        return key % this.tamanho;
    }

    // Inserir par (chave, valor)
    inserir(key, value) {
        const index = this._hash(key);
        const lista = this.tabela[index];
        // Verifica se a chave já existe e atualiza
        for (let par of lista) {
            if (par.key === key) {
                par.value = value;
                return;
            }
        }
        lista.push({ key, value });
    }

    // Buscar valor por chave
    buscar(key) {
        const index = this._hash(key);
        const lista = this.tabela[index];
        for (let par of lista) {
            if (par.key === key) return par.value;
        }
        return null; // não encontrado
    }

    // Remover elemento por chave
    remover(key) {
        const index = this._hash(key);
        const lista = this.tabela[index];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].key === key) {
                lista.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // Exibir conteúdo da tabela
    exibir() {
        for (let i = 0; i < this.tamanho; i++) {
            if (this.tabela[i].length > 0) {
                console.log(`[${i}] ->`, this.tabela[i].map(p => `(${p.key}:${p.value})`).join(' '));
            } else {
                console.log(`[${i}] -> vazio`);
            }
        }
    }
}

// Testes
const hashEnc = new TabelaHashEncadeamento();
hashEnc.inserir(15, 'quinze');
hashEnc.inserir(25, 'vinte e cinco');
hashEnc.inserir(35, 'trinta e cinco');
hashEnc.inserir(45, 'quarenta e cinco');
hashEnc.inserir(5, 'cinco'); // colide com 15 (15%10 =5, 5%10=5)
hashEnc.exibir();

console.log('\nBuscar 25:', hashEnc.buscar(25)); // vinte e cinco
console.log('Buscar 99:', hashEnc.buscar(99));   // null

hashEnc.remover(15);
console.log('\nApós remover 15:');
hashEnc.exibir();