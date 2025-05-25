package br.com.anagropets.model.endereco;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.anagropets.model.cliente.Cliente;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "endereco")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@NonNull -> Lombok
    private @NotNull(message = "O campo CEP é obrigatório.") @Size(max = 8) String cep;
    private @NotNull String logradouro;
    private String numero;
    private Boolean semNumero;
    private @NotNull String bairro;
    private String complemento;
    private @NotNull String cidade;
    private @NotNull @Size(max = 2) String uf;
    
    @OneToOne(mappedBy = "endereco")
    @JsonBackReference
    private Cliente cliente;
}
