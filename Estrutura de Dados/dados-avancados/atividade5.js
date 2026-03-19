// atividade5.js – Comparação simulada de desempenho

// Simulador de acessos a nós (I/O) para Árvore B e AVL
class Simulador {
    constructor() {
        this.acessos = 0;
    }

    // Simula busca em árvore B com grau 500 (típico em banco de dados)
    buscaArvoreB(niveis) {
        this.acessos += niveis; // cada nível = um nó lido
    }

    // Simula busca em árvore binária (AVL) com altura = log2(n)
    buscaAVL(altura) {
        this.acessos += altura;
    }

    reset() {
        this.acessos = 0;
    }
}

const sim = new Simulador();
const n = 1_000_000; // 1 milhão de registros

// Árvore B com grau 500: altura ≈ log_500(1e6) ≈ 2.5 → 3 níveis
const niveisB = Math.ceil(Math.log(n) / Math.log(500));
sim.buscaArvoreB(niveisB);
console.log(`Árvore B: ${niveisB} níveis, ${sim.acessos} acesso(s) a disco`);

sim.reset();
// AVL: altura ≈ log2(n) ≈ 20
const alturaAVL = Math.ceil(Math.log2(n));
sim.buscaAVL(alturaAVL);
console.log(`Árvore AVL: altura ${alturaAVL}, ${sim.acessos} acesso(s) a disco`);

console.log('\nConclusão: A árvore B requer muito menos acessos a disco, sendo ideal para grandes volumes.');