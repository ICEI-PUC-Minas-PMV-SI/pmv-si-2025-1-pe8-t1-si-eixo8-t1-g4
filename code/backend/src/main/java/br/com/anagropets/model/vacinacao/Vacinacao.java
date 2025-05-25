package br.com.anagropets.model.vacinacao;

import java.time.LocalDate;

import br.com.anagropets.model.pet.Pet;
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
@Table(name = "vacinacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vacinacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_pet", nullable = false)
    private Pet pet;

    @NotNull
    @Column(length = 100, nullable = false)
    private String nomeVacina;

    @NotNull
    @Column(nullable = false)
    private LocalDate dataAplicacao;

    private LocalDate dataProximaDose;

    @Column(length = 255)
    private String observacoes;
}

