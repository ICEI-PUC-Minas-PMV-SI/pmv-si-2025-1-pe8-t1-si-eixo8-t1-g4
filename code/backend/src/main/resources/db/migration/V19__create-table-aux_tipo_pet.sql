CREATE TABLE aux_tipo_pet (
    id BIGINT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO aux_tipo_pet (descricao)
VALUES 
    ('Cachorro'),
    ('Gato'),
    ('Pássaro'),
    ('Coelho'),
    ('Hamster'),
    ('Outro');