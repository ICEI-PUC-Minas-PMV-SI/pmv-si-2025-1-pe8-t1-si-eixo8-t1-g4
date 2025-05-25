package br.com.anagropets.service.refreshtoken;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.anagropets.model.refreshtoken.RefreshToken;
import br.com.anagropets.model.usuario.Usuarios;
import br.com.anagropets.repository.refreshtoken.RefreshTokenRepository;

@Service
@Transactional
public class RefreshTokenService {

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken criarRefreshToken(Usuarios usuario) {
        refreshTokenRepository.findByUsuario(usuario).ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = RefreshToken.builder()
                .usuario(usuario)
                .token(UUID.randomUUID().toString())
                .dataExpiracao(LocalDateTime.now().plus(Duration.ofMillis(refreshTokenDurationMs)))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> validarRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(rt -> rt.getDataExpiracao().isAfter(LocalDateTime.now()));
    }

    @Transactional
    public void revogarPorUsuario(Usuarios usuario) {
        refreshTokenRepository.deleteByUsuario(usuario);
    }
}

