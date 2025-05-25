package br.com.anagropets.repository.registrovenda;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.anagropets.dto.registrovenda.RegistroVendaRetornoPaginadoDTO;
import br.com.anagropets.dto.relatorios.ClienteRankingDTO;
import br.com.anagropets.dto.relatorios.DiaSemanaRankingDTO;
import br.com.anagropets.dto.relatorios.DiaVendaRankingDTO;
import br.com.anagropets.model.registrovenda.RegistroVenda;

public interface RegistroVendaRepository extends JpaRepository<RegistroVenda, Long>{

	@Query("SELECT r FROM RegistroVenda r JOIN r.cliente c WHERE (:idCliente = c.id)")
	Optional<RegistroVenda> findByIdCliente(@Param("idCliente") Long idCliente);
	
	@Query("SELECT new br.com.anagropets.dto.registrovenda.RegistroVendaRetornoPaginadoDTO(r.id, c.nome as nomeCliente, r.valorTotal, r.lucro, r.dataVenda) " +
		       "FROM RegistroVenda r JOIN r.cliente c " +
		       "WHERE (:nomeCliente IS NULL OR c.nome LIKE CONCAT(:nomeCliente, '%')) " +
		       "AND (:dataInicial IS NULL OR r.dataVenda >= :dataInicial) " + 
		       "AND (:dataFinal IS NULL OR r.dataVenda <= :dataFinal)")
	Page<RegistroVendaRetornoPaginadoDTO> findByNomeClienteAndDataVenda(@Param("nomeCliente") String nomeCliente, @Param("dataInicial") LocalDateTime dataInicial, @Param("dataFinal") LocalDateTime dataFinal, Pageable pageable);
	
	@Query("SELECT COUNT(r) FROM RegistroVenda r JOIN r.cliente c " +
			   "WHERE (:nomeCliente IS NULL OR c.nome LIKE CONCAT(:nomeCliente, '%')) " +
			   "AND (:dataInicial IS NULL OR r.dataVenda >= :dataInicial) " + 
		       "AND (:dataFinal IS NULL OR r.dataVenda <= :dataFinal)")
	Long countRegistrosVenda(@Param("nomeCliente") String nomeCliente, @Param("dataInicial") LocalDateTime dataInicial, @Param("dataFinal") LocalDateTime dataFinal);
	
	@Query("""
		    SELECT new br.com.anagropets.dto.relatorios.ClienteRankingDTO(rv.cliente.id as idCliente, rv.cliente.nome AS nomeCliente, rv.cliente.celular as celularCliente, SUM(rv.valorTotal) AS valorComprado)
		    FROM RegistroVenda rv
		    WHERE rv.dataVenda >= :startOfMonth
		      AND rv.dataVenda < :startOfNextMonth
		    GROUP BY rv.cliente
		    ORDER BY valorComprado DESC
		""")
	List<ClienteRankingDTO> findRankingClientesMaisCompramMensal(
		    @Param("startOfMonth") LocalDateTime startOfMonth,
		    @Param("startOfNextMonth") LocalDateTime startOfNextMonth,
		    Pageable pageable);
	
	@Query("""
		    SELECT new br.com.anagropets.dto.relatorios.ClienteRankingDTO(
		        rv.cliente.id as idCliente,
		        rv.cliente.nome AS nomeCliente,
		        rv.cliente.celular as celularCliente,
		        SUM(rv.valorTotal) AS valorComprado
		    )
		    FROM RegistroVenda rv
		    WHERE FUNCTION('year', rv.dataVenda) = :ano
		    GROUP BY rv.cliente
		    ORDER BY valorComprado DESC
		""")
	List<ClienteRankingDTO> findRankingClientesMaisCompramAnual(@Param("ano") int ano, Pageable pageable);
	
	@Query("SELECT new br.com.anagropets.dto.relatorios.ClienteRankingDTO(rv.cliente.id as idCliente, rv.cliente.nome AS nomeCliente,  rv.cliente.celular as celularCliente, SUM(rv.valorTotal) AS valorComprado) " +
		       "FROM RegistroVenda rv GROUP BY rv.cliente ORDER BY valorComprado DESC")
	List<ClienteRankingDTO> findRankingClientesMaisCompramGeral(Pageable pageable);
	
	@Query("SELECT new br.com.anagropets.dto.relatorios.DiaVendaRankingDTO(DAY(rv.dataVenda) AS dia, SUM(rv.valorTotal) AS totalVendido) " +
		       "FROM RegistroVenda rv GROUP BY DAY(rv.dataVenda) ORDER BY totalVendido DESC")
	List<DiaVendaRankingDTO> findRankingDiaMes();
	
	@Query("SELECT FUNCTION('DAYNAME', rv.dataVenda) AS diaSemana, SUM(rv.valorTotal) AS totalVendido " +
		       "FROM RegistroVenda rv GROUP BY FUNCTION('DAYNAME', rv.dataVenda) ORDER BY totalVendido DESC")
	List<DiaSemanaRankingDTO> findRankingDiaSemana();

}