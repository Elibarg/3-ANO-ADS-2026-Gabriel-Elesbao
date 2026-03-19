// ================================================
// ATIVIDADE 1 - SELECTION SORT (exatamente como no PDF)
// ================================================

function selectionSort(arr) {
    const n = arr.length;                    // tamanho do array

    // Laço externo: fixa a posição que vamos preencher
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;                    // assume que o menor é o atual

        // Laço interno: procura o menor elemento no restante do array
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {    // encontrou um número menor?
                minIndex = j;                // atualiza o índice do menor
            }
        }

        // Troca o elemento atual com o menor encontrado (se não for o mesmo)
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            console.log(`Troca realizada: posição ${i} recebeu ${arr[i]}`);
        }
    }
    return arr;
}

// ===================== TESTE =====================
const numeros = [64, 25, 12, 22, 11];
console.log("Array original:", numeros);
console.log("Ordenado (Selection Sort):", selectionSort(numeros));
// Saída esperada: [11, 12, 22, 25, 64]

// Complexidade: O(n²) sempre
// Não é estável (pode inverter ordem de elementos iguais)