ALTER TABLE PRODUTO
DROP COLUMN preco;

ALTER TABLE PRODUTO
ADD COLUMN preco_custo DECIMAL(10, 2) NOT NULL AFTER quantidade_por_medida,
ADD COLUMN margem_lucro DECIMAL(10, 2) NOT NULL AFTER preco_custo,
ADD COLUMN preco_final_venda DECIMAL(10, 2) NOT NULL AFTER margem_lucro;