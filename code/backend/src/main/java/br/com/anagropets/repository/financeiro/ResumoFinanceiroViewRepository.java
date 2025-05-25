package br.com.anagropets.repository.financeiro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.anagropets.model.financeiro.ResumoFinanceiroDiarioView;
import br.com.anagropets.model.financeiro.ResumoFinanceiroMensalView;
import br.com.anagropets.model.registrovenda.RegistroVenda;

@Repository
public interface ResumoFinanceiroViewRepository extends JpaRepository<RegistroVenda, Long> {
	
	@Query(value = """
	        SELECT DATE_FORMAT(rv.data_venda, '%Y-%m-%d') AS anoMesDia,
	               COUNT(rv.id) AS totalVendas,
	               SUM(rv.valor_total) AS valorTotalVendas,
	               SUM(rv.lucro) AS lucroTotal
	        FROM registro_vendas rv
	        WHERE DATE_FORMAT(rv.data_venda, '%Y-%m-%d') = :dia
	        GROUP BY anoMesDia
	        """, nativeQuery = true)
	ResumoFinanceiroDiarioView buscarResumoDiario(@Param("dia") String dia);

    @Query(value = """
        SELECT DATE_FORMAT(rv.data_venda, '%Y-%m') AS anoMes,
               COUNT(rv.id) AS totalVendas,
               SUM(rv.valor_total) AS valorTotalVendas,
               SUM(rv.lucro) AS lucroTotal
        FROM registro_vendas rv
        WHERE DATE_FORMAT(rv.data_venda, '%Y-%m') = :mes
        GROUP BY anoMes
        """, nativeQuery = true)
    ResumoFinanceiroMensalView buscarResumoMensal(@Param("mes") String mes);

    @Query(value = """
        SELECT COUNT(rv.id) AS totalVendas,
               SUM(rv.valor_total) AS valorTotalVendas,
               SUM(rv.lucro) AS lucroTotal
        FROM registro_vendas rv
        WHERE YEAR(rv.data_venda) = :ano
        """, nativeQuery = true)
    ResumoFinanceiroMensalView buscarAcumuladoAno(@Param("ano") int ano);
}

