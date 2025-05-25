package br.com.anagropets.service.registrovenda;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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
import br.com.anagropets.dto.registrovenda.ItemVendaCadastroDTO;
import br.com.anagropets.dto.registrovenda.ItemVendaEdicaoDTO;
import br.com.anagropets.dto.registrovenda.RegistroVendaCadastroDTO;
import br.com.anagropets.dto.registrovenda.RegistroVendaEdicaoDTO;
import br.com.anagropets.dto.registrovenda.RegistroVendaPesquisaDTO;
import br.com.anagropets.dto.registrovenda.RegistroVendaRetornoPaginadoDTO;
import br.com.anagropets.model.auxiliar.MetodoPagamento;
import br.com.anagropets.model.auxiliar.StatusPagamento;
import br.com.anagropets.model.auxiliar.UnidadeMedida;
import br.com.anagropets.model.cliente.Cliente;
import br.com.anagropets.model.estoque.Estoque;
import br.com.anagropets.model.produto.Produto;
import br.com.anagropets.model.registrovenda.ItemVenda;
import br.com.anagropets.model.registrovenda.Pagamento;
import br.com.anagropets.model.registrovenda.RegistroVenda;
import br.com.anagropets.repository.auxiliar.MetodoPagamentoRepository;
import br.com.anagropets.repository.auxiliar.StatusPagamentoRepository;
import br.com.anagropets.repository.auxiliar.UnidadeMedidaRepository;
import br.com.anagropets.repository.cliente.ClienteRepository;
import br.com.anagropets.repository.estoque.EstoqueRepository;
import br.com.anagropets.repository.produto.ProdutoRepository;
import br.com.anagropets.repository.registrovenda.RegistroVendaRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import br.com.anagropets.util.RetornoPaginadoBuilder;

@Service
public class RegistroVendaService {

	private final RegistroVendaRepository registroVendaRepository;
	private final ClienteRepository clienteRepository;
	private final ProdutoRepository produtoRepository;
	private final UnidadeMedidaRepository unidadeMedidaRepository;
	private final MetodoPagamentoRepository metodoPagamentoRepository;
	private final StatusPagamentoRepository statusPagamentoRepository;
	private final EstoqueRepository estoqueRepository;

	public RegistroVendaService(RegistroVendaRepository registroVendaRepository, ClienteRepository clienteRepository,
			ProdutoRepository produtoRepository, UnidadeMedidaRepository unidadeMedidaRepository,
			MetodoPagamentoRepository metodoPagamentoRepository, StatusPagamentoRepository statusPagamentoRepository,
			EstoqueRepository estoqueRepository) {
		super();
		this.registroVendaRepository = registroVendaRepository;
		this.clienteRepository = clienteRepository;
		this.produtoRepository = produtoRepository;
		this.unidadeMedidaRepository = unidadeMedidaRepository;
		this.metodoPagamentoRepository = metodoPagamentoRepository;
		this.statusPagamentoRepository = statusPagamentoRepository;
		this.estoqueRepository = estoqueRepository;
	}
	
	@Transactional
    public RetornoDTO cadastrar(RegistroVendaCadastroDTO dto) {
		try {
			Cliente cliente = buscarCliente(dto.getIdCliente());

		    RegistroVenda registroVenda = new RegistroVenda();
		    registroVenda.setCliente(cliente);
		    registroVenda.setDataVenda(LocalDateTime.now());

		    List<ItemVenda> itens = tratarCadastroItensVenda(dto.getItemVendaList(), registroVenda);
		    registroVenda.setItens(itens);

		    BigDecimal valorTotal = calcularValorTotal(itens);
		    registroVenda.setValorTotal(valorTotal);
		    BigDecimal lucroVenda = calcularLucroVenda(itens);
		    registroVenda.setLucro(lucroVenda);
		    
		    Pagamento pagamento = tratarCadastroPagamento(dto, valorTotal);
		    pagamento.setRegistroVenda(registroVenda);
		    registroVenda.setPagamento(pagamento);
	    	
	    	RegistroVenda registroVendaGravado = registroVendaRepository.save(registroVenda);
	    	
	    	return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Registro de venda cadastrado com sucesso!").comObjeto(registroVendaGravado).construir();
		}
		catch (Exception e) {
			// Monta o retorno (opcional, útil para logs)
	        RetornoDTO erro = new RetornoBuilder()
	            .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
	            .comMensagem("Erro ao cadastrar registro de venda.")
	            .comObjeto(e)
	            .construir();

	        // Relança para forçar rollback
	        throw new RuntimeException("Erro ao cadastrar venda", e);
		}
	}

	@Transactional
	public RetornoDTO atualizar(RegistroVendaEdicaoDTO dto) {
		try {
			RegistroVenda registroVendaExistente = buscarRegistroVenda(dto.getId());
		    Cliente cliente = buscarCliente(dto.getIdCliente());

		    // Atualizar cliente e data
		    registroVendaExistente.setCliente(cliente);
		    registroVendaExistente.setDataVenda(LocalDateTime.now());

		    // Substitui os itens com segurança, atualizando e validando o estoque
		    substituirItensVenda(registroVendaExistente, dto.getItemVendaAtualizadoList());

		    // Recalcula o valor total e o lucro de venda
		    BigDecimal novoValorTotal = calcularValorTotal(registroVendaExistente.getItens());
		    registroVendaExistente.setValorTotal(novoValorTotal);
		    BigDecimal novoLucroVenda = calcularLucroVenda(registroVendaExistente.getItens());
		    registroVendaExistente.setLucro(novoLucroVenda);

		    // Atualizar dados do pagamento
		    tratarEdicaoPagamento(registroVendaExistente.getPagamento(), dto, novoValorTotal);
			    
			RegistroVenda registroVendaAtualizado = registroVendaRepository.save(registroVendaExistente);
			    
			return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Registro de venda atualizado com sucesso!").comObjeto(registroVendaAtualizado) .construir();
		} catch (Exception e) {
			RetornoDTO erro = new RetornoBuilder()
		            .comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value())
		            .comMensagem("Erro ao atualizar registro de venda.")
		            .comObjeto(e)
		            .construir();

		    throw new RuntimeException("Erro ao atualizar venda", e);
		}
	}

	public RetornoDTO buscarPorId(Long id) {
        try {
            Optional<RegistroVenda> optRegistroVenda = this.registroVendaRepository.findById(id);

            if(optRegistroVenda.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Registro de venda recuperado com sucesso!").comObjeto(optRegistroVenda.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Registro de venda não encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }

	@Transactional
	public RetornoDTO excluir(Long id) {
        try {
        	RegistroVenda registroVenda = buscarRegistroVenda(id);
        	
        	reporEstoqueDosItens(registroVenda);
            desvincularItensDaVenda(registroVenda);
            desvincularPagamentoDaVenda(registroVenda);
        	
            this.registroVendaRepository.delete(registroVenda);
            
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Registro de venda excluído com sucesso!").construir();
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarPorIdCliente(Long idCliente) {
        try {
            Optional<RegistroVenda> optRegistroVenda = this.registroVendaRepository.findByIdCliente(idCliente);

            if(optRegistroVenda.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Registro de venda recuperado com sucesso!").comObjeto(optRegistroVenda.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Registro de venda com o ID informado não encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarPaginado(RegistroVendaPesquisaDTO dto) {
    	try {    		
    		String nomeCliente = null;
    		LocalDateTime dataInicial = null;
    		LocalDateTime dataFinal = null;
    		
    		if(Objects.nonNull(dto.getNomeCliente())) {
    			nomeCliente = dto.getNomeCliente();
    		}
    		if(Objects.nonNull(dto.getDataInicial())) {    			
    			dataInicial = (dto.getDataInicial() != null) ? dto.getDataInicial().atStartOfDay() : null;
    		}
    		if(Objects.nonNull(dto.getDataFinal())) {
    			dataFinal = (dto.getDataFinal() != null) ? dto.getDataFinal().atTime(23, 59, 59) : null;
    		}
    		
    		Pageable pageable = PageRequest.of(dto.getPage(), dto.getPageSize(), Sort.by(Direction.fromString(dto.getOrderingDirection()), dto.getOrderingField()));
    		Page<RegistroVendaRetornoPaginadoDTO> registroVendaPage = registroVendaRepository.findByNomeClienteAndDataVenda(nomeCliente, dataInicial, dataFinal, pageable);
    		
            Long totalElements = registroVendaRepository.countRegistrosVenda(nomeCliente, dataInicial, dataFinal);
            
            if(!registroVendaPage.isEmpty()) {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de registros de venda recuperado com sucesso!").comObjeto(registroVendaPage.getContent()).comPaginacao(dto.getPage(), dto.getPageSize(), registroVendaPage.getTotalPages(), totalElements, dto.getOrderingField(), dto.getOrderingDirection()).construir();
            } else {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de venda encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	private List<ItemVenda> tratarCadastroItensVenda(List<ItemVendaCadastroDTO> dtoList, RegistroVenda venda) {
		ModelMapper modelMapper = ModelMapperConfig.configureModelMapper();
	    List<ItemVenda> itens = new ArrayList<>();

	    for (ItemVendaCadastroDTO dto : dtoList) {
	        Produto produto = produtoRepository.findById(dto.getIdProduto())
	            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
	        UnidadeMedida unidade = unidadeMedidaRepository.findById(dto.getIdUnidadeMedidaVenda())
	            .orElseThrow(() -> new RuntimeException("Unidade de medida não encontrada"));

	        validarEstoqueDisponivel(produto, dto.getQuantidade());
	        atualizarEstoque(produto, dto.getQuantidade());
	        
	        BigDecimal quantidade = BigDecimal.valueOf(dto.getQuantidade());

	        ItemVenda item = modelMapper.map(dto, ItemVenda.class);
	        item.setProduto(produto);
	        item.setUnidadeMedidaVenda(unidade);
	        item.setQuantidade(dto.getQuantidade());
	        item.setPrecoUnitarioVenda(dto.getPrecoUnitario());
	        item.setSubtotal(dto.getPrecoUnitario().multiply(quantidade).setScale(2, RoundingMode.HALF_UP)); // Arredondar para duas casas decimais (padrão financeiro)
	        item.setPrecoUnitarioCusto(produto.getPrecoCusto());
	        item.setMargemLucro(produto.getMargemLucro());
	        item.setLucro(calcularLucroItemVenda(item));
	        item.setRegistroVenda(venda);

	        itens.add(item);
	    }

	    return itens;
	}
	
	private Pagamento tratarCadastroPagamento(RegistroVendaCadastroDTO dto, BigDecimal valorTotal) {
	    MetodoPagamento metodo = metodoPagamentoRepository.findById(dto.getIdMetodoPagamento())
	        .orElseThrow(() -> new RuntimeException("Método de pagamento não encontrado!"));

	    // Status fixo: "Confirmado"
	    StatusPagamento status = statusPagamentoRepository.findByDescricaoIgnoreCase("Confirmado")
	        .orElseThrow(() -> new RuntimeException("Status de pagamento 'Confirmado' não encontrado!"));

	    Pagamento pagamento = new Pagamento();
	    pagamento.setMetodoPagamento(metodo);
	    pagamento.setParcelas(dto.getParcelasPagamento());
	    pagamento.setStatusPagamento(status);
	    pagamento.setValorPago(valorTotal);
	    pagamento.setDataPagamento(LocalDateTime.now());

	    return pagamento;
	}

	private void substituirItensVenda(RegistroVenda venda, List<ItemVendaEdicaoDTO> novosItensDto) {
	    List<ItemVenda> itensAtuais = new ArrayList<>(venda.getItens());
	    venda.getItens().clear();

	    // Repor estoque e desvincular itens antigos
	    for (ItemVenda item : itensAtuais) {
	        Produto produto = item.getProduto();
	        Estoque estoque = produto.getEstoque();
	        estoque.setQuantidadeDisponivel(estoque.getQuantidadeDisponivel() + item.getQuantidade());
	        estoque.setDataUltimaAtualizacao(LocalDateTime.now());
	        estoqueRepository.save(estoque);

	        item.setRegistroVenda(null);
	    }

	    // Criar e adicionar novos itens
	    for (ItemVendaEdicaoDTO dto : novosItensDto) {
	        Produto produto = produtoRepository.findById(dto.getIdProduto())
	            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
	        UnidadeMedida unidade = unidadeMedidaRepository.findById(dto.getIdUnidadeMedidaVenda())
	            .orElseThrow(() -> new RuntimeException("Unidade de medida não encontrada"));

	        validarEstoqueDisponivel(produto, dto.getQuantidade());
	        atualizarEstoque(produto, dto.getQuantidade());
	        
	        BigDecimal quantidade = BigDecimal.valueOf(dto.getQuantidade());

	        ItemVenda novoItem = new ItemVenda();
	        novoItem.setProduto(produto);
	        novoItem.setUnidadeMedidaVenda(unidade);
	        novoItem.setQuantidade(dto.getQuantidade());
	        novoItem.setPrecoUnitarioVenda(dto.getPrecoUnitario());
	        novoItem.setSubtotal(dto.getPrecoUnitario().multiply(quantidade).setScale(2, RoundingMode.HALF_UP)); // Arredondar para duas casas decimais (padrão financeiro)
	        novoItem.setPrecoUnitarioCusto(produto.getPrecoCusto());
	        novoItem.setMargemLucro(produto.getMargemLucro());
	        novoItem.setLucro(calcularLucroItemVenda(novoItem));
	        novoItem.setRegistroVenda(venda);

	        venda.getItens().add(novoItem);
	    }
	}

	private void tratarEdicaoPagamento(Pagamento pagamento, RegistroVendaEdicaoDTO dto, BigDecimal valorTotal) {
	    MetodoPagamento metodo = metodoPagamentoRepository.findById(dto.getIdMetodoPagamento())
	        .orElseThrow(() -> new RuntimeException("Método de pagamento não encontrado"));
	    StatusPagamento status = statusPagamentoRepository.findByDescricaoIgnoreCase("Confirmado")
	        .orElseThrow(() -> new RuntimeException("Status de pagamento 'Confirmado' não encontrado"));

	    pagamento.setMetodoPagamento(metodo);
	    pagamento.setParcelas(dto.getParcelasPagamento());
	    pagamento.setStatusPagamento(status);
	    pagamento.setValorPago(valorTotal);
	    pagamento.setDataPagamento(LocalDateTime.now());
	}

	private RegistroVenda buscarRegistroVenda(Long id) {
	    return registroVendaRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Registro de venda não encontrado!"));
	}
	
	private Cliente buscarCliente(Long idCliente) {
	    return clienteRepository.findById(idCliente)
	        .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));
	}

	private void validarEstoqueDisponivel(Produto produto, int quantidadeSolicitada) {
	    int disponivel = produto.getEstoque().getQuantidadeDisponivel();
	    if (disponivel < quantidadeSolicitada) {
	        throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
	    }
	}
	
	@Transactional
	private void atualizarEstoque(Produto produto, int quantidadeVendida) {
	    Estoque estoque = produto.getEstoque();
	    estoque.setQuantidadeDisponivel(estoque.getQuantidadeDisponivel() - quantidadeVendida);
	    estoque.setDataUltimaAtualizacao(LocalDateTime.now());
	    estoqueRepository.save(estoque);
	}
	
	private BigDecimal calcularValorTotal(List<ItemVenda> itens) {
	    return itens.stream()
	        .map(ItemVenda::getSubtotal)
	        .reduce(BigDecimal.ZERO, BigDecimal::add)
	        .setScale(2, RoundingMode.HALF_UP); // garantir duas casas decimais (padrão financeiro)
	}

	private void reporEstoqueDosItens(RegistroVenda venda) {
	    for (ItemVenda item : venda.getItens()) {
	        Produto produto = item.getProduto();
	        Estoque estoque = produto.getEstoque();
	        estoque.setQuantidadeDisponivel(estoque.getQuantidadeDisponivel() + item.getQuantidade());
	        estoque.setDataUltimaAtualizacao(LocalDateTime.now());
	        estoqueRepository.save(estoque);
	    }
	}
	
	private void desvincularItensDaVenda(RegistroVenda venda) {
	    for (ItemVenda item : venda.getItens()) {
	        item.setRegistroVenda(null); // Quebra a ligação bidirecional
	    }
	    venda.getItens().clear(); // Gatilha o orphanRemoval no JPA
	}

	private void desvincularPagamentoDaVenda(RegistroVenda venda) {
	    if (venda.getPagamento() != null) {
	        venda.getPagamento().setRegistroVenda(null);
	        venda.setPagamento(null); // Cascade.ALL + orphanRemoval cuidam da exclusão
	    }
	}
	
	private BigDecimal calcularLucroItemVenda(ItemVenda itemVenda) {
	    BigDecimal precoCusto = itemVenda.getPrecoUnitarioCusto();
	    BigDecimal precoVenda = itemVenda.getPrecoUnitarioVenda();
	    BigDecimal quantidade = BigDecimal.valueOf(itemVenda.getQuantidade());

	    BigDecimal valorInicial = precoCusto.multiply(quantidade);
	    BigDecimal valorFinal = precoVenda.multiply(quantidade);

	    return valorFinal.subtract(valorInicial).setScale(2, RoundingMode.HALF_UP);
	}

	
	private BigDecimal calcularLucroVenda(List<ItemVenda> itens) {
	    return itens.stream()
	        .map(ItemVenda::getLucro)
	        .reduce(BigDecimal.ZERO, BigDecimal::add)
	        .setScale(2, RoundingMode.HALF_UP); // garantir duas casas decimais (padrão financeiro)
	}
}
