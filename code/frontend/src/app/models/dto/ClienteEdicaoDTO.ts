import { EnderecoEdicaoDTO } from "./EnderecoEdicaoDTO";
import { PetEdicaoDTO } from "./PetEdicaoDTO";

export interface ClienteEdicaoDTO {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    celular: string;
    dataNascimento: Date;
    genero: string;
    endereco: EnderecoEdicaoDTO;
    petsAtualizados: Array<PetEdicaoDTO>;
}