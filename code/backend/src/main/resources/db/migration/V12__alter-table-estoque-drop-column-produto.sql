ALTER TABLE estoque
DROP CONSTRAINT uk_produto_estoque,
DROP CONSTRAINT estoque_ibfk_1,
DROP COLUMN id_produto;