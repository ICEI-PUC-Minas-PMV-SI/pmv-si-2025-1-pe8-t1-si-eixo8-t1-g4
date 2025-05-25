CREATE TABLE AUX_CATEGORIA_PRODUTO (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO AUX_CATEGORIA_PRODUTO (id, descricao)
VALUES 
(1, 'Alimentação'),
(2, 'Medicamentos'),
(3, 'Higiene'),
(4, 'Acessórios'),
(5, 'Brinquedos');