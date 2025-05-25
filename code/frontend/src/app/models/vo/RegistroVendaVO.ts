import { ClienteVO } from './ClienteVO';
import { ItemVendaVO } from './ItemVendaVO';
import { PagamentoVO } from './PagamentoVO';

export interface RegistroVendaVO {
  id: number;
  cliente: ClienteVO;
  valorTotal: number;
  dataVenda: Date;
  lucro: number;
  itens: Array<ItemVendaVO>;
  pagamento: PagamentoVO;
}
