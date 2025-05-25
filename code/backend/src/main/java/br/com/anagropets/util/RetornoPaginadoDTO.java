package br.com.anagropets.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RetornoPaginadoDTO extends RetornoDTO {
    private Paginacao paginacao;
}
