import { ObjetoPaginadoDTO } from './ObjetoPaginadoDTO';

export interface ProdutoPesquisaDTO extends ObjetoPaginadoDTO {
  nome: string;
  idCategoria: string;
}
