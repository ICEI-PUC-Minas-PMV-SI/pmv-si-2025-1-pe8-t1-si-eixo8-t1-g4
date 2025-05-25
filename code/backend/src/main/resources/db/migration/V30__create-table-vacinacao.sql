CREATE TABLE vacinacao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pet BIGINT NOT NULL,
    nome_vacina VARCHAR(100) NOT NULL,
    data_aplicacao DATE NOT NULL,
    data_proxima_dose DATE,
    observacoes VARCHAR(255),
    CONSTRAINT fk_vacinacao_pet FOREIGN KEY (id_pet) REFERENCES pet(id)
);
