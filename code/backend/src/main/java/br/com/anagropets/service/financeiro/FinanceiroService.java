package br.com.anagropets.service.financeiro;

import java.math.BigDecimal;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.com.anagropets.dto.financeiro.AcumuladoFinanceiroDTO;
import br.com.anagropets.dto.financeiro.FaturamentoMensalGraficoDTO;
import br.com.anagropets.dto.financeiro.FinanceiroDiarioDTO;
import br.com.anagropets.dto.financeiro.FinanceiroMensalDTO;
import br.com.anagropets.model.financeiro.ResumoFinanceiroDiarioView;
import br.com.anagropets.model.financeiro.ResumoFinanceiroMensalView;
import br.com.anagropets.repository.financeiro.ResumoFinanceiroViewRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;

@Service
public class FinanceiroService {

    private final ResumoFinanceiroViewRepository resumoFinanceiroViewRepository;

    public FinanceiroService(ResumoFinanceiroViewRepository resumoFinanceiroViewRepository) {
		super();
		this.resumoFinanceiroViewRepository = resumoFinanceiroViewRepository;
	}
    
    public RetornoDTO consultarFinanceiroDiario(String dia) {
        try {
            if (dia == null || !dia.matches("\\d{4}-\\d{2}-\\d{2}")) {
                return new RetornoBuilder()
                    .comCodigoMensagem(HttpStatus.BAD_REQUEST.value())
                    .comMensagem("Parâmetro 'dia' inválido. Formato esperado: yyyy-MM-dd.")
                    .construir();
            }

            ResumoFinanceiroDiarioView resumoDia = resumoFinanceiroViewRepository.buscarResumoDiario(dia);

            FinanceiroDiarioDTO dto = FinanceiroDiarioDTO.builder()
                .dia(dia)
                .totalVendas(resumoDia != null ? resumoDia.getTotalVendas() : 0)
                .totalValorVendas(resumoDia != null ? resumoDia.getValorTotalVendas() : BigDecimal.ZERO)
                .totalLucro(resumoDia != null ? resumoDia.getLucroTotal() : BigDecimal.ZERO)
                .build();

            return new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.OK.value())
                .comMensagem("Dados financeiros diário retornados com sucesso.")
                .comObjeto(dto)
                .construir();

        } catch (Exception e) {
            return new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .comMensagem("Erro ao processar os dados financeiros diário.")
                .comObjeto(e)
                .construir();
        }
    }

	public RetornoDTO consultarFinanceiroMensal(String mes) {
        try {
            if (mes == null || !mes.matches("\\d{4}-\\d{2}")) {
                return new RetornoBuilder()
                    .comCodigoMensagem(HttpStatus.BAD_REQUEST.value())
                    .comMensagem("Parâmetro 'mes' inválido. Formato esperado: yyyy-MM.")
                    .construir();
            }

            ResumoFinanceiroMensalView resumoMes = resumoFinanceiroViewRepository.buscarResumoMensal(mes);
            int ano = Integer.parseInt(mes.substring(0, 4));
            ResumoFinanceiroMensalView acumulado = resumoFinanceiroViewRepository.buscarAcumuladoAno(ano);

            FinanceiroMensalDTO dto = FinanceiroMensalDTO.builder()
                .mes(mes)
                .totalVendas(resumoMes != null ? resumoMes.getTotalVendas() : 0)
                .totalValorVendas(resumoMes != null ? resumoMes.getValorTotalVendas() : BigDecimal.ZERO)
                .totalLucro(resumoMes != null ? resumoMes.getLucroTotal() : BigDecimal.ZERO)
                .acumuladoAno(
                    AcumuladoFinanceiroDTO.builder()
                        .totalVendasAno(acumulado != null ? acumulado.getTotalVendas() : 0)
                        .totalValorVendasAno(acumulado != null ? acumulado.getValorTotalVendas() : BigDecimal.ZERO)
                        .totalLucroAno(acumulado != null ? acumulado.getLucroTotal() : BigDecimal.ZERO)
                        .build()
                )
                .build();

            return new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.OK.value())
                .comMensagem("Dados financeiros mensal retornados com sucesso.")
                .comObjeto(dto)
                .construir();

        } catch (Exception e) {
            return new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .comMensagem("Erro ao processar os dados financeiros mensal.")
                .comObjeto(e)
                .construir();
        }
    }
	
	public RetornoDTO consultarFaturamentoGrafico(int ano) {
	    try {
	        List<FaturamentoMensalGraficoDTO> lista = new ArrayList<>();

	        for (int mes = 1; mes <= 12; mes++) {
	            String anoMes = String.format("%d-%02d", ano, mes);
	            ResumoFinanceiroMensalView resumo = resumoFinanceiroViewRepository.buscarResumoMensal(anoMes);

	            BigDecimal total = resumo != null ? resumo.getValorTotalVendas() : BigDecimal.ZERO;
	            BigDecimal lucro = resumo != null ? resumo.getLucroTotal() : BigDecimal.ZERO;

	            String nomeMes = Month.of(mes)
	                .getDisplayName(TextStyle.SHORT, new Locale("pt", "BR"));

	            lista.add(new FaturamentoMensalGraficoDTO(nomeMes, total, lucro));
	        }

	        return new RetornoBuilder()
	            .comCodigoMensagem(HttpStatus.OK.value())
	            .comMensagem("Dados de faturamento e lucro carregados com sucesso.")
	            .comObjeto(lista)
	            .construir();

	    } catch (Exception e) {
	        return new RetornoBuilder()
	            .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
	            .comMensagem("Erro ao consultar gráfico de faturamento/lucro.")
	            .comObjeto(e)
	            .construir();
	    }
	}


}
