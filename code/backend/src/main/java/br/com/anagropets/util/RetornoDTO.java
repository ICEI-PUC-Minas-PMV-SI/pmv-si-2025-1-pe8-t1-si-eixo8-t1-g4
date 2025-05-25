package br.com.anagropets.util;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RetornoDTO {
    private Integer codigoMensagem;
    private String mensagem;
    private Object objeto;
    private LocalDateTime dataServidor;
}
