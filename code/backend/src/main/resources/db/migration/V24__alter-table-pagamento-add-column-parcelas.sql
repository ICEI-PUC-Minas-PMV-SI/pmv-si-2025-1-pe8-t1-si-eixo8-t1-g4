ALTER TABLE pagamento
ADD COLUMN parcelas BIGINT NOT NULL DEFAULT 1 AFTER id_metodo_pagamento;