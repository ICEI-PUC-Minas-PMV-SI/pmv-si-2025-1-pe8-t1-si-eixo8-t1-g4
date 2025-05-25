package br.com.anagropets.dto.registrovenda;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroVendaEdicaoDTO {
	private @NotNull Long id;
	private @NotNull Long idCliente;
	private @NotNull BigDecimal valorTotal;
	private @NotNull List<ItemVendaEdicaoDTO> itemVendaAtualizadoList;
	private @NotNull Long idMetodoPagamento;
	private @NotNull Integer parcelasPagamento;
}
