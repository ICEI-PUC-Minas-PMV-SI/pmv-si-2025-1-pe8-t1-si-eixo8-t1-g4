import { ObjetoPaginadoDTO } from './ObjetoPaginadoDTO';

export interface ClientePesquisaDTO extends ObjetoPaginadoDTO {
  nome: string;
  cpf: string;
  genero: string;
}
