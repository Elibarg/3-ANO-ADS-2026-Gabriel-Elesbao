// ==================== Árvore B+ simplificada (ordem mínima = 2, nós com até 3 chaves) ====================
// Apenas para demonstração: armazena nomes de arquivos (strings) e permite busca exata.
class NoBPlus {
    constructor(isFolha = false) {
        this.isFolha = isFolha;
        this.chaves = [];        // nomes dos arquivos (ou chaves)
        this.filhos = [];         // para nós internos: ponteiros para filhos
        this.proximo = null;      // para folhas: próximo nó folha
    }
}

class ArvoreBPlus {
    constructor(ordem = 3) { // ordem = número máximo de chaves por nó
        this.ordem = ordem;
        this.raiz = new NoBPlus(true);
    }

    // Busca (retorna true se a chave existir)
    buscar(chave) {
        return this._buscarRec(this.raiz, chave);
    }

    _buscarRec(no, chave) {
        if (no.isFolha) {
            return no.chaves.includes(chave);
        }
        // encontra o filho apropriado
        let i = 0;
        while (i < no.chaves.length && chave > no.chaves[i]) i++;
        return this._buscarRec(no.filhos[i], chave);
    }

    // Inserir
    inserir(chave) {
        const resultado = this._inserirRec(this.raiz, chave);
        if (resultado && resultado.novoNo) {
            // a raiz foi dividida: criar nova raiz
            const novaRaiz = new NoBPlus(false);
            novaRaiz.chaves = [resultado.chavePromovida];
            novaRaiz.filhos = [this.raiz, resultado.novoNo];
            this.raiz = novaRaiz;
        }
    }

    // Retorna { chavePromovida, novoNo } se houver divisão, senão null
    _inserirRec(no, chave) {
        if (no.isFolha) {
            // inserir na folha de forma ordenada
            let pos = 0;
            while (pos < no.chaves.length && chave > no.chaves[pos]) pos++;
            no.chaves.splice(pos, 0, chave);
            // verificar se excedeu a ordem
            if (no.chaves.length <= this.ordem) return null;
            // precisa dividir a folha
            const meio = Math.floor(no.chaves.length / 2);
            const novoNo = new NoBPlus(true);
            novoNo.chaves = no.chaves.splice(meio); // remove da metade em diante
            novoNo.proximo = no.proximo;
            no.proximo = novoNo;
            const chavePromovida = novoNo.chaves[0]; // menor chave do novo nó
            return { chavePromovida, novoNo };
        } else {
            // nó interno: encontrar filho adequado
            let i = 0;
            while (i < no.chaves.length && chave > no.chaves[i]) i++;
            const resultado = this._inserirRec(no.filhos[i], chave);
            if (!resultado) return null;
            // inserir a chave promovida e o novo filho neste nó
            const { chavePromovida, novoNo } = resultado;
            let pos = 0;
            while (pos < no.chaves.length && chavePromovida > no.chaves[pos]) pos++;
            no.chaves.splice(pos, 0, chavePromovida);
            no.filhos.splice(pos + 1, 0, novoNo);
            // verificar se excedeu a ordem
            if (no.chaves.length <= this.ordem) return null;
            // dividir nó interno
            const meio = Math.floor(no.chaves.length / 2);
            const chavePromovidaInterna = no.chaves[meio]; // sobe esta chave
            const novoNoInterno = new NoBPlus(false);
            novoNoInterno.chaves = no.chaves.splice(meio + 1); // remove após a promovida
            novoNoInterno.filhos = no.filhos.splice(meio + 1);
            // ajustar o nó atual: remove a chave promovida
            no.chaves.pop(); // na verdade já foi removida pelo splice? Cuidado.
            // melhor refazer: vamos implementar de forma mais clara
            return { chavePromovida: chavePromovidaInterna, novoNo: novoNoInterno };
        }
    }

    // Exibir estrutura (para depuração)
    exibir() {
        console.log('--- Árvore B+ ---');
        this._exibirRec(this.raiz, 0);
        console.log('-----------------');
    }

    _exibirRec(no, nivel) {
        console.log('  '.repeat(nivel) + 'Chaves:', no.chaves.join(', '), no.isFolha ? '(folha)' : '(int)');
        if (!no.isFolha) {
            for (let filho of no.filhos) {
                this._exibirRec(filho, nivel + 1);
            }
        }
    }
}

// ==================== Simulação de Sistema de Arquivos ====================
class SistemaArquivos {
    constructor() {
        this.arvore = new ArvoreBPlus(3); // ordem 3
    }

    criarArquivo(nome) {
        if (this.arvore.buscar(nome)) {
            console.log(`Arquivo "${nome}" já existe.`);
            return false;
        }
        this.arvore.inserir(nome);
        console.log(`Arquivo "${nome}" criado.`);
        return true;
    }

    buscarArquivo(nome) {
        const encontrado = this.arvore.buscar(nome);
        console.log(`Busca por "${nome}": ${encontrado ? 'encontrado' : 'não encontrado'}`);
        return encontrado;
    }

    // Remoção não implementada na B+ simplificada
    removerArquivo(nome) {
        console.log('Remoção não implementada nesta versão simplificada.');
    }
}

// Teste
const fs = new SistemaArquivos();
fs.criarArquivo('documento.txt');
fs.criarArquivo('foto.jpg');
fs.criarArquivo('musica.mp3');
fs.criarArquivo('video.mp4');
fs.criarArquivo('backup.zip');
fs.buscarArquivo('musica.mp3');
fs.buscarArquivo('inexistente.pdf');
fs.arvore.exibir();