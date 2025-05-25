import { ObjetoPaginadoDTO } from "./ObjetoPaginadoDTO";

export interface EstoquePesquisaDTO extends ObjetoPaginadoDTO {
    nomeProduto: string;
    idCategoriaProduto: number;
}