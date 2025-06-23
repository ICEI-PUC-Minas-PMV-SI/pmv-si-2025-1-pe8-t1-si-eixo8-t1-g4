CREATE TABLE aux_unidade_medida (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(50) NOT NULL,
    sigla VARCHAR(10) NOT NULL
);

INSERT INTO aux_unidade_medida (descricao, sigla) VALUES
('Unidade', 'un'),
('Miligrama', 'mg'),
('Grama', 'g'),
('Quilograma', 'kg'),
('Mililitro', 'ml'),
('Litro', 'L');