package br.com.anagropets.dto.endereco;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class EnderecoEdicaoDTO {
	private @NotNull Long id;
	private @NotNull @Size(max = 8) String cep;
	private @NotNull String logradouro;
	private String numero;
	private Boolean semNumero;
	private @NotNull String bairro;
	private String complemento;
	private @NotNull String cidade;
	private @NotNull @Size(max = 2) String uf;
}
