import { EnderecoCadastroDTO } from "./EnderecoCadastroDTO";
import { PetCadastroDTO } from "./PetCadastroDTO";

export interface ClienteCadastroDTO {
    nome: string;
    cpf: string;
    email: string;
    celular: string;
    dataNascimento: Date;
    genero: string;
    endereco: EnderecoCadastroDTO;
    pets: Array<PetCadastroDTO>;
}