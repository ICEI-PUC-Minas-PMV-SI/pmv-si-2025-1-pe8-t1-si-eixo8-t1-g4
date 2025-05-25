import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

/**
 * É executado antes de toda requisição.
 * Adiciona o token em todas as requisições.
 * Registrado via provideHttpClient(withInterceptors(...)) no app.config.ts.
 *
 * Lida com:
 * 1. Requisições que falham com 401 Unauthorized
 * 2. Chamada automática ao endpoint /auth/refresh
 * 3. Repetição da requisição original com o novo token
 *
 */

export const jwtInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  // Aplica lógica apenas para chamadas à API interna
  const isApiRequest = req.url.startsWith(environment.apiUrl);

  if (isApiRequest) {
    // Clona a requisição original com o token, se existir
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // importante para que o cookie seja enviado
        })
      : req.clone({ withCredentials: true });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se for 401, tenta refresh
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((res) => {
              const newToken = res.accessToken;
              // Salva novo token
              localStorage.setItem('token', newToken);

              // Refaz a requisição original com o novo token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`, // token correto, não reusado do anterior
                },
                withCredentials: true,
              });

              return next(retryReq);
            }),
            catchError(() => {
              // Refresh falhou → logout
              authService.logout();
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  // Se não for chamada para API interna, como a do ViaCep, passa direto
  return next(req);
};
