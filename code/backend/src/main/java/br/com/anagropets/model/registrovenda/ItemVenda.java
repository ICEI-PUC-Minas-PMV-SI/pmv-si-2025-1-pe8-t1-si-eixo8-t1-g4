package br.com.anagropets.model.registrovenda;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.anagropets.model.auxiliar.UnidadeMedida;
import br.com.anagropets.model.produto.Produto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "itens_venda")
public class ItemVenda {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
    @JoinColumn(name = "id_venda", nullable = false)
	@JsonBackReference
	private @NotNull RegistroVenda registroVenda;
	
	@ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
	private @NotNull Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "id_unidade_medida_venda")
	private @NotNull UnidadeMedida unidadeMedidaVenda;
	
	private @NotNull Integer quantidade;
	
	@Column(name = "preco_unitario_venda", precision = 10, scale = 2)
	private @NotNull BigDecimal precoUnitarioVenda;
	
	@Column(name = "subtotal", precision = 10, scale = 2)
	private @NotNull BigDecimal subtotal;
	
	@Column(name = "preco_unitario_custo", precision = 10, scale = 2)
	private @NotNull BigDecimal precoUnitarioCusto;
	
	@Column(name = "margem_lucro", precision = 10, scale = 2)
	private @NotNull BigDecimal margemLucro;
	
	@Column(name = "lucro", precision = 10, scale = 2)
	private @NotNull BigDecimal lucro;

}