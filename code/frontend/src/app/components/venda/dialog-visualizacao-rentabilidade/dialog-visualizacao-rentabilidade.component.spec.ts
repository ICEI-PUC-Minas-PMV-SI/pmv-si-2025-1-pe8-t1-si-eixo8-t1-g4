import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisualizacaoRentabilidadeComponent } from './dialog-visualizacao-rentabilidade.component';

describe('DialogVisualizacaoRentabilidadeComponent', () => {
  let component: DialogVisualizacaoRentabilidadeComponent;
  let fixture: ComponentFixture<DialogVisualizacaoRentabilidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVisualizacaoRentabilidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVisualizacaoRentabilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
