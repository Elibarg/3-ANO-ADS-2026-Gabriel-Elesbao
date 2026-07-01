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