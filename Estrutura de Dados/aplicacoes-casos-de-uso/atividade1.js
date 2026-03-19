/**
 * Fila de Impressão
 * Gerencia documentos em ordem de chegada (FIFO).
 * Permite adicionar documentos e imprimir (remover) o mais antigo.
 */

class FilaImpressao {
    constructor() {
        this.fila = [];
    }

    // Adiciona um documento ao final da fila
    adicionarDocumento(documento) {
        this.fila.push(documento);
        console.log(`Documento "${documento}" adicionado à fila.`);
    }

    // Remove e imprime o documento mais antigo (início da fila)
    imprimir() {
        if (this.fila.length === 0) {
            console.log("Nenhum documento na fila.");
            return null;
        }
        const documento = this.fila.shift(); // remove o primeiro
        console.log(`Imprimindo: "${documento}"`);
        return documento;
    }

    // Exibe o estado atual da fila
    exibirFila() {
        console.log("Fila atual:", this.fila.join(" -> ") || "vazia");
    }
}

// Teste
const fila = new FilaImpressao();
fila.adicionarDocumento("relatorio.pdf");
fila.adicionarDocumento("contrato.docx");
fila.adicionarDocumento("foto.png");
fila.exibirFila();
fila.imprimir();
fila.exibirFila();
fila.imprimir();
fila.imprimir();
fila.imprimir(); // fila vazia