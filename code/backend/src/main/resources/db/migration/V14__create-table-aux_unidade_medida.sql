CREATE TABLE AUX_UNIDADE_MEDIDA (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(50) NOT NULL,
    sigla VARCHAR(10) NOT NULL
);

INSERT INTO AUX_UNIDADE_MEDIDA (descricao, sigla) VALUES
('Unidade', 'un'),
('Miligrama', 'mg'),
('Grama', 'g'),
('Quilograma', 'kg'),
('Mililitro', 'ml'),
('Litro', 'L');