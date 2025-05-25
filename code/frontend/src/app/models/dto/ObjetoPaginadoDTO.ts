export interface ObjetoPaginadoDTO {
  page: number;
  pageSize: number;
  orderingField?: string;
  orderingDirection?: string;
}
