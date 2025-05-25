import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoVendaComponent } from './cadastro-edicao-venda.component';

describe('CadastroEdicaoVendaComponent', () => {
  let component: CadastroEdicaoVendaComponent;
  let fixture: ComponentFixture<CadastroEdicaoVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEdicaoVendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEdicaoVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
