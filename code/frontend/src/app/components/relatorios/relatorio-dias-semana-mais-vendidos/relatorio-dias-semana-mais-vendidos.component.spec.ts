import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDiasSemanaMaisVendidosComponent } from './relatorio-dias-semana-mais-vendidos.component';

describe('RelatorioDiasSemanaMaisVendidosComponent', () => {
  let component: RelatorioDiasSemanaMaisVendidosComponent;
  let fixture: ComponentFixture<RelatorioDiasSemanaMaisVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioDiasSemanaMaisVendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDiasSemanaMaisVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
