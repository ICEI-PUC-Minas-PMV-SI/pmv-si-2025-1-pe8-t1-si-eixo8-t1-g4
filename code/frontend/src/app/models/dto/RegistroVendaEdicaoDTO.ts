import { ItemVendaCadastroDTO } from './ItemVendaCadastroDTO';

export interface RegistroVendaEdicaoDTO {
  id: number;
  idCliente: number;
  valorTotal: number;
  itemVendaAtualizadoList: Array<ItemVendaCadastroDTO>;
  idMetodoPagamento: number;
  parcelasPagamento: number;
}
