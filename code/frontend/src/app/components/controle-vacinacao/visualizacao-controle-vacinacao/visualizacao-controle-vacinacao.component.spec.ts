import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoControleVacinacaoComponent } from './visualizacao-controle-vacinacao.component';

describe('VisualizacaoControleVacinacaoComponent', () => {
  let component: VisualizacaoControleVacinacaoComponent;
  let fixture: ComponentFixture<VisualizacaoControleVacinacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoControleVacinacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacaoControleVacinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
