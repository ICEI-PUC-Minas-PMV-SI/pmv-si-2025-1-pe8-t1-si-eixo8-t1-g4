ALTER TABLE produto
ADD COLUMN id_unidade_medida BIGINT NOT NULL AFTER descricao,
ADD COLUMN quantidade_por_medida DOUBLE NOT NULL AFTER id_unidade_medida;

ALTER TABLE produto
ADD CONSTRAINT fk_produto_unidade_medida FOREIGN KEY (id_unidade_medida) REFERENCES aux_unidade_medida(id);
