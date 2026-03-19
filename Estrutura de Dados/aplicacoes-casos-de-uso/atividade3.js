// ==================== Força Bruta ====================
function buscaForcaBruta(texto, padrao) {
    const ocorrencias = [];
    const n = texto.length;
    const m = padrao.length;
    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && texto[i + j] === padrao[j]) j++;
        if (j === m) ocorrencias.push(i);
    }
    return ocorrencias;
}

// ==================== KMP ====================
function construirTabelaFalha(padrao) {
    const m = padrao.length;
    const falha = new Array(m).fill(0);
    let j = 0;
    for (let i = 1; i < m; i++) {
        while (j > 0 && padrao[i] !== padrao[j]) j = falha[j - 1];
        if (padrao[i] === padrao[j]) j++;
        falha[i] = j;
    }
    return falha;
}

function buscaKMP(texto, padrao) {
    const ocorrencias = [];
    const n = texto.length;
    const m = padrao.length;
    if (m === 0) return ocorrencias;
    const falha = construirTabelaFalha(padrao);
    let j = 0;
    for (let i = 0; i < n; i++) {
        while (j > 0 && texto[i] !== padrao[j]) j = falha[j - 1];
        if (texto[i] === padrao[j]) j++;
        if (j === m) {
            ocorrencias.push(i - m + 1);
            j = falha[j - 1];
        }
    }
    return ocorrencias;
}

// ==================== Teste e Comparação ====================
const texto = "ABABDABACDABABCABAB";
const padrao = "ABABCABAB";

console.log('Texto:', texto);
console.log('Padrão:', padrao);

console.time('Força Bruta');
const fb = buscaForcaBruta(texto, padrao);
console.timeEnd('Força Bruta');
console.log('Ocorrências (FB):', fb);

console.time('KMP');
const kmp = buscaKMP(texto, padrao);
console.timeEnd('KMP');
console.log('Ocorrências (KMP):', kmp);

// Teste com texto longo (gerado aleatoriamente) para comparar desempenho
function gerarTextoLongo(tamanho) {
    let t = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < tamanho; i++) {
        t += chars[Math.floor(Math.random() * chars.length)];
    }
    return t;
}

console.log('\n--- Teste com texto de 10.000 caracteres ---');
const textoGrande = gerarTextoLongo(10000);
const padraoPequeno = "ABC"; // aparece aleatoriamente
console.time('FB 10k');
buscaForcaBruta(textoGrande, padraoPequeno);
console.timeEnd('FB 10k');
console.time('KMP 10k');
buscaKMP(textoGrande, padraoPequeno);
console.timeEnd('KMP 10k');