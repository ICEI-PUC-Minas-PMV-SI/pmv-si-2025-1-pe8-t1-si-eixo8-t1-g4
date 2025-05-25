package br.com.anagropets.model.auxiliar;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "aux_raca_pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RacaPet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private @NotNull String descricao;

    @ManyToOne
    @JoinColumn(name = "id_tipo_pet", nullable = false)
    private @NotNull TipoPet tipoPet;
}

