import { ObjetoPaginadoDTO } from './ObjetoPaginadoDTO';

export interface VacinacaoPesquisaDTO extends ObjetoPaginadoDTO {
  nomePet: string;
  nomeCliente: string;
}
