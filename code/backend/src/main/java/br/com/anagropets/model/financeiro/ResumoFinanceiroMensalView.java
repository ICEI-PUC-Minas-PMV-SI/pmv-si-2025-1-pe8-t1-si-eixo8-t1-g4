package br.com.anagropets.model.financeiro;

import java.math.BigDecimal;

public interface ResumoFinanceiroMensalView {
    String getAnoMes();
    Long getTotalVendas();
    BigDecimal getValorTotalVendas();
    BigDecimal getLucroTotal();
}