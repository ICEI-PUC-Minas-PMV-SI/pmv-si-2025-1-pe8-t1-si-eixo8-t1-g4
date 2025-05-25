CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    id_usuario BIGINT NOT NULL,
    data_expiracao DATETIME NOT NULL,
    CONSTRAINT fk_usuario_refresh FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
