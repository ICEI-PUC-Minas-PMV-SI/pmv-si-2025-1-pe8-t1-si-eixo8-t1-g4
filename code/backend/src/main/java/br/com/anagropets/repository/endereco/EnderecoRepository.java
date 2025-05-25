package br.com.anagropets.repository.endereco;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.anagropets.model.endereco.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
}
