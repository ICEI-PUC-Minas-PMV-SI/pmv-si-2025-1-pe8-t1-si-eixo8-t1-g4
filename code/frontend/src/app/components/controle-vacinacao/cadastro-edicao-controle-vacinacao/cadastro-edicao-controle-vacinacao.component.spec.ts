import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoControleVacinacaoComponent } from './cadastro-edicao-controle-vacinacao.component';

describe('CadastroEdicaoControleVacinacaoComponent', () => {
  let component: CadastroEdicaoControleVacinacaoComponent;
  let fixture: ComponentFixture<CadastroEdicaoControleVacinacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEdicaoControleVacinacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEdicaoControleVacinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
