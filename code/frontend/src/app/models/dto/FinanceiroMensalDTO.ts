import { AcumuladoFinanceiroDTO } from "./AcumuladoFinanceiroDTO";

export interface FinanceiroMensalDTO {
  mes: string;
  totalVendas: number;
  totalValorVendas: number;
  totalLucro: number;
  acumuladoAno: AcumuladoFinanceiroDTO;
}