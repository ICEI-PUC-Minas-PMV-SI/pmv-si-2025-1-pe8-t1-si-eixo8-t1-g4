import { CategoriaProdutoVO } from './CategoriaProdutoVO';
import { EstoqueVO } from './EstoqueVO';
import { UnidadeMedidaVO } from './UnidadeMedidaVO';

export interface ProdutoVO {
  id: number;
  nome: string;
  precoCusto: number;
  margemLucro: number;
  precoFinalVenda: number;  categoria: CategoriaProdutoVO;
  estoque: EstoqueVO;
  unidadeMedida: UnidadeMedidaVO;
  quantidadePorMedida: number;
  dataVencimento: string;
  codigoBarras: string;
}
