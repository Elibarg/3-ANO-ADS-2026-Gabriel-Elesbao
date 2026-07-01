CREATE DATABASE projeto_node;
CREATE TABLE usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    email VARCHAR(120) NOT NULL UNIQUE,

    senha VARCHAR(255) NOT NULL,

    role ENUM('admin','user') NOT NULL DEFAULT 'user'

);

UPDATE usuarios

SET role='admin'

WHERE id=1;

CREATE TABLE produtos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    categoria VARCHAR(100) NOT NULL,

    quantidade INT NOT NULL,

    preco DECIMAL(10,2) NOT NULL

);

CREATE TABLE movimentacoes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    produto_id INT NOT NULL,

    tipo ENUM('entrada','saida') NOT NULL,

    quantidade INT NOT NULL,

    data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (produto_id)
        REFERENCES produtos(id)

);