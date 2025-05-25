package br.com.anagropets.repository.estoque;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.anagropets.model.estoque.Estoque;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> { }
