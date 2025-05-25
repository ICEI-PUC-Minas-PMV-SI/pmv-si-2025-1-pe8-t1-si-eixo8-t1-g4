package br.com.anagropets.dto.cliente;

import java.time.LocalDate;
import java.util.List;

import br.com.anagropets.dto.endereco.EnderecoEdicaoDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteEdicaoDTO {
	private @NotNull Long id;
    private @NotNull String nome;
    private @NotNull @Size(max = 11) String cpf;
    private String email;
    private @Size(max = 13) String celular;
    private LocalDate dataNascimento;
    private String genero;
    private @NotNull EnderecoEdicaoDTO endereco;
    private List<PetEdicaoDTO> petsAtualizados;
}
