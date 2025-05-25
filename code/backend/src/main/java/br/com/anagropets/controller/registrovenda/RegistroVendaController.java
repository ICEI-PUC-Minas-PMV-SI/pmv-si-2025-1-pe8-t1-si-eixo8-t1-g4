package br.com.anagropets.controller.registrovenda;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.dto.registrovenda.RegistroVendaCadastroDTO;
import br.com.anagropets.dto.registrovenda.RegistroVendaEdicaoDTO;
import br.com.anagropets.dto.registrovenda.RegistroVendaPesquisaDTO;
import br.com.anagropets.service.registrovenda.RegistroVendaService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("registroVenda")
@Tag(name = "Registro de Venda", description = "Operações relacionadas ao gerenciamento de vendas")
public class RegistroVendaController {
	
	private final RegistroVendaService registroVendaService;

	public RegistroVendaController(RegistroVendaService registroVendaService) {
		super();
		this.registroVendaService = registroVendaService;
	}
	
	@PostMapping("")
    @Operation(summary = "Cadastra um registro de venda", description = "Realiza cadastro de registro de venda")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registro de venda cadastrado com sucesso!"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir o cadastro de registro de venda")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> cadastrar(@Valid @RequestBody RegistroVendaCadastroDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.registroVendaService.cadastrar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@GetMapping("/{id}")
    @Operation(summary = "Busca um registro de venda pelo ID", description = "Retorna os dados do registro de venda com o ID especificado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registro de venda recuperado com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Registro de venda não encontrado.")
    })
    @Parameter(name = "id", description = "ID do registro de venda", required = true)
    public ResponseEntity<RetornoDTO> buscarPorId(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.registroVendaService.buscarPorId(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@PutMapping("")
    @Operation(summary = "Atualiza um registro de venda", description = "Realiza atualização de registro de venda")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registro de venda atualizado com sucesso!"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir a atualização de registro de venda")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> atualizar(@Valid @RequestBody RegistroVendaEdicaoDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.registroVendaService.atualizar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@DeleteMapping("/{id}")
    @Operation(summary = "Exclui um registro de venda pelo ID", description = "Realiza exclusão do registro de venda com o ID especificado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registro de venda excluído com sucesso!"),
            @ApiResponse(responseCode = "404", description = "Registro de venda de vendaoque não encontrado.")
        })
        @Parameter(name = "id", description = "ID do registro de venda", required = true)
    public ResponseEntity<RetornoDTO> excluir(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.registroVendaService.excluir(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@PostMapping("/paginado")
    @Operation(summary = "Busca paginada de registros de venda", description = "Retorna lista paginada de registros de venda")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de registros de venda recuperado com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de venda encontrado.")
    })
    public ResponseEntity<RetornoDTO> buscarPaginado(@RequestBody RegistroVendaPesquisaDTO dto) {
    	RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = registroVendaService.buscarPaginado(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }

}
