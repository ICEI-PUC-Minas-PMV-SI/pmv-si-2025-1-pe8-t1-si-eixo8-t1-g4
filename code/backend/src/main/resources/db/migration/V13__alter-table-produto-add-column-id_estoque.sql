ALTER TABLE PRODUTO
ADD id_estoque BIGINT AFTER id_categoria,
ADD CONSTRAINT uk_produto_estoque UNIQUE (id_estoque),
ADD CONSTRAINT fk_produto_estoque FOREIGN KEY (id_estoque) REFERENCES ESTOQUE(id);