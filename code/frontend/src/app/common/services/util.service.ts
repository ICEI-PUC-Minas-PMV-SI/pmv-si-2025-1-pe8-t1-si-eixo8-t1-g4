import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  protected router = inject(Router);

  constructor() {}

  public redirectTo(urlPath: string, id?: string | number) {
    if (id) {
      this.router.navigateByUrl(`${urlPath}/${id}`);
    } else {
      this.router.navigateByUrl(`${urlPath}`);
    }
  }

  public redirectToWhatsApp(numero: string, mensagem?: string) {
    const numeroLimpo = numero.replace(/\D/g, '');
    const texto = mensagem ? `&text=${encodeURIComponent(mensagem)}` : '';
    const url = `https://wa.me/${numeroLimpo}${texto}`;
    window.open(url, '_blank');
  }

  // Ex.: 1753.9599999999998 -> 1753.96
  public formatarValorVenda(valor: number): number {
    return parseFloat(valor.toFixed(2));
  }
}
