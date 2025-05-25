package br.com.anagropets.controller.auxiliar;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.anagropets.model.auxiliar.PortePet;
import br.com.anagropets.repository.auxiliar.PortePetRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("auxiliar/portePet")
@Tag(name = "Porte de Pet", description = "Operações relacionadas a porte de pet")
public class PortePetController {
	
	private final PortePetRepository portePetRepository;

	public PortePetController(PortePetRepository portePetRepository) {
		super();
		this.portePetRepository = portePetRepository;
	}
	
	@GetMapping("")
	@Operation(summary = "Busca lista de porte de pet", description = "Retorna lista de porte de pet")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Lista de porte de pet recuperada com sucesso!"),
			@ApiResponse(responseCode = "404", description = "Lista de porte de pet não encontrada.") })
	public ResponseEntity<RetornoDTO> buscarLista() {
		RetornoDTO retorno = new RetornoDTO();

		try {
			List<PortePet> portePetList = this.portePetRepository.findAll();
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de porte de pet recuperada com sucesso!").comObjeto(portePetList).construir();
		} catch (Exception e) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e)
					.construir();
		}

		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}

}
