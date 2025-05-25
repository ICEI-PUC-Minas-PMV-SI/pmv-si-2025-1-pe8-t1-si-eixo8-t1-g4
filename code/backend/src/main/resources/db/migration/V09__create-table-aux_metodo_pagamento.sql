CREATE TABLE AUX_METODO_PAGAMENTO (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO AUX_METODO_PAGAMENTO (id, descricao)
VALUES 
(1, 'PIX'),
(2, 'Cartão de crédito'),
(3, 'Cartão de débito'),
(4, 'Dinheiro');