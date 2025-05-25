CREATE TABLE pet (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    id_tipo BIGINT NOT NULL,
    id_raca BIGINT NOT NULL,
    id_porte BIGINT NOT NULL,
    data_nascimento DATE NOT NULL,
    id_cliente BIGINT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES aux_tipo_pet(id),
    FOREIGN KEY (id_raca) REFERENCES aux_raca_pet(id),
    FOREIGN KEY (id_porte) REFERENCES aux_porte_pet(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);