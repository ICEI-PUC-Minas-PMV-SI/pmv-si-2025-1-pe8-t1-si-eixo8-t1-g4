package br.com.anagropets.repository.usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.anagropets.model.usuario.Usuarios;

public interface UsuarioRepository extends JpaRepository<Usuarios, Long> {
	  Optional<Usuarios> findByUsuario(String usuario);
	}
