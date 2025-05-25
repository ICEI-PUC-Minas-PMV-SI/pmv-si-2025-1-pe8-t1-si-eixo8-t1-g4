package br.com.anagropets.repository.registrovenda;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.anagropets.model.registrovenda.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long>{

}
