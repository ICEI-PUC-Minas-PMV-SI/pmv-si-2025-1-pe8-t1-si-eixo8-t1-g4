package br.com.anagropets.repository.pet;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.anagropets.dto.auxiliar.IdDescricao;
import br.com.anagropets.dto.relatorios.IdadePetGraficoDTO;
import br.com.anagropets.dto.relatorios.RacaPetGraficoDTO;
import br.com.anagropets.dto.relatorios.TipoPetGraficoDTO;
import br.com.anagropets.model.pet.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
	
	@Query("SELECT p FROM Pet p WHERE " +
		       "FUNCTION('TO_CHAR', p.dataNascimento, 'MM-dd') BETWEEN " +
		       "FUNCTION('TO_CHAR', :hoje, 'MM-dd') AND FUNCTION('TO_CHAR', :dataLimite, 'MM-dd')")
	List<Pet> getPetAniversarioProximoList(@Param("hoje") LocalDate hoje, @Param("dataLimite") LocalDate dataLimite);
	
	@Query("SELECT new br.com.anagropets.dto.auxiliar.IdDescricao(p.id, p.nome as descricao) " +
		       "FROM Pet p WHERE p.cliente.id = :idCliente ORDER BY p.nome ASC")
	List<IdDescricao> findAllByClienteId(@Param("idCliente") Long idCliente);
	
	@Query("SELECT new br.com.anagropets.dto.relatorios.TipoPetGraficoDTO(p.tipo.descricao AS tipo, COUNT(p) AS quantidade) FROM Pet p GROUP BY p.tipo")
	List<TipoPetGraficoDTO> agrupamentoPorTipo();
	
	@Query("SELECT new br.com.anagropets.dto.relatorios.RacaPetGraficoDTO(p.raca.descricao AS raca, COUNT(p) AS quantidade) FROM Pet p GROUP BY p.raca")
	List<RacaPetGraficoDTO> agrupamentoPorRaca();

	@Query("SELECT TIMESTAMPDIFF(YEAR, p.dataNascimento, CURRENT_DATE) AS idade, COUNT(p) AS quantidade " +
		       "FROM Pet p WHERE p.dataNascimento IS NOT NULL " +
		       "GROUP BY TIMESTAMPDIFF(YEAR, p.dataNascimento, CURRENT_DATE) " +
		       "ORDER BY TIMESTAMPDIFF(YEAR, p.dataNascimento, CURRENT_DATE) ASC")
	List<IdadePetGraficoDTO> agrupamentoIdadePets();

}
