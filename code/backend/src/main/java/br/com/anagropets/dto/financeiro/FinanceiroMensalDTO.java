package br.com.anagropets.dto.financeiro;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinanceiroMensalDTO {

    private String mes;
    private Long totalVendas;
    private BigDecimal totalValorVendas;
    private BigDecimal totalLucro;
    private AcumuladoFinanceiroDTO acumuladoAno;
}
