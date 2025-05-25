package br.com.anagropets.model.registrovenda;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.anagropets.model.auxiliar.MetodoPagamento;
import br.com.anagropets.model.auxiliar.StatusPagamento;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pagamento")
public class Pagamento {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@OneToOne
    @JoinColumn(name = "id_venda")
	@JsonBackReference
    private @NotNull RegistroVenda registroVenda;
	
	@ManyToOne
	@JoinColumn(name = "id_metodo_pagamento")
	private @NotNull MetodoPagamento metodoPagamento;
	
	@ManyToOne
	@JoinColumn(name = "id_status_pagamento")
	private @NotNull StatusPagamento statusPagamento;
	
	@Column(name = "valor_pago", precision = 10, scale = 2)
	private @NotNull BigDecimal valorPago;
	
	private @NotNull LocalDateTime dataPagamento;
	private @NotNull Integer parcelas;

}
