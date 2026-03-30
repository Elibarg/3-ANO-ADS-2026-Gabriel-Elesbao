// 5. Dicionário com Tabela Hash (encadeamento)

class Dicionario {
    constructor(tamanho = 26) { // tamanho baseado em letras
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho).fill(null).map(() => []);
    }

    // Função hash para strings (soma ASCII)
    _hash(palavra) {
        let soma = 0;
        for (let i = 0; i < palavra.length; i++) {
            soma += palavra.charCodeAt(i);
        }
        return soma % this.tamanho;
    }

    // Adicionar ou atualizar palavra e significado
    adicionar(palavra, significado) {
        const idx = this._hash(palavra);
        const lista = this.tabela[idx];
        for (let item of lista) {
            if (item.palavra === palavra) {
                item.significado = significado;
                return;
            }
        }
        lista.push({ palavra, significado });
    }

    // Buscar significado
    buscar(palavra) {
        const idx = this._hash(palavra);
        const lista = this.tabela[idx];
        for (let item of lista) {
            if (item.palavra === palavra) return item.significado;
        }
        return null; // não encontrada
    }

    // Remover palavra
    remover(palavra) {
        const idx = this._hash(palavra);
        const lista = this.tabela[idx];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].palavra === palavra) {
                lista.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    // Exibir todas as palavras (para teste)
    listar() {
        for (let i = 0; i < this.tamanho; i++) {
            if (this.tabela[i].length > 0) {
                console.log(`[${i}] ->`, this.tabela[i].map(item => `${item.palavra}: "${item.significado}"`).join(', '));
            }
        }
    }
}

// Teste
const dict = new Dicionario();
dict.adicionar('casa', 'Local de moradia');
dict.adicionar('carro', 'Veículo automotor');
dict.adicionar('arvore', 'Planta de grande porte');
dict.adicionar('bola', 'Objeto esférico usado em esportes');
dict.adicionar('dado', 'Objeto cúbico com números nas faces');

console.log('Dicionário:');
dict.listar();

console.log('\nBuscar "casa":', dict.buscar('casa'));
console.log('Buscar "mesa":', dict.buscar('mesa')); // null

dict.remover('carro');
console.log('\nApós remover "carro":');
dict.listar();