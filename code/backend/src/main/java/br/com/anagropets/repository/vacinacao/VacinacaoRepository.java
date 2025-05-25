package br.com.anagropets.repository.vacinacao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.anagropets.dto.vacinacao.VacinacaoRetornoPaginadoDTO;
import br.com.anagropets.model.vacinacao.Vacinacao;

@Repository
public interface VacinacaoRepository extends JpaRepository<Vacinacao, Long> {
    List<Vacinacao> findByPetIdOrderByDataAplicacaoAsc(Long petId);
    List<Vacinacao> findByDataProximaDoseBeforeOrderByDataProximaDoseAsc(LocalDate date);
    List<Vacinacao> findByDataProximaDoseBetweenOrderByDataProximaDoseAsc(LocalDate start, LocalDate end);
    
    @Query("SELECT new br.com.anagropets.dto.vacinacao.VacinacaoRetornoPaginadoDTO(p.id as idPet, p.nome as nomePet, c.nome as nomeCliente, MIN(v.dataProximaDose) as dataProximaVacinacao, c.celular as celularCliente) " +
		       "FROM Vacinacao v JOIN v.pet p JOIN p.cliente c " +
		       "WHERE (:nomePet IS NULL OR p.nome LIKE CONCAT(:nomePet, '%')) " +
		       "AND (:nomeCliente IS NULL OR c.nome LIKE CONCAT(:nomeCliente, '%')) " +
		       "GROUP BY p.id, p.nome, c.nome " +
    	       "ORDER BY MIN(v.dataProximaDose) ASC")
	Page<VacinacaoRetornoPaginadoDTO> findByNomePetAndNomeCliente(@Param("nomePet") String nomePet, @Param("nomeCliente") String nomeCliente, Pageable pageable);
	
    @Query("SELECT COUNT(DISTINCT p.id) FROM Vacinacao v JOIN v.pet p JOIN p.cliente c " +
    	       "WHERE (:nomePet IS NULL OR p.nome LIKE CONCAT(:nomePet, '%')) " +
    	       "AND (:nomeCliente IS NULL OR c.nome LIKE CONCAT(:nomeCliente, '%'))")
    Long countRegistrosVacinacao(@Param("nomePet") String nomePet, @Param("nomeCliente") String nomeCliente);

}