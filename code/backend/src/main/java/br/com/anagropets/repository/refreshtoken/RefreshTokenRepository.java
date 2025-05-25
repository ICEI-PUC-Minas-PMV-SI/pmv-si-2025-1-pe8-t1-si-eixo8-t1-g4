package br.com.anagropets.repository.refreshtoken;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.anagropets.model.refreshtoken.RefreshToken;
import br.com.anagropets.model.usuario.Usuarios;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUsuario(Usuarios usuario);
    void deleteByUsuario(Usuarios usuario);
}

