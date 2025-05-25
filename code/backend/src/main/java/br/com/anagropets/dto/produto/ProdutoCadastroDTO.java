package br.com.anagropets.dto.produto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ProdutoCadastroDTO {
	private @NotNull @Size(max = 100) String nome;
    private @NotNull Float precoCusto;
    private @NotNull Float margemLucro;
    private @NotNull Float precoFinalVenda;
    private @NotNull Long idCategoria;
    private @NotNull Integer quantidadeDisponivelEstoque;
    private Integer quantidadeMinimaEstoque;
    private @NotNull Long idUnidadeMedida;
    private @NotNull Double quantidadePorMedida;
    private LocalDate dataVencimento;
    private String codigoBarras;
}
