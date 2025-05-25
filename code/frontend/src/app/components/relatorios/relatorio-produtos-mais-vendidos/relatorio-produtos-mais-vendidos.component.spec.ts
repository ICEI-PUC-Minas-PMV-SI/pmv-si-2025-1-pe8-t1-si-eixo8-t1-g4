import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioProdutosMaisVendidosComponent } from './relatorio-produtos-mais-vendidos.component';

describe('RelatorioProdutosMaisVendidosComponent', () => {
  let component: RelatorioProdutosMaisVendidosComponent;
  let fixture: ComponentFixture<RelatorioProdutosMaisVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioProdutosMaisVendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioProdutosMaisVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
