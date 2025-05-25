package br.com.anagropets.controller.cliente;

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

import br.com.anagropets.dto.cliente.ClienteCadastroDTO;
import br.com.anagropets.dto.cliente.ClienteEdicaoDTO;
import br.com.anagropets.dto.cliente.ClientePesquisaDTO;
import br.com.anagropets.service.cliente.ClienteService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("cliente")
@Tag(name = "Cliente", description = "Operações relacionadas ao gerenciamento de clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("")
    @Operation(summary = "Cadastra um cliente", description = "Realiza cadastro de cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente cadastrado"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir o cadastro de cliente")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> cadastrar(@Valid @RequestBody ClienteCadastroDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.cadastrar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "Busca um cliente pelo ID", description = "Retorna os dados do cliente com o ID especificado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @Parameter(name = "id", description = "ID do cliente", required = true)
    public ResponseEntity<RetornoDTO> buscarPorId(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.buscarPorId(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/cpf/{cpf}")
    @Operation(summary = "Busca um cliente pelo CPF", description = "Retorna os dados do cliente com o CPF especificado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @Parameter(name = "cpf", description = "CPF do cliente", required = true)
    public ResponseEntity<RetornoDTO> buscarPorId(@PathVariable String cpf) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.buscarPorCpf(cpf);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @PutMapping("")
    @Operation(summary = "Atualiza um cliente", description = "Realiza atualização de cliente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente atualizado"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir a atualização de cliente")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> atualizar(@Valid @RequestBody ClienteEdicaoDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.atualizar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui um cliente pelo ID", description = "Realiza exclusão do registro do cliente com o ID especificado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente excluído"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
        })
        @Parameter(name = "id", description = "ID do cliente", required = true)
    public ResponseEntity<RetornoDTO> excluir(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.excluir(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @PostMapping("/paginado")
    @Operation(summary = "Busca paginada de clientes", description = "Retorna lista paginada de clientes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registro de cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de cliente encontrado")
    })
    public ResponseEntity<RetornoDTO> buscarPaginado(@RequestBody ClientePesquisaDTO dto) {
    	RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = clienteService.buscarPaginado(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("")
	@Operation(summary = "Busca lista de cliente", description = "Retorna lista de cliente")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de cliente recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de cliente não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarLista() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.clienteService.buscarLista();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}
    
    @GetMapping("/pet/aniversarioProximo")
	@Operation(summary = "Busca lista de pet com aniversário próximo", description = "Retorna lista de pet com aniversário próximo")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de pet recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de pet não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarListaPetsAniversarioProximo() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.clienteService.buscarListaPetsAniversarioProximo();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}
    
    @GetMapping("/{idCliente}/pet")
    @Operation(summary = "Busca a lista de pet por ID do cliente", description = "Retorna a lista de pet do cliente com o ID especificado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de pet do cliente encontrada"),
        @ApiResponse(responseCode = "404", description = "Lista de pet do cliente não encontrada")
    })
    @Parameter(name = "idCliente", description = "ID do cliente", required = true)
    public ResponseEntity<RetornoDTO> buscarListaPetPorId(@PathVariable Long idCliente) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.buscarListaPetPorId(idCliente);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
    
    @GetMapping("/pet/{idPet}")
    @Operation(summary = "Busca um cliente pelo ID do pet", description = "Retorna os dados do cliente com o ID do pet especificado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    @Parameter(name = "idPet", description = "ID do pet", required = true)
    public ResponseEntity<RetornoDTO> buscarClientePorIdPet(@PathVariable Long idPet) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.clienteService.buscarClientePorIdPet(idPet);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
}
