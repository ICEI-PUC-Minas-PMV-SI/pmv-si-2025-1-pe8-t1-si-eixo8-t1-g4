import { ObjetoPaginadoDTO } from './ObjetoPaginadoDTO';

export interface RegistroVendaPesquisaDTO extends ObjetoPaginadoDTO {
  nomeCliente: string;
  dataInicial: Date;
  dataFinal: Date;
}
