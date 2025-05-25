package br.com.anagropets.dto.vacinacao;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VacinacaoCadastroDTO {
	private Long idVacinacao;

    @NotNull
    private Long idPet;

    @NotBlank
    private String nomeVacina;

    @NotNull
    private LocalDate dataAplicacao;

    private LocalDate dataProximaDose;

    private String observacoes;
}

