ALTER TABLE itens_venda
ADD COLUMN id_unidade_medida_venda BIGINT NOT NULL AFTER id_venda;

ALTER TABLE itens_venda
ADD CONSTRAINT fk_item_venda_unidade_medida FOREIGN KEY (id_unidade_medida_venda) REFERENCES aux_unidade_medida(id);