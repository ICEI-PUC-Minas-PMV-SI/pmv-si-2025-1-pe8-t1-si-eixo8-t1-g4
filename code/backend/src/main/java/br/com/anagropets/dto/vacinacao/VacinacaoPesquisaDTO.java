package br.com.anagropets.dto.vacinacao;

import br.com.anagropets.dto.ObjetoPaginadoDTO;
import lombok.Getter;

@Getter
public class VacinacaoPesquisaDTO extends ObjetoPaginadoDTO {
    private String nomeCliente;
    private String nomePet;
}
