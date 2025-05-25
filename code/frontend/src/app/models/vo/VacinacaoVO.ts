import { PetVO } from "./PetVO";

export interface VacinacaoVO {
  id: number;
  pet: PetVO;
  nomeVacina: string;
  dataAplicacao: string;
  dataProximaDose: string;
  observacoes: string;
}
