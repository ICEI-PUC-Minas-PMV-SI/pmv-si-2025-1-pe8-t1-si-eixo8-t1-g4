import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoProdutoEstoqueComponent } from './cadastro-edicao-produto-estoque.component';

describe('CadastroEdicaoProdutoEstoqueComponent', () => {
  let component: CadastroEdicaoProdutoEstoqueComponent;
  let fixture: ComponentFixture<CadastroEdicaoProdutoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEdicaoProdutoEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEdicaoProdutoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
