package br.com.anagropets.dto.cliente;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PetAniversarioDTO {
	private Long id;
    private String nome;
    private LocalDate dataNascimento;
    private Long idCliente;
    private String nomeCliente;
    private String celularCliente;
}
