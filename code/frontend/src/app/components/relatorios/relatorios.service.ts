import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RelatoriosService {
  constructor(private readonly http: HttpClient) {}

  buscarProdutosMaisVendidosMensal(limit: number = 10): Observable<any> {
    return this.http.get(
      `${API_URL}/relatorios/produtosMaisVendidos/mensal?limit=${limit}`
    );
  }

  buscarProdutosMaisVendidosAnual(limit: number = 10): Observable<any> {
    return this.http.get(
      `${API_URL}/relatorios/produtosMaisVendidos/anual?limit=${limit}`
    );
  }

  buscarProdutosMaisVendidosGeral(limit: number = 10): Observable<any> {
    return this.http.get(
      `${API_URL}/relatorios/produtosMaisVendidos/geral?limit=${limit}`
    );
  }

  buscarClientesMaisCompramMensal(limit: number = 10): Observable<any> {
    return this.http.get(
      `${API_URL}/relatorios/clientesMaisCompram/mensal?limit=${limit}`
    );
  }

  buscarClientesMaisCompramAnual(limit: number = 10): Observable<any> {
    return this.http.get(
      `${API_URL}/relatorios/clientesMaisCompram/anual?limit=${limit}`
    );
  }

  buscarClientesMaisCompramGeral(limit: number = 10): Observable<any> {
    return this.http.get(
      `${API_URL}/relatorios/clientesMaisCompram/geral?limit=${limit}`
    );
  }

  buscarDiasMesMaisVendidos(): Observable<any> {
    return this.http.get(`${API_URL}/relatorios/diasMesMaisVendidos`);
  }

  buscarDiasSemanaMaisVendidos(): Observable<any> {
    return this.http.get(`${API_URL}/relatorios/diasSemanaMaisVendidos`);
  }

  buscarPetsPorTipo(): Observable<any> {
    return this.http.get(`${API_URL}/relatorios/petsPorTipo`);
  }

  buscarPetsPorRaca(): Observable<any> {
    return this.http.get(`${API_URL}/relatorios/petsPorRaca`);
  }

  buscarPetsPorIdade(): Observable<any> {
    return this.http.get(`${API_URL}/relatorios/petsPorIdade`);
  }
}
