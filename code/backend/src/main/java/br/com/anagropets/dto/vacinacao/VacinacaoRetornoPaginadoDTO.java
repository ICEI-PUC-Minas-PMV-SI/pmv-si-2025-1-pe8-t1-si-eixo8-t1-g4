package br.com.anagropets.dto.vacinacao;

import java.time.LocalDate;

public record VacinacaoRetornoPaginadoDTO(Long idPet, String nomePet, String nomeCliente, LocalDate dataProximaVacinacao, String celularCliente) {}