package br.com.anagropets.dto.registrovenda;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemVendaEdicaoDTO {
	private @NotNull Long id;
	private @NotNull Long idProduto;
	private @NotNull Long idUnidadeMedidaVenda;
	private @NotNull Integer quantidade;
	private @NotNull BigDecimal precoUnitario;
	private @NotNull BigDecimal subtotal;
}
