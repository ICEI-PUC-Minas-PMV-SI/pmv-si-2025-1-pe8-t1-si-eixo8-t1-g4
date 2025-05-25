CREATE TABLE endereco (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10),
    sem_numero BOOLEAN,
    bairro VARCHAR(255) NOT NULL,
    complemento VARCHAR(255),
    cidade VARCHAR(255) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    pais VARCHAR(50) DEFAULT 'Brasil'
);
