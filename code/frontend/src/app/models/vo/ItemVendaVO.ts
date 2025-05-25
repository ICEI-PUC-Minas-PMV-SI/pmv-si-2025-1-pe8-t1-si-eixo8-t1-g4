import { ProdutoVO } from './ProdutoVO';
import { RegistroVendaVO } from './RegistroVendaVO';
import { UnidadeMedidaVO } from './UnidadeMedidaVO';

export interface ItemVendaVO {
  id: number;
  venda: RegistroVendaVO;
  produto: ProdutoVO;
  unidadeMedidaVenda: UnidadeMedidaVO; 
  quantidade: number;
  precoUnitarioVenda: number;
  subtotal: number;
  precoUnitarioCusto: number;
  margemLucro: number;
  lucro: number;
}
