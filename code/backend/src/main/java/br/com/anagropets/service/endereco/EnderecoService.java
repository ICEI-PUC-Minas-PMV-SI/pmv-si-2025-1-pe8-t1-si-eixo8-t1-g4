package br.com.anagropets.service.endereco;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import br.com.anagropets.dto.endereco.EnderecoCadastroDTO;
import br.com.anagropets.dto.endereco.EnderecoEdicaoDTO;
import br.com.anagropets.model.cliente.Cliente;
import br.com.anagropets.model.endereco.Endereco;
import br.com.anagropets.repository.endereco.EnderecoRepository;

@Service
public class EnderecoService {
	
	private final EnderecoRepository enderecoRepository;

	public EnderecoService(EnderecoRepository enderecoRepository) {
		super();
		this.enderecoRepository = enderecoRepository;
	}
	
	public Endereco cadastrar(EnderecoCadastroDTO dto) {
        try {
        	ModelMapper modelMapper = new ModelMapper();
        	Endereco endereco = modelMapper.map(dto, Endereco.class);
        
           return enderecoRepository.save(endereco);
        } catch (Exception e){
            throw e;
        }
    }
	
	public void atualizar(EnderecoEdicaoDTO dto, Cliente cliente) {
        Endereco endereco = enderecoRepository.findById(dto.getId())
        	        .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        	
        endereco.setCep(dto.getCep());
        endereco.setLogradouro(dto.getLogradouro());
        endereco.setNumero(dto.getNumero());
        endereco.setSemNumero(dto.getSemNumero());
        endereco.setBairro(dto.getBairro());
        endereco.setComplemento(dto.getComplemento());
        endereco.setCidade(dto.getCidade());
        endereco.setUf(dto.getUf());
        	
        cliente.setEndereco(endereco);
    }

}
