import { IdDescricao } from '../interface/IdDescricao';
import { RegistroVendaVO } from './RegistroVendaVO';

export interface PagamentoVO {
  id: number;
  registroVenda: RegistroVendaVO;
  metodoPagamento: IdDescricao;
  parcelas: number;
  statusPagamento: IdDescricao;
  valorPago: number;
  dataPagamento: Date;
}
