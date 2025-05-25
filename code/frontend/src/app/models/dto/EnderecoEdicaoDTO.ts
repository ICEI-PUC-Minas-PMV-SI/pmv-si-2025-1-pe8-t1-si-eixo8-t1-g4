export interface EnderecoEdicaoDTO {
    id: number;
    cep: string;
    logradouro: string;
    numero: string;
    semNumero: boolean;
    bairro: string;
    cidade: string;
    complemento: string;
    uf: string;
}