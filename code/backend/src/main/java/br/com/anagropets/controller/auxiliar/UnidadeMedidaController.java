package br.com.anagropets.controller.auxiliar;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.model.auxiliar.UnidadeMedida;
import br.com.anagropets.repository.auxiliar.UnidadeMedidaRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("auxiliar/unidadeMedida")
@Tag(name = "Unidade de Medida", description = "Operações relacionadas a unidade de medida")
public class UnidadeMedidaController {
	
	private final UnidadeMedidaRepository unidadeMedidaRepository;

	public UnidadeMedidaController(UnidadeMedidaRepository unidadeMedidaRepository) {
		super();
		this.unidadeMedidaRepository = unidadeMedidaRepository;
	}
	
	@GetMapping("")
	@Operation(summary = "Busca lista de unidade de medida", description = "Retorna lista de unidade de medida")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de unidade de medida recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de unidade de medida não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarLista() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			List<UnidadeMedida> unidadeMedidaList = this.unidadeMedidaRepository.findAll();
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de unidade de medida recuperada com sucesso!").comObjeto(unidadeMedidaList).construir();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}

}
