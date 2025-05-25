import { TestBed } from '@angular/core/testing';

import { ProdutoEstoqueService } from './produto-estoque.service';

describe('ProdutoEstoqueService', () => {
  let service: ProdutoEstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoEstoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
