package br.com.anagropets.repository.cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.anagropets.dto.auxiliar.IdDescricao;
import br.com.anagropets.dto.cliente.ClienteRetornoPaginadoDTO;
import br.com.anagropets.model.cliente.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	
	@Query("SELECT new br.com.anagropets.dto.cliente.ClienteRetornoPaginadoDTO(c.id, c.nome, c.cpf, c.email, c.celular) " +
		       "FROM Cliente c " +
		       "WHERE (:nome IS NULL OR c.nome LIKE CONCAT(:nome, '%')) " +
		       "AND (:cpf IS NULL OR c.cpf LIKE CONCAT(:cpf, '%')) " +
		       "AND (:genero IS NULL OR c.genero LIKE CONCAT('%', :genero, '%'))")
	Page<ClienteRetornoPaginadoDTO> findByNomeAndCpfAndGenero(@Param("nome") String nome, @Param("cpf") String cpf, @Param("genero") String genero, Pageable pageable);
	
	@Query("SELECT COUNT(c) FROM Cliente c " +
			   "WHERE (:nome IS NULL OR c.nome LIKE CONCAT(:nome, '%')) " +
		       "AND (:cpf IS NULL OR c.cpf LIKE CONCAT(:cpf, '%')) " +
		       "AND (:genero IS NULL OR c.genero LIKE CONCAT('%', :genero, '%'))")
	Long countRegistrosCliente(@Param("nome") String nome, @Param("cpf") String cpf, @Param("genero") String genero);
	
	@Query("SELECT new br.com.anagropets.dto.auxiliar.IdDescricao(c.id, c.nome as descricao) " +
		       "FROM Cliente c ORDER BY c.nome ASC")
	List<IdDescricao> getClienteList();

	@Query("SELECT c FROM Cliente c JOIN c.pets p WHERE p.id = :idPet")
	Optional<Cliente> findByIdPet(@Param("idPet") Long idPet);
	
	Optional<Cliente> findByCpf(@Param("cpf") String cpf);
}
