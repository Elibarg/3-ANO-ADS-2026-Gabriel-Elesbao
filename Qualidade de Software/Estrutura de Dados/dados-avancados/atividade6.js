// atividade6.js – Simulação de índice de banco de dados usando árvore B

class Registro {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

class IndiceBTree {
    constructor(ordem) {
        this.ordem = ordem;
        this.raiz = null;
    }

    // Inserção simplificada (apenas para demonstração)
    inserir(chave, registro) {
        if (!this.raiz) {
            this.raiz = { chaves: [chave], registros: [registro], filhos: [] };
            return;
        }
        // Simula inserção percorrendo até folha
        let no = this.raiz;
        while (no.filhos.length > 0) {
            let i = 0;
            while (i < no.chaves.length && chave > no.chaves[i]) i++;
            no = no.filhos[i];
        }
        // Insere na folha
        let i = 0;
        while (i < no.chaves.length && chave > no.chaves[i]) i++;
        no.chaves.splice(i, 0, chave);
        no.registros.splice(i, 0, registro);
        console.log(`Registro ID ${chave} inserido no índice.`);
    }

    buscar(chave) {
        if (!this.raiz) return null;
        let no = this.raiz;
        while (no.filhos.length > 0) {
            let i = 0;
            while (i < no.chaves.length && chave > no.chaves[i]) i++;
            no = no.filhos[i];
        }
        const idx = no.chaves.indexOf(chave);
        return idx !== -1 ? no.registros[idx] : null;
    }
}

// Simulação
const indice = new IndiceBTree(3);
const registros = [
    new Registro(10, 'João'),
    new Registro(20, 'Maria'),
    new Registro(5, 'Pedro'),
    new Registro(15, 'Ana'),
    new Registro(30, 'Carlos')
];

console.log('Inserindo registros no índice...');
registros.forEach(r => indice.inserir(r.id, r));

console.log('\nBuscando registros:');
console.log('ID 15:', indice.buscar(15));
console.log('ID 99:', indice.buscar(99));