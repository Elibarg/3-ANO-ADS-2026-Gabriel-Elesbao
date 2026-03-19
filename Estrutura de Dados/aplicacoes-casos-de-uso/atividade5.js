class GrafoRedeSocial {
    constructor() {
        this.listaAdj = new Map(); // usuário -> conjunto de amigos
    }

    adicionarUsuario(usuario) {
        if (!this.listaAdj.has(usuario)) {
            this.listaAdj.set(usuario, new Set());
        }
    }

    adicionarAmizade(usuario1, usuario2) {
        this.adicionarUsuario(usuario1);
        this.adicionarUsuario(usuario2);
        this.listaAdj.get(usuario1).add(usuario2);
        this.listaAdj.get(usuario2).add(usuario1);
    }

    // Busca em largura para menor distância (número de arestas)
    distanciaMinima(inicio, destino) {
        if (!this.listaAdj.has(inicio) || !this.listaAdj.has(destino)) {
            return -1; // um dos usuários não existe
        }
        if (inicio === destino) return 0;

        const visitados = new Set();
        const fila = [{ usuario: inicio, distancia: 0 }];
        visitados.add(inicio);

        while (fila.length > 0) {
            const { usuario, distancia } = fila.shift();
            for (let amigo of this.listaAdj.get(usuario)) {
                if (amigo === destino) return distancia + 1;
                if (!visitados.has(amigo)) {
                    visitados.add(amigo);
                    fila.push({ usuario: amigo, distancia: distancia + 1 });
                }
            }
        }
        return -1; // não conectado
    }

    exibirRede() {
        console.log('Rede Social:');
        for (let [usuario, amigos] of this.listaAdj.entries()) {
            console.log(`${usuario} -> ${Array.from(amigos).join(', ')}`);
        }
    }
}

// Teste
const rede = new GrafoRedeSocial();
rede.adicionarAmizade('Alice', 'Bob');
rede.adicionarAmizade('Alice', 'Carol');
rede.adicionarAmizade('Bob', 'David');
rede.adicionarAmizade('Carol', 'Eve');
rede.adicionarAmizade('David', 'Eve');
rede.adicionarAmizade('Eve', 'Frank');
rede.exibirRede();

console.log('\n--- Menor distância ---');
console.log('Alice -> Eve:', rede.distanciaMinima('Alice', 'Eve')); // 2 (Alice-Carol-Eve)
console.log('Bob -> Frank:', rede.distanciaMinima('Bob', 'Frank')); // 3 (Bob-David-Eve-Frank)
console.log('Alice -> Alice:', rede.distanciaMinima('Alice', 'Alice')); // 0
console.log('Alice -> George:', rede.distanciaMinima('Alice', 'George')); // -1