package br.com.anagropets.dto.cliente;

import java.time.LocalDate;
import java.util.List;

import br.com.anagropets.dto.endereco.EnderecoCadastroDTO;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ClienteCadastroDTO {
    private @NotNull String nome;
    private @NotNull @Size(max = 11) String cpf;
    private String email;
    private @Size(max = 13) String celular;
    private LocalDate dataNascimento;
    private String genero;
    private @NotNull EnderecoCadastroDTO endereco;
    private List<PetCadastroDTO> pets;
}
