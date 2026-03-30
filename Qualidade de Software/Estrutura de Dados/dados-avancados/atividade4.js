// atividade4.js – Árvore B+ com grau mínimo t = 2 (máximo 3 chaves)

class BPlusLeaf {
    constructor(order) {
        this.order = order;            // número máximo de chaves
        this.keys = [];
        this.next = null;              // ponteiro para próxima folha
    }

    insert(key) {
        let i = 0;
        while (i < this.keys.length && key > this.keys[i]) i++;
        this.keys.splice(i, 0, key);
    }
}

class BPlusNode {
    constructor(order) {
        this.order = order;
        this.keys = [];
        this.children = [];            // nós filhos ou folhas
    }
}

class BPlusTree {
    constructor(order) {
        this.order = order;
        this.root = new BPlusLeaf(order); // começa como folha
    }

    insert(key) {
        const result = this._insert(this.root, key);
        if (result.newNode) {
            // precisa criar nova raiz
            const newRoot = new BPlusNode(this.order);
            newRoot.keys = [result.key];
            newRoot.children = [this.root, result.newNode];
            this.root = newRoot;
        }
    }

    _insert(node, key) {
        if (node instanceof BPlusLeaf) {
            // insere na folha
            node.insert(key);
            if (node.keys.length > this.order) {
                // folha transbordou, divide
                const splitIndex = Math.floor(node.keys.length / 2);
                const newLeaf = new BPlusLeaf(this.order);
                newLeaf.keys = node.keys.splice(splitIndex);
                newLeaf.next = node.next;
                node.next = newLeaf;
                return { key: newLeaf.keys[0], newNode: newLeaf };
            }
            return {};
        } else {
            // nó interno: encontra filho apropriado
            let i = 0;
            while (i < node.keys.length && key >= node.keys[i]) i++;
            const result = this._insert(node.children[i], key);
            if (result.newNode) {
                // filho foi dividido, insere a chave promovida neste nó
                node.keys.splice(i, 0, result.key);
                node.children.splice(i + 1, 0, result.newNode);
                if (node.keys.length > this.order) {
                    // nó interno transbordou
                    const splitIndex = Math.floor(node.keys.length / 2);
                    const keyUp = node.keys[splitIndex];
                    const newNode = new BPlusNode(this.order);
                    newNode.keys = node.keys.splice(splitIndex + 1);
                    newNode.children = node.children.splice(splitIndex + 1);
                    node.keys.pop(); // remove a mediana (já foi guardada em keyUp)
                    return { key: keyUp, newNode: newNode };
                }
            }
            return {};
        }
    }

    display() {
        console.log('Árvore B+ (apenas folhas serão exibidas em ordem):');
        let leaf = this.root;
        while (!(leaf instanceof BPlusLeaf)) leaf = leaf.children[0];
        let folhas = [];
        while (leaf) {
            folhas.push(`[${leaf.keys.join(', ')}]`);
            leaf = leaf.next;
        }
        console.log(folhas.join(' -> '));
    }
}

// Teste com os valores do exercício
const bplus = new BPlusTree(3); // ordem 3 = máximo 3 chaves por nó
const valores = [15, 5, 25, 10, 20, 30, 35];
console.log('Inserindo em ordem:');
valores.forEach(v => {
    console.log(`Inserir ${v}`);
    bplus.insert(v);
    bplus.display();
    console.log('---');
});