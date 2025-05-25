package br.com.anagropets.repository.auxiliar;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.anagropets.model.auxiliar.StatusPagamento;

public interface StatusPagamentoRepository extends JpaRepository<StatusPagamento, Long> {
	Optional<StatusPagamento> findByDescricaoIgnoreCase(String descricao);
}
