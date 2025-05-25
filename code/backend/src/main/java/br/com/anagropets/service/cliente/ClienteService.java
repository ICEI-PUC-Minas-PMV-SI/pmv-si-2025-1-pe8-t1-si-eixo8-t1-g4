package br.com.anagropets.service.cliente;

import java.time.LocalDate;
import java.time.MonthDay;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.anagropets.config.ModelMapperConfig;
import br.com.anagropets.dto.auxiliar.IdDescricao;
import br.com.anagropets.dto.cliente.ClienteCadastroDTO;
import br.com.anagropets.dto.cliente.ClienteEdicaoDTO;
import br.com.anagropets.dto.cliente.ClientePesquisaDTO;
import br.com.anagropets.dto.cliente.ClienteRetornoPaginadoDTO;
import br.com.anagropets.dto.cliente.PetAniversarioDTO;
import br.com.anagropets.dto.cliente.PetCadastroDTO;
import br.com.anagropets.dto.cliente.PetEdicaoDTO;
import br.com.anagropets.model.cliente.Cliente;
import br.com.anagropets.model.endereco.Endereco;
import br.com.anagropets.model.pet.Pet;
import br.com.anagropets.repository.auxiliar.PortePetRepository;
import br.com.anagropets.repository.auxiliar.RacaPetRepository;
import br.com.anagropets.repository.auxiliar.TipoPetRepository;
import br.com.anagropets.repository.cliente.ClienteRepository;
import br.com.anagropets.repository.pet.PetRepository;
import br.com.anagropets.service.endereco.EnderecoService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import br.com.anagropets.util.RetornoPaginadoBuilder;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EnderecoService enderecoService;
    private final TipoPetRepository tipoPetRepository;
    private final RacaPetRepository racaPetRepository;
    private final PortePetRepository portePetRepository;
    private final PetRepository petRepository;

	public ClienteService(ClienteRepository clienteRepository, EnderecoService enderecoService,
			TipoPetRepository tipoPetRepository, RacaPetRepository racaPetRepository,
			PortePetRepository portePetRepository, PetRepository petRepository) {
		super();
		this.clienteRepository = clienteRepository;
		this.enderecoService = enderecoService;
		this.tipoPetRepository = tipoPetRepository;
		this.racaPetRepository = racaPetRepository;
		this.portePetRepository = portePetRepository;
		this.petRepository = petRepository;
	}

	@Transactional
	public RetornoDTO cadastrar(ClienteCadastroDTO dto) {
		try {
			ModelMapper modelMapper = ModelMapperConfig.configureModelMapper();
            Cliente cliente = modelMapper.map(dto, Cliente.class);
            
            Endereco endereco = enderecoService.cadastrar(dto.getEndereco());
            cliente.setEndereco(endereco);
            
		    cliente.setPets(tratarCadastroClientePet(dto.getPets(), cliente));
		    cliente.setDataCadastro(LocalDate.now());

		    Cliente clienteCadastrado = clienteRepository.save(cliente);
		    
		    return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Cliente cadastrado com sucesso!").comObjeto(clienteCadastrado).construir();
		} catch (Exception e){
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
		}
	}

    public RetornoDTO buscarPorId(Long id) {
        try {
            Optional<Cliente> optCliente = this.clienteRepository.findById(id);

            if(optCliente.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Cliente recuperado com sucesso!").comObjeto(optCliente.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Cliente não encontrado!").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO buscarPorCpf(String cpf) {
        try {
            Optional<Cliente> optCliente = this.clienteRepository.findByCpf(cpf);

            if(optCliente.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Cliente recuperado com sucesso!").comObjeto(optCliente.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Cliente não encontrado!").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    @Transactional
    public RetornoDTO atualizar(ClienteEdicaoDTO dto) {
        try {
        	Cliente cliente = clienteRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        	
        	// Atualiza os campos básicos
        	ModelMapper modelMapper = ModelMapperConfig.configureModelMapper();
            modelMapper.map(dto, cliente);
            
            // Atualiza o endereço
        	enderecoService.atualizar(dto.getEndereco(), cliente);
            
            tratarEdicaoPets(cliente, dto.getPetsAtualizados());

            Cliente clienteCadastrado = clienteRepository.save(cliente);

            return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Cliente atualizado com sucesso!").comObjeto(clienteCadastrado).construir();
        } catch (Exception e){
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    @Transactional
    public RetornoDTO excluir(Long id) {
        try {            
            Cliente cliente = clienteRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado!"));

            clienteRepository.delete(cliente);
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Cliente excluído com sucesso!").construir();
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO buscarPaginado(ClientePesquisaDTO dto) {
    	try {    		
    		String nome = null;
    		String cpf = null;
    		String genero = null;
    		
    		if(Objects.nonNull(dto.getNome())) {
    			nome = dto.getNome();
    		}
    		if(Objects.nonNull(dto.getCpf())) {
    			cpf = dto.getCpf();
    		}
    		if(Objects.nonNull(dto.getGenero())) {
    			genero = dto.getGenero();
    		}
    		
    		Pageable pageable = PageRequest.of(dto.getPage(), dto.getPageSize(), Sort.by(Direction.fromString(dto.getOrderingDirection()), dto.getOrderingField()));
    		Page<ClienteRetornoPaginadoDTO> clientePage = clienteRepository.findByNomeAndCpfAndGenero(nome, cpf, genero, pageable);
    		
            Long totalElements = clienteRepository.countRegistrosCliente(nome, cpf, genero);
            
            if(!clientePage.isEmpty()) {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de clientes recuperado com sucesso!").comObjeto(clientePage.getContent()).comPaginacao(dto.getPage(), dto.getPageSize(), clientePage.getTotalPages(), totalElements, dto.getOrderingField(), dto.getOrderingDirection()).construir();
            } else {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de cliente encontrado!").construir();
            }
        } catch (Exception e) {
            return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO buscarLista() {
        try {
            List<IdDescricao> produtoList  = this.clienteRepository.getClienteList();

            if(!produtoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de cliente recuperada com sucesso!").comObjeto(produtoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de cliente não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }

    private List<Pet> tratarCadastroClientePet(List<PetCadastroDTO> petsDto, Cliente cliente) {
        if (petsDto == null) return new ArrayList<>();

        return petsDto.stream()
            .map(dto -> {
                Pet pet = new Pet();
                pet.setNome(dto.getNome());
                pet.setDataNascimento(dto.getDataNascimento());
                pet.setPeso(dto.getPeso());

                if(Objects.nonNull(dto.getIdTipo())) {
                	pet.setTipo(tipoPetRepository.findById(dto.getIdTipo())
                            .orElseThrow(() -> new RuntimeException("Tipo de pet inválido")));
                }

                if(Objects.nonNull(dto.getIdRaca())) {
                	pet.setRaca(racaPetRepository.findById(dto.getIdRaca())
                        .orElseThrow(() -> new RuntimeException("Raça de pet inválida")));
                }
                
                if(Objects.nonNull(dto.getIdPorte())) {
                	pet.setPorte(portePetRepository.findById(dto.getIdPorte())
                        .orElseThrow(() -> new RuntimeException("Porte de pet inválido")));
                }
                
                if(Objects.nonNull(pet.getNome())) {
                	pet.setCliente(cliente);
                    return pet;
                }
				return null;                
            })
            .collect(Collectors.toList());
    }

    private void tratarEdicaoPets(Cliente cliente, List<PetEdicaoDTO> petsDto) {
        if (petsDto == null) petsDto = new ArrayList<>();
        final List<PetEdicaoDTO> petsDtoFinal = petsDto;

        List<Pet> petsAtuais = cliente.getPets();

        // 1. Remove pets que não estão mais na lista recebida
        petsAtuais.removeIf(petAtual ->
            petsDtoFinal.stream()
                .noneMatch(dto -> dto.getId() != null && dto.getId().equals(petAtual.getId()))
        );

        // 2. Atualiza existentes ou adiciona novos
        for (PetEdicaoDTO petDTO : petsDtoFinal) {
            if (petDTO.getId() != null) {
                // Pet existente: atualizar
                Pet petExistente = petsAtuais.stream()
                        .filter(p -> p.getId().equals(petDTO.getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Pet com ID " + petDTO.getId() + " não pertence ao cliente"));

                petExistente.setNome(petDTO.getNome());
                petExistente.setDataNascimento(petDTO.getDataNascimento());
                petExistente.setPeso(petDTO.getPeso());
                
                if(Objects.nonNull(petDTO.getIdTipo())) {
                	petExistente.setTipo(tipoPetRepository.findById(petDTO.getIdTipo())
                            .orElseThrow(() -> new RuntimeException("Tipo inválido")));
                }
                
                if(Objects.nonNull(petDTO.getIdRaca())) {
                	petExistente.setRaca(racaPetRepository.findById(petDTO.getIdRaca())
                            .orElseThrow(() -> new RuntimeException("Raça inválida")));
                }
                
                if(Objects.nonNull(petDTO.getIdPorte())) {
                	petExistente.setPorte(portePetRepository.findById(petDTO.getIdPorte())
                            .orElseThrow(() -> new RuntimeException("Porte inválido")));
                }            
            } else {
                // Novo pet
                Pet novoPet = new Pet();
                novoPet.setId(null); // segurança: evita sobrescrever ID gerado
                novoPet.setNome(petDTO.getNome());
                novoPet.setDataNascimento(petDTO.getDataNascimento());
                
                if(Objects.nonNull(petDTO.getIdTipo())) {
                	novoPet.setTipo(tipoPetRepository.findById(petDTO.getIdTipo())
                            .orElseThrow(() -> new RuntimeException("Tipo de pet inválido")));
                }

                if(Objects.nonNull(petDTO.getIdRaca())) {
                	novoPet.setRaca(racaPetRepository.findById(petDTO.getIdRaca())
                        .orElseThrow(() -> new RuntimeException("Raça de pet inválida")));
                }
                
                if(Objects.nonNull(petDTO.getIdPorte())) {
                	novoPet.setPorte(portePetRepository.findById(petDTO.getIdPorte())
                        .orElseThrow(() -> new RuntimeException("Porte de pet inválido")));
                }
                
                if(Objects.nonNull(novoPet.getNome())) {
                	novoPet.setCliente(cliente);
                    petsAtuais.add(novoPet);
                }            
            }
        }
    }
    
    public RetornoDTO buscarListaPetsAniversarioProximo() {
        try {
            LocalDate hoje = LocalDate.now();
            LocalDate dataLimite = hoje.plusDays(7);

            List<Pet> todosPets = this.petRepository.findAll();

            List<PetAniversarioDTO> aniversariantes = todosPets.stream()
                .filter(pet -> {
                	if(Objects.nonNull(pet.getDataNascimento()) && Objects.nonNull(pet.getNome())) {
                		MonthDay nascimento = MonthDay.from(pet.getDataNascimento());
                        MonthDay hojeMd = MonthDay.from(hoje);
                        MonthDay limiteMd = MonthDay.from(dataLimite);

                        // Se a dataLimite ultrapassar o fim do ano, considerar dois intervalos
                        if (limiteMd.isBefore(hojeMd)) {
                            return !nascimento.isBefore(hojeMd) || !nascimento.isAfter(limiteMd);
                        } else {
                            return !nascimento.isBefore(hojeMd) && !nascimento.isAfter(limiteMd);
                        }
                	}
                	
                	return false;
                })
                .map(pet -> new PetAniversarioDTO(
                    pet.getId(),
                    pet.getNome(),
                    pet.getDataNascimento(),
                    pet.getCliente().getId(),
                    pet.getCliente().getNome(),
                    pet.getCliente().getCelular()
                ))
                .sorted(Comparator.comparing(p -> MonthDay.from(p.getDataNascimento())))
                .toList();

            if (!aniversariantes.isEmpty()) {
                return new RetornoBuilder()
                    .comCodigoMensagem(HttpStatus.OK.value())
                    .comMensagem("Lista de pet com aniversário próximo encontrada.")
                    .comObjeto(aniversariantes)
                    .construir();
            } else {
                return new RetornoBuilder()
                    .comCodigoMensagem(HttpStatus.NOT_FOUND.value())
                    .comMensagem("Nenhum pet com aniversário próximo.")
                    .construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder()
                .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .comObjeto(e)
                .construir();
        }
    }
    
    public RetornoDTO buscarListaPetPorId(Long idCliente) {
        try {
            List<IdDescricao> petClienteList  = this.petRepository.findAllByClienteId(idCliente);

            if(!petClienteList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de pet do cliente recuperada com sucesso!").comObjeto(petClienteList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de pet do cliente não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
    
    public RetornoDTO buscarClientePorIdPet(Long idPet) {
        try {
            Optional<Cliente> optCliente = this.clienteRepository.findByIdPet(idPet);

            if(optCliente.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Cliente recuperado com sucesso!").comObjeto(optCliente.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Cliente não encontrado!").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }

}
