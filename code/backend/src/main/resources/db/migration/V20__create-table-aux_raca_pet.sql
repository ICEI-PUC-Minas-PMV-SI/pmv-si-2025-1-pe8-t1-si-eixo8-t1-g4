CREATE TABLE aux_raca_pet (
    id BIGINT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL UNIQUE,
    id_tipo_pet BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tipo_pet) REFERENCES aux_tipo_pet(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO aux_raca_pet (descricao, id_tipo_pet)
VALUES
    -- Raças de Cachorro (id_tipo_pet = 1)
    ('Akita Inu', 1),
    ('Beagle', 1),
    ('Border Collie', 1),
    ('Boxer', 1),
    ('Buldogue Francês', 1),
    ('Buldogue Inglês', 1),
    ('Cocker Spaniel', 1),
    ('Chihuahua', 1),
    ('Dachshund (Teckel)', 1),
    ('Doberman', 1),
    ('Fox Paulistinha', 1),
    ('Golden Retriever', 1),
    ('Husky Siberiano', 1),
    ('Labrador Retriever', 1),
    ('Lhasa Apso', 1),
    ('Maltês', 1),
    ('Pastor Alemão', 1),
    ('Pastor de Shetland', 1),
    ('Pinscher', 1),
    ('Poodle', 1),
    ('Pug', 1),
    ('Rottweiler', 1),
    ('Shih Tzu', 1),
    ('Spitz Alemão (Lulu da Pomerânia)', 1),
    ('SRD (Sem Raça Definida)', 1),
    ('Yorkshire Terrier', 1),

    -- Raças de Gato (id_tipo_pet = 2)
    ('Angorá', 2),
    ('Azul Russo', 2),
    ('Bengal', 2),
    ('British Shorthair', 2),
    ('Himalaio', 2),
    ('Maine Coon', 2),
    ('Persa', 2),
    ('Ragdoll', 2),
    ('Siamês', 2),
    ('Sphynx', 2);