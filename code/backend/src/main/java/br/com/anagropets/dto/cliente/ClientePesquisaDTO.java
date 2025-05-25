package br.com.anagropets.dto.cliente;

import br.com.anagropets.dto.ObjetoPaginadoDTO;
import lombok.Getter;

@Getter
public class ClientePesquisaDTO extends ObjetoPaginadoDTO {
    private String nome;
    private String cpf;
    private String genero;
}
