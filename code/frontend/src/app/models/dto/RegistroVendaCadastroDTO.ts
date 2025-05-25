import { ItemVendaCadastroDTO } from './ItemVendaCadastroDTO';

export interface RegistroVendaCadastroDTO {
  idCliente: number;
  valorTotal: number;
  itemVendaList: Array<ItemVendaCadastroDTO>;
  idMetodoPagamento: number;
  parcelasPagamento: number;
}
