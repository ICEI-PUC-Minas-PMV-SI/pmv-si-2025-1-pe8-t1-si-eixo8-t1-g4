package br.com.anagropets.repository.produto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.anagropets.dto.auxiliar.IdDescricao;
import br.com.anagropets.dto.produto.ProdutoRetornoPaginadoDTO;
import br.com.anagropets.model.auxiliar.UnidadeMedida;
import br.com.anagropets.model.produto.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	@Query("SELECT new br.com.anagropets.dto.produto.ProdutoRetornoPaginadoDTO(p.id, p.nome, p.quantidadePorMedida, p.unidadeMedida.sigla as siglaUnidadeMedida, c.descricao as categoria, p.precoCusto as precoCusto, p.margemLucro as margemLucro, p.precoFinalVenda as precoFinalVenda, e.quantidadeDisponivel as quantidadeDisponivel) " +
		       "FROM Produto p JOIN p.categoria c JOIN p.estoque e " +
		       "WHERE (:nome IS NULL OR p.nome LIKE CONCAT(:nome, '%')) " +
		       "AND (:idCategoria IS NULL OR c.id = :idCategoria)")
	Page<ProdutoRetornoPaginadoDTO> findByNomeAndCategoria(@Param("nome") String nome, @Param("idCategoria") Long idCategoria, Pageable pageable);
	
	@Query("SELECT COUNT(p) FROM Produto p JOIN p.categoria c " +
			   "WHERE (:nome IS NULL OR p.nome LIKE CONCAT(:nome, '%')) " +
		       "AND (:idCategoria IS NULL OR c.id = :idCategoria)")
	Long countRegistrosProduto(@Param("nome") String nome, @Param("idCategoria") Long idCategoria);
	
	@Query("SELECT new br.com.anagropets.dto.auxiliar.IdDescricao(p.id, p.nome as descricao) " +
		       "FROM Produto p ORDER BY p.nome ASC")
	List<IdDescricao> getProdutoList();
	
	@Query("SELECT p FROM Produto p JOIN p.estoque e WHERE e.quantidadeDisponivel <= e.quantidadeMinima OR e.quantidadeDisponivel <= :quantidade ORDER BY e.quantidadeDisponivel ASC")
	List<Produto> getProdutoEstoqueBaixoList(@Param("quantidade") Integer quantidade);
	
	@Query("SELECT p FROM Produto p WHERE p.dataVencimento BETWEEN :hoje AND :dataLimite OR p.dataVencimento < :hoje ORDER BY p.dataVencimento ASC")
	List<Produto> getProdutoVencimentoProximoList(@Param("hoje") LocalDate hoje, @Param("dataLimite") LocalDate dataLimite);
	
	Optional<Produto> findByNomeIgnoreCase(String nome);
	
	// Cadastro: verifica se já existe produto com mesmo nome e unidade de medida
    Optional<Produto> findByNomeIgnoreCaseAndUnidadeMedida(String nome, UnidadeMedida unidadeMedida);

    // Atualização: verifica se outro produto (com ID diferente) já tem mesmo nome e unidade
    Optional<Produto> findByNomeIgnoreCaseAndUnidadeMedidaAndIdNot(String nome, UnidadeMedida unidadeMedida, Long id);
}
