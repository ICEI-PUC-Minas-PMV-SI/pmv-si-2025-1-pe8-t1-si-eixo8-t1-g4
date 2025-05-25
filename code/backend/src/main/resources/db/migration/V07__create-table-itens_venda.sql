CREATE TABLE ITENS_VENDA (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_venda BIGINT NOT NULL,
    id_produto BIGINT NOT NULL,
    quantidade BIGINT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venda) REFERENCES registro_vendas(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);