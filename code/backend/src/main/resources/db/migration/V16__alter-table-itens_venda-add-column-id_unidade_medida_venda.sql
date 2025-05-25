ALTER TABLE ITENS_VENDA
ADD COLUMN id_unidade_medida_venda BIGINT NOT NULL AFTER id_venda;

ALTER TABLE ITENS_VENDA
ADD CONSTRAINT fk_item_venda_unidade_medida FOREIGN KEY (id_unidade_medida_venda) REFERENCES AUX_UNIDADE_MEDIDA(id);