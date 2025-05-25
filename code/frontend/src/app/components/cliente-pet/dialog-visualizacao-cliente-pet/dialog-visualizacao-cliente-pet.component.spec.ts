import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVisualizacaoClientePetComponent } from './dialog-visualizacao-cliente-pet.component';

describe('DialogVisualizacaoClientePetComponent', () => {
  let component: DialogVisualizacaoClientePetComponent;
  let fixture: ComponentFixture<DialogVisualizacaoClientePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVisualizacaoClientePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVisualizacaoClientePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
