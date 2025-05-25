package br.com.anagropets.dto.relatorios;

import java.math.BigDecimal;

public record ClienteRankingDTO(Long idCliente, String nomeCliente, String celularCliente, BigDecimal valorComprado) {}