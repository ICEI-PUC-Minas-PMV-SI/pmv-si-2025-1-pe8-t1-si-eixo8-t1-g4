package br.com.anagropets.controller.auth;

import java.security.Principal;
import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.anagropets.config.security.JwtUtil;
import br.com.anagropets.dto.login.AuthResponse;
import br.com.anagropets.dto.login.LoginDTO;
import br.com.anagropets.dto.refreshtoken.TokenRefreshResponse;
import br.com.anagropets.dto.usuario.UsuarioAtualizacaoDTO;
import br.com.anagropets.dto.usuario.UsuarioConsultaDTO;
import br.com.anagropets.dto.usuario.UsuarioDTO;
import br.com.anagropets.model.refreshtoken.RefreshToken;
import br.com.anagropets.model.usuario.Usuarios;
import br.com.anagropets.repository.usuario.UsuarioRepository;
import br.com.anagropets.service.refreshtoken.RefreshTokenService;
import br.com.anagropets.util.RetornoBuilder;
import br.com.anagropets.util.RetornoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;


@RestController
@RequestMapping("auth")
@Tag(name = "Authentication", description = "Operações relacionadas à autenticação de usuário")
public class AuthController {

	private final UsuarioRepository usuarioRepository;
 	private final PasswordEncoder passwordEncoder;
 	private final JwtUtil jwtUtil;
 	private final RefreshTokenService refreshTokenService;
  	
  	public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
			RefreshTokenService refreshTokenService) {
		super();
		this.usuarioRepository = usuarioRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
		this.refreshTokenService = refreshTokenService;
	}

  	@PostMapping("/login")
  	public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO dto) {
  	    var usuario = usuarioRepository.findByUsuario(dto.getUsuario())
  	            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado."));

  	    if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
  	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  	    }

  	    String accessToken = jwtUtil.generateToken(usuario);
  	    String refreshToken = refreshTokenService.criarRefreshToken(usuario).getToken();

  	    // Criar cookie HttpOnly com refresh token
  	    // Por que fazer isso?
  			// Evita acesso via JavaScript (proteção contra XSS)
  	    	// Mais seguro para aplicações reais
  	    	// Ideal para front-ends Angular, React, etc., especialmente com login persistente
  	    ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
              .httpOnly(true)
              .secure(true) // false se estiver usando HTTP ou true se estiver usando HTTPS
              .path("/auth/refresh") // 🔒 restringe o envio apenas para este endpoint
              .maxAge(Duration.ofDays(7))
              .sameSite("None")
              .build();

  	    return ResponseEntity.ok()
  	            .header(HttpHeaders.SET_COOKIE, cookie.toString())
  	            .body(new AuthResponse(accessToken, null)); // refreshToken não vai mais no body
  	}

  	
	@PostMapping("/usuario/cadastro")
	@Operation(summary = "Cadastro de usuário", description = "Realiza cadastro de usuário")
  	public ResponseEntity<RetornoDTO> cadastrar(@Valid @RequestBody UsuarioDTO dto) {
		RetornoDTO retorno = new RetornoDTO();
		
		if (usuarioRepository.findByUsuario(dto.getUsuario()).isPresent()) {
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.BAD_REQUEST.value()).comMensagem("Usuário já cadastrado.").construir();
		} else {
			Usuarios usuario = new Usuarios();
			usuario.setNome(dto.getNome());
			usuario.setUsuario(dto.getUsuario());
			usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

			usuarioRepository.save(usuario);
			retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Usuário cadastrado com sucesso!").construir();
		}		
		
		return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
  	}
	
	@PutMapping("/usuario/atualizacao")
	@Operation(summary = "Atualização de usuário", description = "Realiza atualização de dados do usuário")
	public ResponseEntity<RetornoDTO> atualizarUsuario(@RequestBody UsuarioAtualizacaoDTO dto, Principal principal) {
		RetornoDTO retorno = new RetornoDTO();
		
	    var usuarioAtual = usuarioRepository.findByUsuario(principal.getName())
	            .orElseThrow(() -> new UsernameNotFoundException("Usuário autenticado não encontrado!"));
	    
	    // Verifica a senha atual
	    if (!passwordEncoder.matches(dto.getSenhaAtual(), usuarioAtual.getSenha())) {
	    	retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.UNAUTHORIZED.value()).comMensagem("Senha atual incorreta.").construir();
	    } else {
	    	 // Verifica se o novo nome de usuário está disponível (caso tenha sido alterado)
		    if (!dto.getUsuario().equals(usuarioAtual.getUsuario()) &&
		        usuarioRepository.findByUsuario(dto.getUsuario()).isPresent()) {
		    	retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.BAD_REQUEST.value()).comMensagem("Nome de usuário já está em uso.").construir();
		    } else {
		    	usuarioAtual.setNome(dto.getNome());
			    usuarioAtual.setUsuario(dto.getUsuario());

			    if (dto.getNovaSenha() != null && !dto.getNovaSenha().isBlank()) {
			        usuarioAtual.setSenha(passwordEncoder.encode(dto.getNovaSenha()));
			        retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.OK.value()).comMensagem("Usuário atualizado com sucesso!").construir();
			    } else {
			    	retorno = new RetornoBuilder().comCodigoMensagem(HttpStatus.BAD_REQUEST.value()).comMensagem("Campo nova senha vazio.").construir();
			    }

			    usuarioRepository.save(usuarioAtual);
		    }   
	    }
	    
	    return ResponseEntity.status(retorno.getCodigoMensagem()).body(retorno);
	}
	
	@GetMapping("/usuario/consulta")
	@Operation(summary = "Consulta de dados de login do usuário", description = "Retorna dados de login do usuário")
	public ResponseEntity<UsuarioConsultaDTO> buscarDadosUsuario(Principal principal) {
	    var usuario = usuarioRepository.findByUsuario(principal.getName())
	            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

	    var dto = new UsuarioConsultaDTO(usuario.getNome(), usuario.getUsuario());
	    return ResponseEntity.ok(dto);
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<TokenRefreshResponse> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
	    if (refreshToken == null) {
	        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token não encontrado no cookie.");
	    }

	    return refreshTokenService.validarRefreshToken(refreshToken)
	            .map(RefreshToken::getUsuario)
	            .map(usuario -> {
	                String novoAccessToken = jwtUtil.generateToken(usuario);
	                return ResponseEntity.ok(new TokenRefreshResponse(novoAccessToken, null)); // não precisa reenviar o refresh
	            })
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token inválido ou expirado."));
	}

	
	@PostMapping("/logout")
	@Operation(summary = "Logout de usuário", description = "Revoga o refresh token e encerra a sessão")
	public ResponseEntity<RetornoDTO> logout(Principal principal) {
	    RetornoDTO retorno;

	    var usuario = usuarioRepository.findByUsuario(principal.getName())
	            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado."));

	    refreshTokenService.revogarPorUsuario(usuario);

	    retorno = new RetornoBuilder()
	            .comCodigoMensagem(HttpStatus.OK.value())
	            .comMensagem("Logout realizado com sucesso.")
	            .construir();

	    return ResponseEntity.ok(retorno);
	}
}

