package br.com.anagropets.service.produto;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
import br.com.anagropets.dto.auxiliar.IdDescricao;
import br.com.anagropets.dto.produto.ProdutoCadastroDTO;
import br.com.anagropets.dto.produto.ProdutoEdicaoDTO;
import br.com.anagropets.dto.produto.ProdutoEstoqueAtualizacaoDTO;
import br.com.anagropets.dto.produto.ProdutoPesquisaDTO;
import br.com.anagropets.dto.produto.ProdutoRetornoPaginadoDTO;
import br.com.anagropets.model.auxiliar.UnidadeMedida;
import br.com.anagropets.model.estoque.Estoque;
import br.com.anagropets.model.produto.CategoriaProduto;
import br.com.anagropets.model.produto.Produto;
import br.com.anagropets.repository.auxiliar.UnidadeMedidaRepository;
import br.com.anagropets.repository.produto.CategoriaProdutoRepository;
import br.com.anagropets.repository.produto.ProdutoRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import br.com.anagropets.util.RetornoPaginadoBuilder;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProdutoService {
	
	private final ProdutoRepository produtoRepository;
	private final CategoriaProdutoRepository categoriaProdutoRepository;
	private final UnidadeMedidaRepository unidadeMedidaRepository;

	public ProdutoService(ProdutoRepository produtoRepository, CategoriaProdutoRepository categoriaProdutoRepository, UnidadeMedidaRepository unidadeMedidaRepository) {
		super();
		this.produtoRepository = produtoRepository;
		this.categoriaProdutoRepository = categoriaProdutoRepository;
		this.unidadeMedidaRepository = unidadeMedidaRepository;
	}
	
	@Transactional
    public RetornoDTO cadastrar(ProdutoCadastroDTO dto) {
        try {
        	 if (produtoDuplicado(dto.getNome(), dto.getIdUnidadeMedida(), null)) {
                 return new RetornoBuilder()
                     .comCodigoMensagem(HttpStatus.CONFLICT.value())
                     .comMensagem("Já existe um produto com esse nome ou com esse nome e unidade de medida.")
                     .construir();
             }        	
        	
        	ModelMapper modelMapper = ModelMapperConfig.configureModelMapper();
            Produto produto = modelMapper.map(dto, Produto.class);
            
            tratarCadastroCategoriaProduto(dto, produto);
            tratarCadastroEstoqueProduto(dto, produto);
            tratarCadastroUnidadeMedidaProduto(dto, produto);
        	
            Produto produtoCadastrado = produtoRepository.save(produto);

            return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Produto cadastrado com sucesso!").comObjeto(produtoCadastrado).construir();
        } catch (Exception e){
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarPorId(Long id) {
        try {
            Optional<Produto> optProduto = this.produtoRepository.findById(id);

            if(optProduto.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Produto recuperado com sucesso!").comObjeto(optProduto.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Produto não encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	@Transactional
    public RetornoDTO atualizar(ProdutoEdicaoDTO dto) {
		try {
			if (produtoDuplicado(dto.getNome(), dto.getIdUnidadeMedida(), dto.getId())) {
	            return new RetornoBuilder()
	                .comCodigoMensagem(HttpStatus.CONFLICT.value())
	                .comMensagem("Já existe um produto com esse nome ou com esse nome e unidade de medida.")
	                .construir();
	        }
			
			Produto produto = buscarProduto(dto.getId());
			
			ModelMapper modelMapper = ModelMapperConfig.configureModelMapper();
			produto = modelMapper.map(dto, Produto.class);
			
	        tratarEdicaoCategoriaUnidadeProduto(produto, dto);
	        tratatEdicaoEstoqueProduto(produto, dto);
        	
            Produto produtoCadastrado = produtoRepository.save(produto);

            return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Produto atualizado com sucesso!").comObjeto(produtoCadastrado).construir();
        } catch (Exception e){
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO excluir(Long id) {
        try {
            Optional<Produto> optProduto = this.produtoRepository.findById(id);

            if(optProduto.isPresent()) {
            	this.produtoRepository.delete(optProduto.get());
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Produto excluído com sucesso!").construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Produto não encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarPaginado(ProdutoPesquisaDTO dto) {
    	try {    		
    		String nome = null;
    		Long idCategoria = null;
    		
    		if(Objects.nonNull(dto.getNome())) {
    			nome = dto.getNome();
    		}
    		if(Objects.nonNull(dto.getIdCategoria())) {
    			idCategoria = dto.getIdCategoria();
    		}
    		
    		Pageable pageable = PageRequest.of(dto.getPage(), dto.getPageSize(), Sort.by(Direction.fromString(dto.getOrderingDirection()), dto.getOrderingField()));
    		Page<ProdutoRetornoPaginadoDTO> produtoPage = produtoRepository.findByNomeAndCategoria(nome, idCategoria, pageable);
    		
            Long totalElements = produtoRepository.countRegistrosProduto(nome, idCategoria);
            
            if(!produtoPage.isEmpty()) {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de produtos recuperado com sucesso!").comObjeto(produtoPage.getContent()).comPaginacao(dto.getPage(), dto.getPageSize(), produtoPage.getTotalPages(), totalElements, dto.getOrderingField(), dto.getOrderingDirection()).construir();
            } else {
                return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Nenhum registro de produto encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoPaginadoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarLista() {
        try {
            List<IdDescricao> produtoList  = this.produtoRepository.getProdutoList();

            if(!produtoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de produto recuperada com sucesso!").comObjeto(produtoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de produto não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO atualizarEstoque(ProdutoEstoqueAtualizacaoDTO dto) {
        try {
            Optional<Produto> optProduto = this.produtoRepository.findById(dto.getIdProduto());

            if(optProduto.isPresent()) {
            	Produto produto = optProduto.get();
            	
            	Estoque estoque = produto.getEstoque();
            	estoque.setDataUltimaAtualizacao(LocalDateTime.now());
            	estoque.setQuantidadeDisponivel(dto.getQuantidadeDisponivelEstoque());
            	
            	 if(Objects.nonNull(dto.getQuantidadeMinimaEstoque())) {
                 	estoque.setQuantidadeMinima(dto.getQuantidadeMinimaEstoque());
                 } else {
                 	estoque.setQuantidadeMinima(1);
                 }
            	 
            	 produto.setEstoque(estoque);
             	
                 Produto produtoCadastrado = produtoRepository.save(produto);
            	
                 return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Estoque do produto atualizado com sucesso!").comObjeto(produtoCadastrado).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Produto não encontrado.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarListaEstoqueBaixo() {
        try {
            List<Produto> produtoList  = this.produtoRepository.getProdutoEstoqueBaixoList(5);

            if(!produtoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de produto recuperada com sucesso!").comObjeto(produtoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de produto não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarListaVencimentoProximo() {
        try {
        	LocalDate hoje = LocalDate.now();
        	LocalDate dataLimite = hoje.plusDays(7);
            List<Produto> produtoList  = this.produtoRepository.getProdutoVencimentoProximoList(hoje, dataLimite);

            if(!produtoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de produto recuperada com sucesso!").comObjeto(produtoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de produto não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	private void tratarCadastroCategoriaProduto(ProdutoCadastroDTO dto, Produto produto) {
		CategoriaProduto categoriaProduto = categoriaProdutoRepository.findById(dto.getIdCategoria())
	                .orElseThrow(() -> new RuntimeException("Categoria do produto não encontrada."));       
    	
		produto.setCategoria(categoriaProduto);
	}
	
	private void tratarCadastroEstoqueProduto(ProdutoCadastroDTO dto, Produto produto) {
		Estoque estoque = new Estoque();
    	estoque.setDataUltimaAtualizacao(LocalDateTime.now());
        estoque.setQuantidadeDisponivel(dto.getQuantidadeDisponivelEstoque());
        
        if(Objects.nonNull(dto.getQuantidadeMinimaEstoque())) {
        	estoque.setQuantidadeMinima(dto.getQuantidadeMinimaEstoque());
        } else {
        	estoque.setQuantidadeMinima(1);
        }
        
        produto.setEstoque(estoque);
	}
	
	private void tratarCadastroUnidadeMedidaProduto(ProdutoCadastroDTO dto, Produto produto) {
        UnidadeMedida unidadeMedida = unidadeMedidaRepository.findById(dto.getIdUnidadeMedida())
                .orElseThrow(() -> new RuntimeException("Unidade de medida não encontrada."));

        produto.setUnidadeMedida(unidadeMedida);
        produto.setQuantidadePorMedida(dto.getQuantidadePorMedida());
	}
	
	private Produto buscarProduto(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com ID: " + id));
    }
	
	private void tratarEdicaoCategoriaUnidadeProduto(Produto produto, ProdutoEdicaoDTO dto) {
        CategoriaProduto categoria = categoriaProdutoRepository.findById(dto.getIdCategoria())
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com ID: " + dto.getIdCategoria()));
        produto.setCategoria(categoria);

        UnidadeMedida unidade = unidadeMedidaRepository.findById(dto.getIdUnidadeMedida())
                .orElseThrow(() -> new EntityNotFoundException("Unidade de medida não encontrada com ID: " + dto.getIdUnidadeMedida()));
        produto.setUnidadeMedida(unidade);
    }
	
	private void tratatEdicaoEstoqueProduto(Produto produto, ProdutoEdicaoDTO dto) {
        Estoque estoque = produto.getEstoque();
        if (estoque == null) {
            estoque = new Estoque();
        }

        estoque.setQuantidadeDisponivel(dto.getQuantidadeDisponivelEstoque());
        estoque.setQuantidadeMinima(dto.getQuantidadeMinimaEstoque());
        estoque.setDataUltimaAtualizacao(LocalDateTime.now());

        produto.setEstoque(estoque);
    }

	private boolean produtoDuplicado(String nome, Long unidadeMedidaId, Long idAtual) {
	    UnidadeMedida unidade = unidadeMedidaRepository.findById(unidadeMedidaId)
	        .orElseThrow(() -> new IllegalArgumentException("Unidade de medida não encontrada"));

	    // Cenário de cadastro
	    if (idAtual == null) {
	        boolean mesmoNome = produtoRepository.findByNomeIgnoreCase(nome).isPresent();
	        boolean mesmoNomeEUnidade = produtoRepository
	            .findByNomeIgnoreCaseAndUnidadeMedida(nome, unidade)
	            .isPresent();
	        return mesmoNome || mesmoNomeEUnidade;
	    }

	    // Cenário de edição
	    boolean mesmoNome = produtoRepository
	        .findByNomeIgnoreCase(nome)
	        .filter(p -> !p.getId().equals(idAtual)) // exclui o próprio
	        .isPresent();

	    boolean mesmoNomeEUnidade = produtoRepository
	        .findByNomeIgnoreCaseAndUnidadeMedidaAndIdNot(nome, unidade, idAtual)
	        .isPresent();

	    return mesmoNome || mesmoNomeEUnidade;
	}
	
}
