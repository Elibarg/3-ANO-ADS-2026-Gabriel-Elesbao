// ================================================
// ATIVIDADE 2 - INSERTION SORT (igual ao PDF + strings)
// ================================================

function insertionSort(arr) {
    const n = arr.length;

    // Começa do segundo elemento (i = 1)
    for (let i = 1; i < n; i++) {
        const key = arr[i];      // elemento que vamos inserir na parte ordenada
        let j = i - 1;

        // Move todos os elementos maiores que 'key' uma posição para a direita
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;        // insere o elemento na posição correta
        console.log(`Inserindo ${key} → array agora:`, [...arr]);
    }
    return arr;
}

// ===================== TESTES =====================
const numeros = [12, 11, 13, 5, 6];
console.log("Ordenado números:", insertionSort(numeros));

const nomes = ["Zé", "Ana", "Maria", "Bruno", "Carlos"];
console.log("Ordenado nomes:", insertionSort(nomes));

// Melhor caso: O(n)   |   Pior caso: O(n²)
// É estável (mantém ordem relativa de elementos iguais)