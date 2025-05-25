import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClienteCadastroDTO } from '../../models/dto/ClienteCadastroDTO';
import { ClienteEdicaoDTO } from '../../models/dto/ClienteEdicaoDTO';
import { ClientePesquisaDTO } from '../../models/dto/ClientePesquisaDTO';
import { PetVO } from '../../models/vo/PetVO';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientePetService {
  constructor(private readonly http: HttpClient) {}

  public salvar(dto: ClienteCadastroDTO): Observable<any> {
    return this.http.post(`${API_URL}/cliente`, dto);
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(`${API_URL}/cliente/id/${id}`);
  }

  public buscarPorCpf(cpf: string): Observable<any> {
    return this.http.get(`${API_URL}/cliente/cpf/${cpf}`);
  }

  public atualizar(dto: ClienteEdicaoDTO): Observable<any> {
    return this.http.put(`${API_URL}/cliente`, dto);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/cliente/${id}`);
  }

  public buscarPaginado(dto: ClientePesquisaDTO): Observable<any> {
    return this.http.post(`${API_URL}/cliente/paginado`, dto);
  }

  public buscarClienteList(): Observable<any> {
    return this.http.get(`${API_URL}/cliente`);
  }

  public buscarTipoPetList(): Observable<any> {
    return this.http.get(`${API_URL}/auxiliar/tipoPet`);
  }

  public buscarRacaPetList(): Observable<any> {
    return this.http.get(`${API_URL}/auxiliar/racaPet`);
  }

  public buscarPortePetList(): Observable<any> {
    return this.http.get(`${API_URL}/auxiliar/portePet`);
  }

  public buscarPetsAniversarioProximoList(): Observable<any> {
    return this.http.get(`${API_URL}/cliente/pet/aniversarioProximo`);
  }

  public buscarClientePetsList(idCliente: number): Observable<any> {
    return this.http.get(`${API_URL}/cliente/${idCliente}/pet`);
  }

  public buscarClientePorIdPet(idPet: number): Observable<any> {
    return this.http.get(`${API_URL}/cliente/pet/${idPet}`);
  }

  public calcularIdadePet(pet: PetVO): string {
    let idade: string = '';
    const dataAtual: Date = new Date();

    let dataNascimento = null;
    if (pet.dataNascimento !== null && pet.dataNascimento !== undefined) {
      const [ano, mes, dia] = pet?.dataNascimento.split('-').map(Number);
      dataNascimento = new Date(ano, mes - 1, dia);
    }

    if (dataAtual && dataNascimento !== null) {
      if (dataNascimento > dataAtual) {
        throw new Error('A data de nascimento não pode ser no futuro.');
      }

      let anos = dataAtual.getFullYear() - dataNascimento.getFullYear();
      let meses = dataAtual.getMonth() - dataNascimento.getMonth();

      if (dataAtual.getDate() < dataNascimento.getDate()) {
        meses--;
      }

      if (meses < 0) {
        anos--;
        meses += 12;
      }

      idade = `${anos} anos e ${meses} meses`;
    }

    return idade;
  }
}
