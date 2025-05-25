import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  constructor(private readonly http: HttpClient) {}

  buscarResumoDiario(dia: string): Observable<any> {
    return this.http.get(`${API_URL}/financeiro/diario?dia=${dia}`);
  }

  buscarResumoMensal(mes: string): Observable<any> {
    return this.http.get(`${API_URL}/financeiro/mensal?mes=${mes}`);
  }

  buscarFaturamentoGrafico(ano: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/financeiro/grafico/faturamento?ano=${ano}`);
  }
}
