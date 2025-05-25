import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisualizacaoPetAniversarioProximoComponent } from './dialog-visualizacao-pet-aniversario.component';

describe('DialogVisualizacaoPetAniversarioProximoComponent', () => {
  let component: DialogVisualizacaoPetAniversarioProximoComponent;
  let fixture: ComponentFixture<DialogVisualizacaoPetAniversarioProximoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVisualizacaoPetAniversarioProximoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVisualizacaoPetAniversarioProximoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
