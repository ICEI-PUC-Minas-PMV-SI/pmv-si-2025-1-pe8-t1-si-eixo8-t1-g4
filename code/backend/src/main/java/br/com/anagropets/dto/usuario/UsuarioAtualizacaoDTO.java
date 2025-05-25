package br.com.anagropets.dto.usuario;

import lombok.Data;

@Data
public class UsuarioAtualizacaoDTO {
    private String nome;
    private String usuario;
    private String senhaAtual;
    private String novaSenha;
}
