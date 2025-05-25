package br.com.anagropets.controller.auxiliar;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.model.auxiliar.RacaPet;
import br.com.anagropets.repository.auxiliar.RacaPetRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("auxiliar/racaPet")
@Tag(name = "Raça de Pet", description = "Operações relacionadas a raça de pet")
public class RacaPetController {
	
	private final RacaPetRepository racaPetRepository;

	public RacaPetController(RacaPetRepository racaPetRepository) {
		super();
		this.racaPetRepository = racaPetRepository;
	}
	
	@GetMapping("")
	@Operation(summary = "Busca lista de raça de pet", description = "Retorna lista de raça de pet")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de raça de pet recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de raça de pet não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarLista() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			List<RacaPet> racaPetList = this.racaPetRepository.findAll();
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de raça de pet recuperada com sucesso!").comObjeto(racaPetList).construir();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}

}
