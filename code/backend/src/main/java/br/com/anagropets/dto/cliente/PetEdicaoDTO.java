package br.com.anagropets.dto.cliente;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetEdicaoDTO {
	private @NotNull Long id;
	private String nome;
    private Long idTipo;
    private Long idRaca;
    private Long idPorte;
    private LocalDate dataNascimento;
    private BigDecimal peso;
}
