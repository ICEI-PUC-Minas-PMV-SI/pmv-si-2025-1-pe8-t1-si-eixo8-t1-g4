import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleVacinacaoComponent } from './controle-vacinacao.component';

describe('ControleVacinacaoComponent', () => {
  let component: ControleVacinacaoComponent;
  let fixture: ComponentFixture<ControleVacinacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleVacinacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleVacinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
