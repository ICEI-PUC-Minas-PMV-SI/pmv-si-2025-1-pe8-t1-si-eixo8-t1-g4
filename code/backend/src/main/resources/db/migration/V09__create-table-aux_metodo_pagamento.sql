CREATE TABLE aux_metodo_pagamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO aux_metodo_pagamento (id, descricao)
VALUES 
(1, 'PIX'),
(2, 'Cartão de crédito'),
(3, 'Cartão de débito'),
(4, 'Dinheiro');