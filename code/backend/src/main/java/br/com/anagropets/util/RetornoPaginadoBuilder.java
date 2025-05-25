package br.com.anagropets.util;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

public class RetornoPaginadoBuilder implements RetornoBuilderInterface {

    private RetornoPaginadoDTO retorno;

    public RetornoPaginadoBuilder() {
        retorno = new RetornoPaginadoDTO();
        retorno.setDataServidor(LocalDateTime.now());
        retorno.setMensagem("");
        retorno.setPaginacao(new Paginacao());
    }

    public RetornoPaginadoBuilder comCodigoMensagem(Integer codigo) {
        retorno.setCodigoMensagem(codigo != null ? codigo : HttpStatus.OK.value());
        return this;
    }

    public RetornoPaginadoBuilder comObjeto(Object objeto) {
        if(objeto instanceof Exception) {
            retorno.setObjeto((Exception) objeto);
        } else {
            retorno.setObjeto(objeto);
        }

        return this;
    }

    public RetornoPaginadoBuilder comMensagem(String mensagem) {
        retorno.setMensagem(mensagem);
        return this;
    }
    
    public RetornoPaginadoBuilder comPaginacao(int page, int pageSize, int totalPages, Long totalElements, String orderingField, String orderingDirection) {
    	Paginacao paginacao = new Paginacao(page, pageSize, totalPages, totalElements, orderingField, orderingDirection);
    	retorno.setPaginacao(paginacao);
    	return this;
    }

    public RetornoPaginadoDTO construir() {
        return retorno;
    }

}
