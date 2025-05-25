package br.com.anagropets.model.produto;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.com.anagropets.model.auxiliar.UnidadeMedida;
import br.com.anagropets.model.estoque.Estoque;
import jakarta.persistence.CascadeType;
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
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "produto")
public class Produto {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NotNull @Size(max = 100) String nome;
    
    @Column(name = "preco_custo", precision = 10, scale = 2)
    private @NotNull BigDecimal precoCusto;
    
    @Column(name = "margem_lucro", precision = 10, scale = 2)
    private @NotNull BigDecimal margemLucro;
    
    @Column(name = "preco_final_venda", precision = 10, scale = 2)
    private @NotNull BigDecimal precoFinalVenda;
    
    @ManyToOne
    @JoinColumn(name = "id_categoria", referencedColumnName = "id")
    private @NotNull CategoriaProduto categoria;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_estoque", referencedColumnName = "id")
    private Estoque estoque;
    
    @ManyToOne
    @JoinColumn(name = "id_unidade_medida")
    private @NotNull UnidadeMedida unidadeMedida;

    private @NotNull Double quantidadePorMedida;
    private LocalDate dataVencimento;
    private String codigoBarras;

}
