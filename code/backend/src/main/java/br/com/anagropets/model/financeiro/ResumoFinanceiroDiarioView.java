package br.com.anagropets.model.financeiro;

import java.math.BigDecimal;

public interface ResumoFinanceiroDiarioView {
    String getAnoMesDia();
    Long getTotalVendas();
    BigDecimal getValorTotalVendas();
    BigDecimal getLucroTotal();
}