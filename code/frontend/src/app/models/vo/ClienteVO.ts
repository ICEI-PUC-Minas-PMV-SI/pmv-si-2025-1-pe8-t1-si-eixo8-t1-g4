import { EnderecoVO } from "./EnderecoVO";
import { PetVO } from "./PetVO";

export interface ClienteVO {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    celular: string;
    dataNascimento: string;
    genero: string;
    endereco: EnderecoVO;
    pets: Array<PetVO>;
}