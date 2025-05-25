package br.com.anagropets.model.pet;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.anagropets.model.auxiliar.PortePet;
import br.com.anagropets.model.auxiliar.RacaPet;
import br.com.anagropets.model.auxiliar.TipoPet;
import br.com.anagropets.model.cliente.Cliente;
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
@Table(name = "pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TipoPet tipo;

    @ManyToOne
    @JoinColumn(name = "id_raca")
    private RacaPet raca;

    @ManyToOne
    @JoinColumn(name = "id_porte")
    private PortePet porte;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal peso;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    @JsonBackReference
    private Cliente cliente;

}
