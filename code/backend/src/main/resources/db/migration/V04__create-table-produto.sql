CREATE TABLE PRODUTO (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    id_categoria BIGINT NOT NULL,
    codigo_barras VARCHAR(20),
    FOREIGN KEY (id_categoria) REFERENCES aux_categoria_produto(id)
);