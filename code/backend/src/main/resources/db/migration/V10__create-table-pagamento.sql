CREATE TABLE PAGAMENTO (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_venda BIGINT NOT NULL,
    id_metodo_pagamento BIGINT NOT NULL,
    valor_pago DECIMAL(10, 2) NOT NULL,
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_status_pagamento BIGINT NOT NULL,
    FOREIGN KEY (id_venda) REFERENCES registro_vendas(id),
    FOREIGN KEY (id_metodo_pagamento) REFERENCES aux_metodo_pagamento(id),
    FOREIGN KEY (id_status_pagamento) REFERENCES aux_status_pagamento(id)
);