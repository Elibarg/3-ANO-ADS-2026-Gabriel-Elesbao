class HashAberto {
    constructor(tamanho = 10) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null); // cada posição: {chave, valor} ou null
        this.ocupados = 0;
    }

    hash(chave) {
        if (typeof chave === 'number') return chave % this.tamanho;
        let soma = 0;
        for (let i = 0; i < chave.length; i++) soma += chave.charCodeAt(i);
        return soma % this.tamanho;
    }

    inserir(chave, valor) {
        if (this.ocupados >= this.tamanho) {
            console.log('Tabela cheia!');
            return false;
        }
        let indice = this.hash(chave);
        while (this.tabela[indice] !== null && this.tabela[indice].chave !== chave) {
            indice = (indice + 1) % this.tamanho; // probing linear
        }
        if (this.tabela[indice] === null) {
            this.ocupados++;
        }
        this.tabela[indice] = { chave, valor };
        return true;
    }

    buscar(chave) {
        let indice = this.hash(chave);
        let tentativas = 0;
        while (this.tabela[indice] !== null && tentativas < this.tamanho) {
            if (this.tabela[indice].chave === chave) return this.tabela[indice].valor;
            indice = (indice + 1) % this.tamanho;
            tentativas++;
        }
        return null;
    }

    remover(chave) {
        // Para probing linear, remoção é mais complicada (marcar como deletado). Simplificaremos marcando null e reocupando depois? 
        // Para manter simples, não implementaremos remoção real neste exemplo.
        return false;
    }

    fatorCarga() {
        return this.ocupados / this.tamanho;
    }
}

// Teste
const hashAberto = new HashAberto(5);
hashAberto.inserir('a', 1);
hashAberto.inserir('b', 2);
hashAberto.inserir('c', 3);
hashAberto.inserir('d', 4);
hashAberto.inserir('e', 5);
console.log('Tentativa inserir f:', hashAberto.inserir('f', 6)); // false (cheia)
console.log('Buscar c:', hashAberto.buscar('c')); // 3
console.log('Fator de carga:', hashAberto.fatorCarga()); // 1