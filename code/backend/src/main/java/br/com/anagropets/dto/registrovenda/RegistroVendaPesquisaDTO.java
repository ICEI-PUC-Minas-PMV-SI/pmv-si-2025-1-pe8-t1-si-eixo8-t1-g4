package br.com.anagropets.dto.registrovenda;

import java.time.LocalDate;

import br.com.anagropets.dto.ObjetoPaginadoDTO;
import lombok.Getter;

@Getter
public class RegistroVendaPesquisaDTO extends ObjetoPaginadoDTO {
	private String nomeCliente;
    private LocalDate dataInicial;
    private LocalDate dataFinal;
}
