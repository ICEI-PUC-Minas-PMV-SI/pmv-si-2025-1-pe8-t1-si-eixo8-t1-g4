package br.com.anagropets.model.registrovenda;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import br.com.anagropets.model.cliente.Cliente;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "registro_vendas")
public class RegistroVenda {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_cliente", referencedColumnName = "id")
	private @NotNull Cliente cliente;
	
	@Column(name = "valor_total", precision = 10, scale = 2)
	private @NotNull BigDecimal valorTotal;
	private @NotNull LocalDateTime dataVenda;
	@Column(name = "lucro", precision = 10, scale = 2)
	private @NotNull BigDecimal lucro;
	
	@OneToMany(mappedBy = "registroVenda", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemVenda> itens = new ArrayList<>();
	
	@OneToOne(mappedBy = "registroVenda", cascade = CascadeType.ALL, orphanRemoval = true)
    private Pagamento pagamento;
}
