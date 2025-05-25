package br.com.anagropets.dto.produto;

import java.math.BigDecimal;

public record ProdutoRetornoPaginadoDTO(Long id, String nome, Double quantidadePorMedida, String siglaUnidadeMedida, String categoria, BigDecimal precoCusto, BigDecimal margemLucro, BigDecimal precoFinalVenda, Integer quantidadeDisponivel) {}