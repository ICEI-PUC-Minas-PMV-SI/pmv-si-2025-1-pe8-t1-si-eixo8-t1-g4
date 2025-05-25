import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegistroVendaCadastroDTO } from '../../models/dto/RegistroVendaCadastroDTO';
import { RegistroVendaEdicaoDTO } from '../../models/dto/RegistroVendaEdicaoDTO';
import { RegistroVendaPesquisaDTO } from '../../models/dto/RegistroVendaPesquisaDTO';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  constructor(private readonly http: HttpClient) {}
  public salvar(dto: RegistroVendaCadastroDTO): Observable<any> {
    return this.http.post(`${API_URL}/registroVenda`, dto);
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(`${API_URL}/registroVenda/${id}`);
  }

  public atualizar(dto: RegistroVendaEdicaoDTO): Observable<any> {
    return this.http.put(`${API_URL}/registroVenda`, dto);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/registroVenda/${id}`);
  }

  public buscarPaginado(dto: RegistroVendaPesquisaDTO): Observable<any> {
    return this.http.post(`${API_URL}/registroVenda/paginado`, dto);
  }

  public buscarMetodoPagamentoList(): Observable<any> {
    return this.http.get(`${API_URL}/auxiliar/metodoPagamento`);
  }
}
