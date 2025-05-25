package br.com.anagropets.dto.financeiro;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FaturamentoMensalGraficoDTO {
	
	private String mes; // Ex: "Jan", "Fev", "Mar"...
    private BigDecimal totalVendido;
    private BigDecimal totalLucro;

}
