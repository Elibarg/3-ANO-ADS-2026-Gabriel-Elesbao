// ================================================
// ATIVIDADE 3 - BUBBLE SORT (otimizado com flag)
// ================================================

function bubbleSort(arr) {
    const n = arr.length;
    let trocou;

    for (let i = 0; i < n - 1; i++) {
        trocou = false;                     // otimização: se não trocar nada, já está ordenado

        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                trocou = true;
                console.log(`Bolha: trocou ${arr[j]} ↔ ${arr[j + 1]}`);
            }
        }

        if (!trocou) {
            console.log("Array já ordenado! Parando cedo.");
            break;
        }
    }
    return arr;
}

const teste = [64, 34, 25, 12, 22, 11, 90];
console.log("Bubble Sort:", bubbleSort(teste));