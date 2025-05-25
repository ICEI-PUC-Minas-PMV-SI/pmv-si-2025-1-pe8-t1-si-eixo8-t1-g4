package br.com.anagropets.controller.financeiro;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.service.financeiro.FinanceiroService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("financeiro")
@Tag(name = "Financeiro", description = "Operações relacionadas ao financeiro")
public class FinanceiroController {

    private final FinanceiroService financeiroService;

    public FinanceiroController(FinanceiroService financeiroService) {
        this.financeiroService = financeiroService;
    }
    
    @GetMapping("/diario")
    @Operation(summary = "Consulta os dados financeiros diários", description = "Retorna os dados financeiros (total de vendas, valor e lucro) do dia informado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Resumo financeiro diário retornado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dia inválido ou não informado"),
        @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    })
    @Parameter(name = "dia", description = "Dia no formato yyyy-MM-dd (ex: 2025-05-24)", required = true)
    public ResponseEntity<RetornoDTO> consultarFinanceiroDiario(@RequestParam String dia) {
        RetornoDTO retorno;

        try {
            retorno = this.financeiroService.consultarFinanceiroDiario(dia);
        } catch (Exception e) {
            retorno = new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .comMensagem("Erro interno ao consultar dados financeiros do dia.")
                .comObjeto(e)
                .construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }

    @GetMapping("/mensal")
    @Operation(summary = "Consulta os dados financeiros mensais", description = "Retorna os dados financeiros (total de vendas, valor e lucro) do mês informado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Resumo financeiro mensal retornado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Mês inválido ou não informado"),
        @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    })
    @Parameter(name = "mes", description = "Mês no formato yyyy-MM (ex: 2025-05)", required = true)
    public ResponseEntity<RetornoDTO> consultarFinanceiroMensal(@RequestParam String mes) {
        RetornoDTO retorno;

        try {
            retorno = this.financeiroService.consultarFinanceiroMensal(mes);
        } catch (Exception e) {
            retorno = new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .comMensagem("Erro interno ao consultar dados financeiros do mês.")
                .comObjeto(e)
                .construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/grafico/faturamento")
    @Operation(summary = "Consulta o faturamento de todos os meses do ano", description = "Retorna o total vendido mês a mês para o ano informado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Dados retornados com sucesso"),
        @ApiResponse(responseCode = "400", description = "Ano inválido"),
        @ApiResponse(responseCode = "500", description = "Erro interno no servidor")
    })
    @Parameter(name = "ano", description = "Ano no formato yyyy (ex: 2025)", required = true)
    public ResponseEntity<RetornoDTO> consultarFaturamentoGrafico(@RequestParam int ano) {
    	RetornoDTO retorno;
    	
    	try {
            retorno = this.financeiroService.consultarFaturamentoGrafico(ano);
        } catch (Exception e) {
            retorno = new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .comMensagem("Erro interno ao consultar gráfico de faturamento.")
                .comObjeto(e)
                .construir();
        }
        
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }

}


