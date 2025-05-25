import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProdutoCadastroDTO } from '../../models/dto/ProdutoCadastroDTO';
import { ProdutoEdicaoDTO } from '../../models/dto/ProdutoEdicaoDTO';
import { ProdutoEstoqueAtualizacaoDTO } from '../../models/dto/ProdutoEstoqueAtualizacaoDTO';
import { ProdutoPesquisaDTO } from '../../models/dto/ProdutoPesquisaDTO';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProdutoEstoqueService {
  constructor(private readonly http: HttpClient) {}

  public buscarCategoriaProdutoList(): Observable<any> {
    return this.http.get(`${API_URL}/produto/categoria`);
  }

  public salvar(dto: ProdutoCadastroDTO): Observable<any> {
    return this.http.post(`${API_URL}/produto`, dto);
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(`${API_URL}/produto/${id}`);
  }

  public atualizar(dto: ProdutoEdicaoDTO): Observable<any> {
    return this.http.put(`${API_URL}/produto`, dto);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/produto/${id}`);
  }

  public buscarPaginado(dto: ProdutoPesquisaDTO): Observable<any> {
    return this.http.post(`${API_URL}/produto/paginado`, dto);
  }

  public buscarProdutoList(): Observable<any> {
    return this.http.get(`${API_URL}/produto`);
  }

  public atualizarEstoque(dto: ProdutoEstoqueAtualizacaoDTO): Observable<any> {
    return this.http.put(`${API_URL}/produto/estoque`, dto);
  }

  public buscarUnidadeMedidaList(): Observable<any> {
    return this.http.get(`${API_URL}/auxiliar/unidadeMedida`);
  }

  public buscarProdutosEstoqueBaixoList(): Observable<any> {
    return this.http.get(`${API_URL}/produto/estoqueBaixo`);
  }

  public buscarProdutosVencimentoProximoList(): Observable<any> {
    return this.http.get(`${API_URL}/produto/vencimentoProximo`);
  }
}
