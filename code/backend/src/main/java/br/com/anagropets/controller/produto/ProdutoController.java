package br.com.anagropets.controller.produto;

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

import br.com.anagropets.dto.produto.ProdutoCadastroDTO;
import br.com.anagropets.dto.produto.ProdutoEdicaoDTO;
import br.com.anagropets.dto.produto.ProdutoEstoqueAtualizacaoDTO;
import br.com.anagropets.dto.produto.ProdutoPesquisaDTO;
import br.com.anagropets.service.produto.CategoriaProdutoService;
import br.com.anagropets.service.produto.ProdutoService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("produto")
@Tag(name = "Produto", description = "Operações relacionadas ao gerenciamento de produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
	private final CategoriaProdutoService categoriaProdutoService;

	public ProdutoController(CategoriaProdutoService categoriaProdutoService, ProdutoService produtoService) {
		super();
		this.categoriaProdutoService = categoriaProdutoService;
		this.produtoService = produtoService;
	}
	
	@PostMapping("")
    @Operation(summary = "Cadastra um produto", description = "Realiza cadastro de produto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto cadastrado com sucesso!"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir o cadastro de produto")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> cadastrar(@Valid @RequestBody ProdutoCadastroDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.produtoService.cadastrar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@GetMapping("/{id}")
    @Operation(summary = "Busca um produto pelo ID", description = "Retorna os dados do produto com o ID especificado.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto recuperado com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado.")
    })
    @Parameter(name = "id", description = "ID do produto", required = true)
    public ResponseEntity<RetornoDTO> buscarPorId(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.produtoService.buscarPorId(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@PutMapping("")
    @Operation(summary = "Atualiza um produto", description = "Realiza atualização de produto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso!"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir a atualização de produto")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> atualizar(@Valid @RequestBody ProdutoEdicaoDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.produtoService.atualizar(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@DeleteMapping("/{id}")
    @Operation(summary = "Exclui um produto pelo ID", description = "Realiza exclusão do registro de produto com o ID especificado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto excluído com sucesso!"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado.")
        })
        @Parameter(name = "id", description = "ID do produto", required = true)
    public ResponseEntity<RetornoDTO> excluir(@PathVariable Long id) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.produtoService.excluir(id);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@PostMapping("/paginado")
    @Operation(summary = "Busca paginada de produtos", description = "Retorna lista paginada de produtos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de produtos recuperado com sucesso!"),
        @ApiResponse(responseCode = "404", description = "Nenhum registro de produto encontrado.")
    })
    public ResponseEntity<RetornoDTO> buscarPaginado(@RequestBody ProdutoPesquisaDTO dto) {
    	RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = produtoService.buscarPaginado(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@GetMapping("")
	@Operation(summary = "Busca lista de produto", description = "Retorna lista de produto")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de produto recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de produto não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarListaProduto() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.produtoService.buscarLista();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}
	
	@PutMapping("/estoque")
    @Operation(summary = "Atualiza estoque de um produto", description = "Realiza atualização do estoque de produto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Estoque do produto atualizado com sucesso!"),
        @ApiResponse(responseCode = "500", description = "Não foi possível concluir a atualização de estoque do produto")
    })
    @Transactional
    public ResponseEntity<RetornoDTO> atualizarEstoque(@Valid @RequestBody ProdutoEstoqueAtualizacaoDTO dto) {
        RetornoDTO retorno = new RetornoDTO();

        try {
            retorno = this.produtoService.atualizarEstoque(dto);
        } catch (Exception e){
            retorno =  new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }

        return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
    }
	
	@GetMapping("/categoria")
	@Operation(summary = "Busca lista de categoria produto", description = "Retorna lista de categorias de produto")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de categorias de produto recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de categorias de produto não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarListaCategoriaProduto() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.categoriaProdutoService.buscarLista();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}
	
	@GetMapping("/estoqueBaixo")
	@Operation(summary = "Busca lista de produto com estoque baixo", description = "Retorna lista de produto com estoque baixo")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de produto recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de produto não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarListaProdutoEstoqueBaixo() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.produtoService.buscarListaEstoqueBaixo();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}
	
	@GetMapping("/vencimentoProximo")
	@Operation(summary = "Busca lista de produto com vencimento próximo", description = "Retorna lista de produto com vencimento próximo")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de produto recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de produto não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarListaProdutoVencimentoProximo() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			retorno = this.produtoService.buscarListaVencimentoProximo();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}

}
