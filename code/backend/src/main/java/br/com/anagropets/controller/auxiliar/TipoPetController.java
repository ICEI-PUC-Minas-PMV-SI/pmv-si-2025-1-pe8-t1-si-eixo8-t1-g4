package br.com.anagropets.controller.auxiliar;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.model.auxiliar.TipoPet;
import br.com.anagropets.repository.auxiliar.TipoPetRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("auxiliar/tipoPet")
@Tag(name = "Tipo de Pet", description = "Operações relacionadas a tipo de pet")
public class TipoPetController {
	
	private final TipoPetRepository tipoPetRepository;

	public TipoPetController(TipoPetRepository tipoPetRepository) {
		super();
		this.tipoPetRepository = tipoPetRepository;
	}
	
	@GetMapping("")
	@Operation(summary = "Busca lista de tipo de pet", description = "Retorna lista de tipo de pet")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de tipo de pet recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de tipo de pet não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarLista() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			List<TipoPet> tipoPetList = this.tipoPetRepository.findAllByOrderByIdAsc();
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de tipo de pet recuperada com sucesso!").comObjeto(tipoPetList).construir();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}

}
