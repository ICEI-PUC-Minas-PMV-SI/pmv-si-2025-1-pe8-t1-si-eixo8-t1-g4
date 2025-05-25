import { IdDescricao } from "../interface/IdDescricao";

export interface PetVO {
    id: number;
    nome: string;
    tipo: IdDescricao;
    raca: IdDescricao;
    porte: IdDescricao;
    dataNascimento: string;
    peso: number;
}