export interface VacinacaoCadastroDTO {
  idVacinacao: number;
  idPet: number;
  nomeVacina: string;
  dataAplicacao: Date;
  dataProximaDose: Date;
  observacoes: string;
}
