CREATE TABLE aux_porte_pet (
    id BIGINT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO aux_porte_pet (descricao)
VALUES
    ('Pequeno'),
    ('Médio'),
    ('Grande');