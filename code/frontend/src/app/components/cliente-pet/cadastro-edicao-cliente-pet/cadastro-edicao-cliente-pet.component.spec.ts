import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoClientePetComponent } from './cadastro-edicao-cliente-pet.component';

describe('CadastroEdicaoClientePetComponent', () => {
  let component: CadastroEdicaoClientePetComponent;
  let fixture: ComponentFixture<CadastroEdicaoClientePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEdicaoClientePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEdicaoClientePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
