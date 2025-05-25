package br.com.anagropets.model.auxiliar;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "aux_tipo_pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoPet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OrderBy("id ASC")
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private @NotNull String descricao;
}

