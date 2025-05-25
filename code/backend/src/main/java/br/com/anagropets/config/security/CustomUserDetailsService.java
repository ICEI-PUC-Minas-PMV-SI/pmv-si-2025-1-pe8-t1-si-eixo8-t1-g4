package br.com.anagropets.config.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.anagropets.repository.usuario.UsuarioRepository;

// Carrega usuário pelo e-mail

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
		super();
		this.usuarioRepository = usuarioRepository;
	}

	@Override
    public UserDetails loadUserByUsername(String usuario) {
        return usuarioRepository.findByUsuario(usuario)
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }
}

