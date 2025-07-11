CREATE TABLE registro_vendas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente BIGINT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);