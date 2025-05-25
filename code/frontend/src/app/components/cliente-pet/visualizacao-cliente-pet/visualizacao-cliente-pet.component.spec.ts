import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoClientePetComponent } from './visualizacao-cliente-pet.component';

describe('VisualizacaoClientePetComponent', () => {
  let component: VisualizacaoClientePetComponent;
  let fixture: ComponentFixture<VisualizacaoClientePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoClientePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacaoClientePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
