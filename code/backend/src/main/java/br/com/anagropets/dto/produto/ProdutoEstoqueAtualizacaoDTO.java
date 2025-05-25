package br.com.anagropets.dto.produto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ProdutoEstoqueAtualizacaoDTO {
	private @NotNull Long idProduto;
    private @NotNull Integer quantidadeDisponivelEstoque;
    private Integer quantidadeMinimaEstoque;
}
