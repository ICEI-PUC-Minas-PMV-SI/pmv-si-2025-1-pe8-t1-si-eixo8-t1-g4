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
public class AcumuladoFinanceiroDTO {

    private Long totalVendasAno;
    private BigDecimal totalValorVendasAno;
    private BigDecimal totalLucroAno;
}
