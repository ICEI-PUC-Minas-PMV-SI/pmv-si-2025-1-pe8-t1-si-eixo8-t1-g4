export interface ProdutoEdicaoDTO {
  id: number;
  nome: string;
  precoCusto: number;
  margemLucro: number;
  precoFinalVenda: number;
  idCategoria: number;
  quantidadeDisponivelEstoque: number;
  quantidadeMinimaEstoque: number;
  idUnidadeMedida: number;
  quantidadePorMedida: number;
  dataVencimento?: Date;
  codigoBarras?: string;
}
