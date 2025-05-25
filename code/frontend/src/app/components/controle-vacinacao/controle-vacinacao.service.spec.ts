import { TestBed } from '@angular/core/testing';

import { ControleVacinacaoService } from './controle-vacinacao.service';

describe('ControleVacinacaoService', () => {
  let service: ControleVacinacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleVacinacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
