package br.com.anagropets.service.vacinacao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.anagropets.dto.vacinacao.VacinacaoCadastroDTO;
import br.com.anagropets.dto.vacinacao.VacinacaoPesquisaDTO;
import br.com.anagropets.dto.vacinacao.VacinacaoRetornoPaginadoDTO;
import br.com.anagropets.model.pet.Pet;
import br.com.anagropets.model.vacinacao.Vacinacao;
import br.com.anagropets.repository.pet.PetRepository;
import br.com.anagropets.repository.vacinacao.VacinacaoRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import br.com.anagropets.util.RetornoPaginadoBuilder;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VacinacaoService {

    private final VacinacaoRepository vacinacaoRepository;
    private final PetRepository petRepository;

    
	@Transactional
	public RetornoDTO cadastrar(List<VacinacaoCadastroDTO> dto) {
		try {
			List<Vacinacao> vacinacaoCadastradaList = new ArrayList<Vacinacao>();
			
			for (VacinacaoCadastroDTO vacinacaoCadastroDTO : dto) {
				Vacinacao vacinacao = new Vacinacao();
				
				if(vacinacaoCadastroDTO.getIdVacinacao() == null) {
					Pet pet = petRepository.findById(vacinacaoCadastroDTO.getIdPet())
			                .orElseThrow(() -> new EntityNotFoundException("Pet não encontrado"));

			        vacinacao.setPet(pet);
			        vacinacao.setNomeVacina(vacinacaoCadastroDTO.getNomeVacina());
			        vacinacao.setDataAplicacao(vacinacaoCadastroDTO.getDataAplicacao());
			        vacinacao.setDataProximaDose(vacinacaoCadastroDTO.getDataProximaDose());
			        vacinacao.setObservacoes(vacinacaoCadastroDTO.getObservacoes());
				} else {
					vacinacao = vacinacaoRepository.findById(vacinacaoCadastroDTO.getIdVacinacao())
			                .orElseThrow(() -> new EntityNotFoundException("Registro de vacinação não encontrado"));
				}				

		        Vacinacao vacinacaoCadastrada = vacinacaoRepository.save(vacinacao);
		        vacinacaoCadastradaList.add(vacinacaoCadastrada);
			}			
		    
		    return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Vacinação cadastrada com sucesso!").comObjeto(vacinacaoCadastradaList).construir();
		} catch (Exception e){
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}
	}
    
    public RetornoDTO listarPorPet(Long idPet) {
        try {
            List<Vacinacao> vacinacaoList  = this.vacinacaoRepository.findByPetIdOrderByDataAplicacaoAsc(idPet);

            if(!vacinacaoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de vacinação recuperada com sucesso!").comObjeto(vacinacaoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de vacinação não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO buscarPaginado(VacinacaoPesquisaDTO dto) {
    	try {    		
    		String nomePet = null;
    		String nomeCliente = null;
    		
    		if(Objects.nonNull(dto.getNomePet())) {
    			nomePet = dto.getNomePet();
    		}
    		if(Objects.nonNull(dto.getNomeCliente())) {
    			nomeCliente = dto.getNomeCliente();
    		}
    		
    		Pageable pageable = PageRequest.of(dto.getPage(), dto.getPageSize());
    		Page<VacinacaoRetornoPaginadoDTO> vacinacaoPage = vacinacaoRepository.findByNomePetAndNomeCliente(nomePet, nomeCliente, pageable);
    		
            Long totalElements = vacinacaoRepository.countRegistrosVacinacao(nomePet, nomeCliente);
            
            if(!vacinacaoPage.isEmpty()) {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de vacinação recuperado com sucesso!").comObjeto(vacinacaoPage.getContent()).comPaginacao(dto.getPage(), dto.getPageSize(), vacinacaoPage.getTotalPages(), totalElements, dto.getOrderingField(), dto.getOrderingDirection()).construir();
            } else {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de vacinação encontrado!").construir();
            }
        } catch (Exception e) {
            return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    @Transactional
    public RetornoDTO excluir(Long id) {
        try {            
            vacinacaoRepository.deleteById(id);
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Vacinação excluída com sucesso!").construir();
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO listarAlertasProximos(int dias) {
        try {
        	LocalDate hoje = LocalDate.now();
            LocalDate limite = hoje.plusDays(dias);
            List<Vacinacao> vacinacaoList  = this.vacinacaoRepository.findByDataProximaDoseBetweenOrderByDataProximaDoseAsc(hoje, limite);

            if(!vacinacaoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de vacinação recuperada com sucesso!").comObjeto(vacinacaoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de vacinação não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO listarAtrasadas() {
        try {
            List<Vacinacao> vacinacaoList  = this.vacinacaoRepository.findByDataProximaDoseBeforeOrderByDataProximaDoseAsc(LocalDate.now());

            if(!vacinacaoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de vacinação recuperada com sucesso!").comObjeto(vacinacaoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de vacinação não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
}
