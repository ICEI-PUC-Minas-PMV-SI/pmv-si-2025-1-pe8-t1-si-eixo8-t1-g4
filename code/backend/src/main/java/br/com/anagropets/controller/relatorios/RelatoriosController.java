package br.com.anagropets.controller.relatorios;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.service.relatorios.RelatoriosService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("relatorios")
@Tag(name = "Relatórios", description = "Operações relacionadas aos relatórios")
public class RelatoriosController {

    private final RelatoriosService relatoriosService;

    public RelatoriosController(RelatoriosService relatoriosService) {
        this.relatoriosService = relatoriosService;
    }
    
    @GetMapping("/produtosMaisVendidos/mensal")
    @Operation(summary = "Ranking de produtos mais vendidos mensal", description = "Retorna os produtos mais vendidos mensal")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de produtos mais vendidos mensal gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de produto encontrado.")
    })
    @Parameter(name = "limit", description = "Até qual posição o ranking deve ser gerado (padrão 10)", required = false)
    public ResponseEntity<RetornoDTO> rankingProdutosMaisVendidosMeral(
            @RequestParam(defaultValue = "10") int limit) {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingProdutosMaisVendidosMensal(limit);
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/produtosMaisVendidos/anual")
    @Operation(summary = "Ranking de produtos mais vendidos anual", description = "Retorna os produtos mais vendidos anual")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de produtos mais vendidos anual gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de produto encontrado.")
    })
    @Parameter(name = "limit", description = "Até qual posição o ranking deve ser gerado (padrão 10)", required = false)
    public ResponseEntity<RetornoDTO> rankingProdutosMaisVendidosAnual(
            @RequestParam(defaultValue = "10") int limit) {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingProdutosMaisVendidosAnual(limit);
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }

    @GetMapping("/produtosMaisVendidos/geral")
    @Operation(summary = "Ranking de produtos mais vendidos geral", description = "Retorna os produtos mais vendidos geral")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de produtos mais vendidos geral gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de produto encontrado.")
    })
    @Parameter(name = "limit", description = "Até qual posição o ranking deve ser gerado (padrão 10)", required = false)
    public ResponseEntity<RetornoDTO> rankingProdutosMaisVendidosGeral(
            @RequestParam(defaultValue = "10") int limit) {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingProdutosMaisVendidosGeral(limit);
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/clientesMaisCompram/mensal")
    @Operation(summary = "Ranking de clientes que mais compram mensal", description = "Retorna os clientes que mais compram mensal")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de clientes que mais compram mensal gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de cliente encontrado.")
    })
    @Parameter(name = "limit", description = "Até qual posição o ranking deve ser gerado (padrão 10)", required = false)
    public ResponseEntity<RetornoDTO> rankingClientesMaisCompramMensal(
            @RequestParam(defaultValue = "10") int limit) {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingClientesMaisCompramMensal(limit);
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/clientesMaisCompram/anual")
    @Operation(summary = "Ranking de clientes que mais compram anual", description = "Retorna os clientes que mais compram anual")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de clientes que mais compram anual gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de cliente encontrado.")
    })
    @Parameter(name = "limit", description = "Até qual posição o ranking deve ser gerado (padrão 10)", required = false)
    public ResponseEntity<RetornoDTO> rankingClientesMaisCompramAnual(
            @RequestParam(defaultValue = "10") int limit) {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingClientesMaisCompramAnual(limit);
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/clientesMaisCompram/geral")
    @Operation(summary = "Ranking de clientes que mais compram geral", description = "Retorna os clientes que mais compram geral")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de clientes que mais compram geral gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de cliente encontrado.")
    })
    @Parameter(name = "limit", description = "Até qual posição o ranking deve ser gerado (padrão 10)", required = false)
    public ResponseEntity<RetornoDTO> rankingClientesMaisCompram(
            @RequestParam(defaultValue = "10") int limit) {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingClientesMaisCompramGeral(limit);
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/diasMesMaisVendidos")
    @Operation(summary = "Ranking de dias do mês que mais vendem", description = "Retorna o ranking de vendas por dia do mês")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de dias do mês que mais vendem gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de venda encontrado.")
    })
    public ResponseEntity<RetornoDTO> rankingDiasMesMaisVendidos() {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingDiasMesMaisVendidos();
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/diasSemanaMaisVendidos")
    @Operation(summary = "Ranking de dias da semana que mais vendem", description = "Retorna o ranking de vendas por dia da semana")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ranking de dias da semana que mais vendem gerado com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de venda encontrado.")
    })
    public ResponseEntity<RetornoDTO> rankingDiasSemanaMaisVendidos() {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarRankingDiasSemanaMaisVendidos();
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/petsPorTipo")
    @Operation(summary = "Gráfico de tipos de pet", description = "Retorna lista de pets por tipo")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de pets por tipo gerada com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de pets encontrado.")
    })
    public ResponseEntity<RetornoDTO> petsPorTipo() {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarListaTipoPets();
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/petsPorRaca")
    @Operation(summary = "Gráfico de raças de pet", description = "Retorna lista de pets por raça")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de pets por raça gerada com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de pets encontrado.")
    })
    public ResponseEntity<RetornoDTO> petsPorRaca() {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarListaRacaPets();
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/petsPorIdade")
    @Operation(summary = "Gráfico de idades dos pets", description = "Retorna lista de pets por idade")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de pets por idades gerada com sucesso."),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de pets encontrado.")
    })
    public ResponseEntity<RetornoDTO> petsPorIdade() {
        RetornoDTO retorno;
        
        try {
            retorno = relatoriosService.buscarListaIdadePets();
        } catch (Exception e) {
            retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
}

