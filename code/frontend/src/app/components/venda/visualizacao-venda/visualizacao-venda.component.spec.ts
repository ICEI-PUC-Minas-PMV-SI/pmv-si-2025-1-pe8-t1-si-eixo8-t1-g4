import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoVendaComponent } from './visualizacao-venda.component';

describe('VisualizacaoVendaComponent', () => {
  let component: VisualizacaoVendaComponent;
  let fixture: ComponentFixture<VisualizacaoVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoVendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacaoVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
