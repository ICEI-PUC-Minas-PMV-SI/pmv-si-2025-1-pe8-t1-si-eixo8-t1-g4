package br.com.anagropets.model.usuario;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuarios implements UserDetails {
	
	private static final long serialVersionUID = 1L;

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(max = 100)
	private String nome;

	@NotNull @Column(unique = true) @Size(max = 100)
	private String usuario;

	@NotNull
	@Size(max = 255)
  	private String senha;
  
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
      return Collections.emptyList(); // Sem perfis (ou roles) por enquanto
	}

	@Override
	public String getPassword() {
      return senha;
	}

	@Override
	public String getUsername() {
      return usuario;
	}

	@Override
	public boolean isAccountNonExpired() {
      return true;
	}

	@Override
	public boolean isAccountNonLocked() {
      return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
      return true;
	}

	@Override
	public boolean isEnabled() {
      return true;
	}

}