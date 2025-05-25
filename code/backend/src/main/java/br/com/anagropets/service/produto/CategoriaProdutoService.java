package br.com.anagropets.service.produto;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.com.anagropets.model.produto.CategoriaProduto;
import br.com.anagropets.repository.produto.CategoriaProdutoRepository;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;

@Service
public class CategoriaProdutoService {
	
	private final CategoriaProdutoRepository categoriaProdutoRepository;

	public CategoriaProdutoService(CategoriaProdutoRepository categoriaProdutoRepository) {
		super();
		this.categoriaProdutoRepository = categoriaProdutoRepository;
	}
	
	public RetornoDTO buscarLista() {
        try {
            List<CategoriaProduto> categoriaProdutoList  = this.categoriaProdutoRepository.findAll();

            if(!categoriaProdutoList.isEmpty()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Lista de categorias de produto recuperada com sucesso!").comObjeto(categoriaProdutoList).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Lista de categorias de produto não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }
	
	public RetornoDTO buscarPorId(Long id) {
        try {
            Optional<CategoriaProduto> optCategoriaProduto = this.categoriaProdutoRepository.findById(id);

            if(optCategoriaProduto.isPresent()) {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Categoria de produto recuperada com sucesso!").comObjeto(optCategoriaProduto.get()).construir();
            } else {
                return new RetornoBuilder().comCodigoMensagem(HttpStatus.NOT_FOUND.value()).comMensagem("Categoria de produto não encontrada.").construir();
            }
        } catch (Exception e) {
            return new RetornoBuilder().comCodigoMensagem(HttpStatus.INTERNAL_SERVER_ERROR.value()).comObjeto(e).construir();
        }
    }

}
