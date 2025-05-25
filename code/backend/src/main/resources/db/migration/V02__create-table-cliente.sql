CREATE TABLE cliente (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255),
    celular VARCHAR(20),
    data_nascimento DATE,
    genero VARCHAR(20),
    data_cadastro DATE,
    id_endereco BIGINT NOT NULL,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
    	ON DELETE CASCADE ON UPDATE CASCADE
);
