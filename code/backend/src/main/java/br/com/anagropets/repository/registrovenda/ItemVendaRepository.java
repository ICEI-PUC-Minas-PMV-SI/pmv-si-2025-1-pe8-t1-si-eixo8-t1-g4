package br.com.anagropets.repository.registrovenda;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.anagropets.dto.relatorios.ProdutoRankingDTO;
import br.com.anagropets.model.registrovenda.ItemVenda;

public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {
	
	@Query("""
		    SELECT new br.com.anagropets.dto.relatorios.ProdutoRankingDTO(iv.produto.id as idProduto, iv.produto.nome, SUM(iv.quantidade))
		    FROM ItemVenda iv
		    JOIN iv.registroVenda rv
		    WHERE rv.dataVenda >= :startOfMonth
		      AND rv.dataVenda < :startOfNextMonth
		    GROUP BY iv.produto
		    ORDER BY SUM(iv.quantidade) DESC
		""")
	List<ProdutoRankingDTO> findRankingProdutosMaisVendidosMensal(
			@Param("startOfMonth") LocalDateTime startOfMonth,
		    @Param("startOfNextMonth") LocalDateTime startOfNextMonth,
		    Pageable pageable);
	
	@Query("""
		    SELECT new br.com.anagropets.dto.relatorios.ProdutoRankingDTO(iv.produto.id as idProduto, iv.produto.nome, SUM(iv.quantidade))
		    FROM ItemVenda iv
		    JOIN iv.registroVenda rv
		    WHERE FUNCTION('year', rv.dataVenda) = :ano
		    GROUP BY iv.produto
		    ORDER BY SUM(iv.quantidade) DESC
		""")
	List<ProdutoRankingDTO> findRankingProdutosMaisVendidosAnual(@Param("ano") int ano, Pageable pageable);
	
	@Query("SELECT new br.com.anagropets.dto.relatorios.ProdutoRankingDTO(iv.produto.id as idProduto, iv.produto.nome AS nomeProduto, SUM(iv.quantidade) AS quantidadeVendida) " +
		       "FROM ItemVenda iv GROUP BY iv.produto ORDER BY quantidadeVendida DESC")
	List<ProdutoRankingDTO> findRankingProdutosMaisVendidosGeral(Pageable pageable);

}