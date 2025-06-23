ALTER TABLE estoque
ADD CONSTRAINT uk_produto_estoque UNIQUE (id_produto);