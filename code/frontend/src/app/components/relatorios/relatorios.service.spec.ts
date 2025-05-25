import { TestBed } from '@angular/core/testing';

import { RelatoriosService } from './relatorios.service';

describe('RelatoriosService', () => {
  let service: RelatoriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatoriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
