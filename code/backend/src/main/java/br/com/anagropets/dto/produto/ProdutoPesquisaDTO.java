package br.com.anagropets.dto.produto;

import br.com.anagropets.dto.ObjetoPaginadoDTO;
import lombok.Getter;

@Getter
public class ProdutoPesquisaDTO extends ObjetoPaginadoDTO {
	private String nome;
    private Long idCategoria;
}
