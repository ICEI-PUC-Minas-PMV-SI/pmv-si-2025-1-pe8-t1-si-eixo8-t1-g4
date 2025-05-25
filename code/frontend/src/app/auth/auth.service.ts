import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AtualizacaoUsuarioDTO } from '../components/conta-pessoal/conta-pessoal.component';
import { UsuarioDTO } from '../components/login/cadastro-usuario/cadastro-usuario.component';
import { LoginDTO } from '../components/login/login.component';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(dto: LoginDTO): Observable<any> {
    return this.http
      .post<any>(
        `${API_URL}/auth/login`,
        dto,
        { withCredentials: true } // obrigatório para cookies
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  cadastrarUsuario(dto: UsuarioDTO): Observable<any> {
    return this.http.post(`${API_URL}/auth/usuario/cadastro`, dto);
  }

  atualizarUsuario(dto: AtualizacaoUsuarioDTO): Observable<any> {
    return this.http.put(`${API_URL}/auth/usuario/atualizacao`, dto);
  }

  buscarDadosUsuario(): Observable<any> {
    return this.http.get(`${API_URL}/auth/usuario/consulta`);
  }

  logout(): void {
    localStorage.removeItem('token');
    location.reload(); // ou redirecionar para /login
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  saveAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken(): Observable<{
    accessToken: string;
  }> {
    return this.http
      .post<{ accessToken: string }>(
        `${API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.accessToken); // salvar o novo token
        })
      );
  }
}
