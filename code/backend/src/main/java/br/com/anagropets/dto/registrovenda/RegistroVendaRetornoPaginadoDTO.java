package br.com.anagropets.dto.registrovenda;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RegistroVendaRetornoPaginadoDTO(Long id, String nomeCliente, BigDecimal valorTotal, BigDecimal lucro, LocalDateTime dataVenda) {}
