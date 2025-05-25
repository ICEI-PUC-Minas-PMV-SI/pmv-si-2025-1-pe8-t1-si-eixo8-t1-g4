import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly eventoAlertasSubject = new Subject<any>();
  eventoAlertasObservable = this.eventoAlertasSubject.asObservable();

  emitirEventoAlertas(valor: any) {
    this.eventoAlertasSubject.next(valor);
  }

  constructor() {}
}
