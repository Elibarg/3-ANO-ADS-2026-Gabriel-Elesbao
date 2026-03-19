// ======================================================
// ATIVIDADE 5 - DESAFIO DE ESTABILIDADE (Módulo 07)
// ======================================================
// Objetivo: Mostrar a diferença entre algoritmo estável e não estável
// Usamos objetos com chave repetida (nota = 85) para comprovar

class Aluno {
    constructor(id, nome, nota) {
        this.id = id;      // identificador único para provar ordem original
        this.nome = nome;
        this.nota = nota;
    }
}

// Dados de teste (duas alunas com mesma nota)
const turma = [
    new Aluno(1, "Ana",     85),
    new Aluno(2, "Bruno",   70),
    new Aluno(3, "Carlos",  92),
    new Aluno(4, "Diana",   85),   // mesma nota da Ana
    new Aluno(5, "Eduardo", 78)
];

console.log("=== TURMA ORIGINAL (ordem de inscrição) ===");
turma.forEach(a => console.log(`ID:${a.id} | ${a.nome} → ${a.nota}`));

// ===================== SELECTION SORT (NÃO ESTÁVEL) =====================
function selectionSortNaoEstavel(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j].nota < arr[minIdx].nota) {
                minIdx = j;
            }
        }
        // Troca (pode inverter ordem de elementos iguais!)
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}

const turmaSelection = [...turma];           // cópia
selectionSortNaoEstavel(turmaSelection);

console.log("\n=== DEPOIS DO SELECTION SORT (NÃO ESTÁVEL) ===");
turmaSelection.forEach(a => console.log(`ID:${a.id} | ${a.nome} → ${a.nota}`));
console.log("→ Diana (ID 4) apareceu ANTES da Ana (ID 1) mesmo tendo entrado depois!");
console.log("→ Conclusão: Selection Sort **NÃO é estável**");

// ===================== INSERTION SORT (ESTÁVEL) =====================
function insertionSortEstavel(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        // Só move enquanto for maior (mantém ordem relativa dos iguais)
        while (j >= 0 && arr[j].nota > key.nota) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

const turmaInsertion = [...turma];
insertionSortEstavel(turmaInsertion);

console.log("\n=== DEPOIS DO INSERTION SORT (ESTÁVEL) ===");
turmaInsertion.forEach(a => console.log(`ID:${a.id} | ${a.nome} → ${a.nota}`));
console.log("→ Ana (ID 1) continuou ANTES da Diana (ID 4) → ordem relativa preservada!");
console.log("→ Conclusão: Insertion Sort **É estável**");

// ===================== FUNÇÃO AUXILIAR DE VERIFICAÇÃO =====================
function verificarEstabilidade(arrOrdenado, original) {
    const mapa = new Map();
    original.forEach(aluno => mapa.set(aluno.nome, aluno.id));

    for (let i = 1; i < arrOrdenado.length; i++) {
        if (arrOrdenado[i].nota === arrOrdenado[i-1].nota) {
            if (mapa.get(arrOrdenado[i].nome) < mapa.get(arrOrdenado[i-1].nome)) {
                return "Ordem relativa foi invertida → NÃO estável";
            }
        }
    }
    return "Ordem relativa mantida → Estável";
}

console.log("\nVerificação automática:");
console.log("Selection:", verificarEstabilidade(turmaSelection, turma));
console.log("Insertion:", verificarEstabilidade(turmaInsertion, turma));

console.log("\nDESAFIO CONCLUÍDO!");
console.log("Selection Sort = O(n²) e NÃO estável");
console.log("Insertion Sort = O(n²) pior caso / O(n) melhor caso e ESTÁVEL");