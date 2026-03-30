// 3. Tabela Hash com Endereçamento Aberto (Probing Linear)

class TabelaHashProbing {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null); // cada posição: null ou {key, value}
    }

    _hash(key) {
        return key % this.tamanho;
    }

    inserir(key, value) {
        let index = this._hash(key);
        const inicio = index;
        while (this.tabela[index] !== null) {
            // Se a chave já existe, atualiza
            if (this.tabela[index] && this.tabela[index].key === key) {
                this.tabela[index].value = value;
                return;
            }
            index = (index + 1) % this.tamanho;
            if (index === inicio) {
                throw new Error('Tabela hash cheia');
            }
        }
        this.tabela[index] = { key, value };
    }

    buscar(key) {
        let index = this._hash(key);
        const inicio = index;
        while (this.tabela[index] !== null) {
            if (this.tabela[index] && this.tabela[index].key === key) {
                return this.tabela[index].value;
            }
            index = (index + 1) % this.tamanho;
            if (index === inicio) break;
        }
        return null;
    }

    remover(key) {
        // Remoção com lazy deletion (marca como null)
        let index = this._hash(key);
        const inicio = index;
        while (this.tabela[index] !== null) {
            if (this.tabela[index] && this.tabela[index].key === key) {
                this.tabela[index] = null;
                return true;
            }
            index = (index + 1) % this.tamanho;
            if (index === inicio) break;
        }
        return false;
    }

    exibir() {
        for (let i = 0; i < this.tamanho; i++) {
            if (this.tabela[i] !== null) {
                console.log(`[${i}] -> (${this.tabela[i].key}:${this.tabela[i].value})`);
            } else {
                console.log(`[${i}] -> vazio`);
            }
        }
    }
}

// Testes
const hashProb = new TabelaHashProbing(10);
hashProb.inserir(15, 'quinze');
hashProb.inserir(25, 'vinte e cinco');
hashProb.inserir(35, 'trinta e cinco');
hashProb.inserir(45, 'quarenta e cinco');
hashProb.inserir(5, 'cinco'); // colide e vai para próximo livre
hashProb.exibir();

console.log('\nBuscar 25:', hashProb.buscar(25));
console.log('Buscar 99:', hashProb.buscar(99));

hashProb.remover(15);
console.log('\nApós remover 15 (lazy deletion):');
hashProb.exibir();