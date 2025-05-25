package br.com.anagropets.repository.auxiliar;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.anagropets.model.auxiliar.TipoPet;

public interface TipoPetRepository extends JpaRepository<TipoPet, Long> {
	
    List<TipoPet> findAllByOrderByIdAsc();

}
