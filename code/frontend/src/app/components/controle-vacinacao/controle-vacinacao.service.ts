import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VacinacaoCadastroDTO } from '../../models/dto/VacinacaoCadastroDTO';
import { VacinacaoPesquisaDTO } from '../../models/dto/VacinacaoPesquisaDTO';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ControleVacinacaoService {
  constructor(private readonly http: HttpClient) {}

  public salvar(dto: Array<VacinacaoCadastroDTO>): Observable<any> {
    return this.http.post(`${API_URL}/vacinacao`, dto);
  }

  public buscarPorIdPet(idPet: number): Observable<any> {
    return this.http.get(`${API_URL}/vacinacao/pet/${idPet}`);
  }

  public buscarPaginado(dto: VacinacaoPesquisaDTO): Observable<any> {
    return this.http.post(`${API_URL}/vacinacao/paginado`, dto);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/vacinacao/${id}`);
  }

  public buscarPetsVacinaProximoList(): Observable<any> {
    return this.http.get(`${API_URL}/vacinacao/alertas/proximas`);
  }

  public buscarPetsVacinaAtrasadaList(): Observable<any> {
    return this.http.get(`${API_URL}/vacinacao/alertas/atrasadas`);
  }
}
