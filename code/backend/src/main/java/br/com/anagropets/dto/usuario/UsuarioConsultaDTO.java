package br.com.anagropets.dto.usuario;

import lombok.Data;

@Data
public class UsuarioConsultaDTO {
    private String nome;
    private String usuario;
    
	public UsuarioConsultaDTO(String nome, String usuario) {
		super();
		this.nome = nome;
		this.usuario = usuario;
	}
	
}