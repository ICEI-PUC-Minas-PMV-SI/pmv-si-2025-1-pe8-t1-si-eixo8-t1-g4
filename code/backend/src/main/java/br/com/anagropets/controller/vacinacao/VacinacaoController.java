package br.com.anagropets.controller.vacinacao;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.dto.vacinacao.VacinacaoCadastroDTO;
import br.com.anagropets.dto.vacinacao.VacinacaoPesquisaDTO;
import br.com.anagropets.service.vacinacao.VacinacaoService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("vacinacao")
@Tag(name = "Vacinação", description = "Operações relacionadas ao controle de vacinação dos pets")
@RequiredArgsConstructor
public class VacinacaoController {

    private final VacinacaoService vacinacaoService;

    @PostMapping("")
    @Operation(summary = "Cadastra uma vacinacao", description = "Realiza cadastro de vacinacao")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vacinação cadastrada"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir o cadastro de vacinação")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> salvar(@RequestBody @Valid List<VacinacaoCadastroDTO> dto) {
    	RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.vacinacaoService.cadastrar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }

    @GetMapping("/pet/{idPet}")
    @Operation(summary = "Busca lista de vacinação pelo ID do pet", description = "Retorna lista de vacinação do pet.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de vacinação do pet recuperada com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Lista de vacinação do pet não encontrada.")
    })
    @Parameter(name = "idPet", description = "ID do pet", required = true)
    public ResponseEntity<RetornoDTO> listarPorPet(@PathVariable Long idPet) {
    	RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.vacinacaoService.listarPorPet(idPet);
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @PostMapping("/paginado")
    @Operation(summary = "Busca paginada de vacinação", description = "Retorna lista paginada de vacinação")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registro de vacinação encontrado"),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de vacinação encontrado")
    })
    public ResponseEntity<RetornoDTO> buscarPaginado(@RequestBody VacinacaoPesquisaDTO dto) {
    	RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = vacinacaoService.buscarPaginado(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma vacinação pelo ID", description = "Realiza exclusão do registro de vacinação com o ID especificado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vacinção excluída"),
            @ApiResponse(responseCode = "404", description = "Vacinação não encontrada")
        })
    @Parameter(name = "id", description = "ID da vacinação", required = true)
    public ResponseEntity<RetornoDTO> excluir(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.vacinacaoService.excluir(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/alertas/proximas")
    @Operation(summary = "Busca lista de vacinação próxima", description = "Retorna lista de vacinação próxima.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de vacinação recuperada com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Lista de vacinação não encontrada.")
    })
    public ResponseEntity<RetornoDTO> alertasProximas(@RequestParam(defaultValue = "7") int dias) {
    	RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.vacinacaoService.listarAlertasProximos(dias);
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/alertas/atrasadas")
    @Operation(summary = "Busca lista de vacinação atrasada", description = "Retorna lista de vacinação atrasada.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de vacinação recuperada com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Lista de vacinação não encontrada.")
    })
    public ResponseEntity<RetornoDTO> alertasAtrasadas() {
    	RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.vacinacaoService.listarAtrasadas();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }	
}

