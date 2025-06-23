CREATE TABLE aux_status_pagamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(10) NOT NULL
);

INSERT INTO aux_status_pagamento (id, descricao)
VALUES 
(1, 'Pendente'),
(2, 'Confirmado'),
(3, 'Recusado');