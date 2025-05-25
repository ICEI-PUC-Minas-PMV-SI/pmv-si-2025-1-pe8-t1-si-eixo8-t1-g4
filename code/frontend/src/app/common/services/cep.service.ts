import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SnackbarService } from './snackbar.service';

const URL: string = 'https://viacep.com.br/ws/';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private readonly URL = 'https://viacep.com.br/ws/';

  constructor(
    private readonly http: HttpClient,
    private readonly snackbarService: SnackbarService
  ) {}

  async consultarCEP(cep: string): Promise<CepVO | null> {
    if (!cep || cep.length !== 8) {
      this.snackbarService.openSnackBar('CEP inválido.');
      return null;
    }

    try {
      const dados: CepVO = await firstValueFrom(
        this.http.get<CepVO>(`${this.URL}${cep}/json/`)
      );
      if (dados.erro === 'true') {
        this.snackbarService.openSnackBar('CEP não encontrado.');
        return null;
      }
      return dados;
    } catch (error) {
      if (error) {
        this.snackbarService.openSnackBar(
          'Falha na comunicação com o serviço de CEP.'
        );
      }

      return null;
    }
  }
}

export interface CepVO {
  cep: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  localidade: string;
  estado: string;
  uf: string;
  erro?: string;
}
