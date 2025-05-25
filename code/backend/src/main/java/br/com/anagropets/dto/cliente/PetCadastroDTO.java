package br.com.anagropets.dto.cliente;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;

@Getter
public class PetCadastroDTO {
	private String nome;
    private Long idTipo;
    private Long idRaca;
    private Long idPorte;
    private LocalDate dataNascimento;
    private BigDecimal peso;
}
