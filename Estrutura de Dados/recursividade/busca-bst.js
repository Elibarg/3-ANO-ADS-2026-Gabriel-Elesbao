function buscarBST(node, valor) {
    if (!node) return false;

    if (node.valor === valor) return true;

    if (valor < node.valor) {
        return buscarBST(node.left, valor);
    } else {
        return buscarBST(node.right, valor);
    }
}