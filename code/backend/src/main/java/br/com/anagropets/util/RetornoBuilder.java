package br.com.anagropets.util;

import java.time.LocalDateTime;

import org.hibernate.jdbc.Expectation;
import org.springframework.http.HttpStatus;

public class RetornoBuilder {

    private RetornoDTO retorno;

    public RetornoBuilder() {
        retorno = new RetornoDTO();
        retorno.setDataServidor(LocalDateTime.now());
        retorno.setMensagem("");
    }

    public RetornoBuilder comCodigoMensagem(Integer codigo) {
        retorno.setCodigoMensagem(codigo != null ? codigo : HttpStatus.OK.value());
        return this;
    }

    public RetornoBuilder comObjeto(Object objeto) {
        if(objeto instanceof Expectation) {
            retorno.setObjeto((Exception) objeto);
        } else {
            retorno.setObjeto(objeto);
        }

        return this;
    }

    public RetornoBuilder comMensagem(String mensagem) {
        retorno.setMensagem(mensagem);
        return this;
    }

    public RetornoDTO construir() {
        return retorno;
    }

}
