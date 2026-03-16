// vetor com 10 números
const vetor = [5, 8, 12, 3, 7, 9, 1, 4, 6, 10];

// busca linear
function buscarNumero(arr, valor) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === valor) {
            return i;
        }
    }
    return -1;
}

// remover elemento por posição
function removerPosicao(arr, pos) {
    if (pos < 0 || pos >= arr.length) {
        return arr;
    }
    arr.splice(pos, 1);
    return arr;
}

console.log(buscarNumero(vetor, 7));
console.log(removerPosicao(vetor, 3));