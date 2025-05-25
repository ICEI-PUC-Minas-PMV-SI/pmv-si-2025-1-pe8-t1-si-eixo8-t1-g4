ALTER TABLE ITENS_VENDA RENAME COLUMN preco_unitario TO preco_unitario_venda;

ALTER TABLE ITENS_VENDA
ADD COLUMN preco_unitario_custo DECIMAL(10, 2) NOT NULL AFTER subtotal,
ADD COLUMN margem_lucro DECIMAL(10, 2) NOT NULL AFTER preco_unitario_custo,
ADD COLUMN lucro DECIMAL(10, 2) NOT NULL AFTER margem_lucro;