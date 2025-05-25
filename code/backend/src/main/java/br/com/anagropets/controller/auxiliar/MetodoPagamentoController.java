package br.com.anagropets.controller.auxiliar;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.model.auxiliar.MetodoPagamento;
import br.com.anagropets.repository.auxiliar.MetodoPagamentoRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("auxiliar/metodoPagamento")
@Tag(name = "Método de Pagamento", description = "Operações relacionadas a método de pagamento")
public class MetodoPagamentoController {
	
	private final MetodoPagamentoRepository metodoPagamentoRepository;

	public MetodoPagamentoController(MetodoPagamentoRepository metodoPagamentoRepository) {
		super();
		this.metodoPagamentoRepository = metodoPagamentoRepository;
	}
	
	@GetMapping("")
	@Operation(summary = "Busca lista de método de pagamento", description = "Retorna lista de método de pagamento")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de método de pagamento recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de método de pagamento não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarLista() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			List<MetodoPagamento> metodoPagamentoList = this.metodoPagamentoRepository.findAll();
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de método de pagamento recuperada com sucesso!").comObjeto(metodoPagamentoList).construir();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}

}
