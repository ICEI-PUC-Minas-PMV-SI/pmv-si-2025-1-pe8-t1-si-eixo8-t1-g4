package br.com.anagropets.service.relatorios;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.com.anagropets.dto.relatorios.ClienteRankingDTO;
import br.com.anagropets.dto.relatorios.DiaSemanaRankingDTO;
import br.com.anagropets.dto.relatorios.DiaVendaRankingDTO;
import br.com.anagropets.dto.relatorios.IdadePetGraficoDTO;
import br.com.anagropets.dto.relatorios.ProdutoRankingDTO;
import br.com.anagropets.dto.relatorios.RacaPetGraficoDTO;
import br.com.anagropets.dto.relatorios.TipoPetGraficoDTO;
import br.com.anagropets.repository.pet.PetRepository;
import br.com.anagropets.repository.registrovenda.ItemVendaRepository;
import br.com.anagropets.repository.registrovenda.RegistroVendaRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;

@Service
public class RelatoriosService {

    private final ItemVendaRepository itemVendaRepository;
    private final RegistroVendaRepository registroVendaRepository;
    private final PetRepository petRepository;

	public RelatoriosService(ItemVendaRepository itemVendaRepository, RegistroVendaRepository registroVendaRepository,
			PetRepository petRepository) {
		super();
		this.itemVendaRepository = itemVendaRepository;
		this.registroVendaRepository = registroVendaRepository;
		this.petRepository = petRepository;
	}
	
	public RetornoDTO buscarRankingProdutosMaisVendidosMensal(int limit) {
    	try {
    		LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1);
    		LocalDateTime startOfMonth = firstDayOfMonth.atStartOfDay();
    		LocalDateTime startOfNextMonth = firstDayOfMonth.plusMonths(1).atStartOfDay();
    		Pageable pageable = PageRequest.of(0, limit);

    		List<ProdutoRankingDTO> ranking = itemVendaRepository.findRankingProdutosMaisVendidosMensal(
    		    startOfMonth, startOfNextMonth, pageable
    		);
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de produto encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de produtos mais vendidos mensal gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
	
	public RetornoDTO buscarRankingProdutosMaisVendidosAnual(int limit) {
    	try {
    		int anoAtual = LocalDate.now().getYear();
    		Pageable pageable = PageRequest.of(0, limit);
    		
    		List<ProdutoRankingDTO> ranking = itemVendaRepository.findRankingProdutosMaisVendidosAnual(anoAtual, pageable);
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de produto encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de produtos mais vendidos anual gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }

	public RetornoDTO buscarRankingProdutosMaisVendidosGeral(int limit) {
    	try {
    		Pageable pageable = PageRequest.of(0, limit);
        	List<ProdutoRankingDTO> ranking = itemVendaRepository.findRankingProdutosMaisVendidosGeral(pageable);
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de produto encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de produtos mais vendidos geral gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
	
	public RetornoDTO buscarRankingClientesMaisCompramMensal(int limit) {
    	try {
    		 LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1);
    	     LocalDateTime startOfMonth = firstDayOfMonth.atStartOfDay();
    	     LocalDateTime startOfNextMonth = firstDayOfMonth.plusMonths(1).atStartOfDay();
    		Pageable pageable = PageRequest.of(0, limit);
    	        
        	List<ClienteRankingDTO> ranking = registroVendaRepository.findRankingClientesMaisCompramMensal(startOfMonth, startOfNextMonth, pageable);
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de cliente encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de clientes que mais compram mensal gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
	
	public RetornoDTO buscarRankingClientesMaisCompramAnual(int limit) {
    	try {
    		int anoAtual = LocalDate.now().getYear();
    		Pageable pageable = PageRequest.of(0, limit);
    		
        	List<ClienteRankingDTO> ranking = registroVendaRepository.findRankingClientesMaisCompramAnual(anoAtual, pageable);
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de cliente encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de clientes que mais compram anual gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    public RetornoDTO buscarRankingClientesMaisCompramGeral(int limit) {
    	try {
    		Pageable pageable = PageRequest.of(0, limit);
        	List<ClienteRankingDTO> ranking = registroVendaRepository.findRankingClientesMaisCompramGeral(pageable);
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de cliente encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de clientes que mais compram geral gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    public RetornoDTO buscarRankingDiasMesMaisVendidos() {
    	try {
        	List<DiaVendaRankingDTO> ranking = registroVendaRepository.findRankingDiaMes();
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de vendas encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de dias do mês que mais vendem gerado com sucesso.").comObjeto(ranking).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    public RetornoDTO buscarRankingDiasSemanaMaisVendidos() {
    	try {
        	List<DiaSemanaRankingDTO> ranking = registroVendaRepository.findRankingDiaSemana();

        	List<DiaSemanaRankingDTO> rankingPt = ranking.stream()
        	    .map(item -> new DiaSemanaRankingDTO() {
        	        public String getDiaSemana() {
        	            return DIAS_SEMANA_PT.getOrDefault(item.getDiaSemana(), item.getDiaSemana());
        	        }
        	        public BigDecimal getTotalVendido() {
        	            return item.getTotalVendido();
        	        }
        	    })
        	    .collect(Collectors.toList());
        	
        	if(ranking.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de vendas encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Ranking de dias da semana que mais vendem gerado com sucesso.").comObjeto(rankingPt).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    public RetornoDTO buscarListaTipoPets() {
    	try {
        	List<TipoPetGraficoDTO> list = petRepository.agrupamentoPorTipo();
        	
        	if(list.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de pets encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de pets por tipo gerada com sucesso.").comObjeto(list).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    public RetornoDTO buscarListaRacaPets() {
    	try {
        	List<RacaPetGraficoDTO> list = petRepository.agrupamentoPorRaca();
        	
        	if(list.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de pets encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de pets por raça gerada com sucesso.").comObjeto(list).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    public RetornoDTO buscarListaIdadePets() {
    	try {
        	List<IdadePetGraficoDTO> list = petRepository.agrupamentoIdadePets();
        	
        	if(list.isEmpty()) {
        		return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de pets encontrado.").construir();
        	}
        	
        	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de pets por idade gerada com sucesso.").comObjeto(list).construir();
		} catch (Exception e) {
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}        
    }
    
    private static final Map<String, String> DIAS_SEMANA_PT = Map.of(
    		"Sunday", "Domingo",
    	    "Monday", "Segunda-feira",
    	    "Tuesday", "Terça-feira",
    	    "Wednesday", "Quarta-feira",
    	    "Thursday", "Quinta-feira",
    	    "Friday", "Sexta-feira",
    	    "Saturday", "Sábado"
    );

}

