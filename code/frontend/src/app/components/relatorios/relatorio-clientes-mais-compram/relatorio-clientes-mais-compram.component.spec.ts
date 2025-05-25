import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioClientesMaisCompramComponent } from './relatorio-clientes-mais-compram.component';

describe('RelatorioClientesMaisCompramComponent', () => {
  let component: RelatorioClientesMaisCompramComponent;
  let fixture: ComponentFixture<RelatorioClientesMaisCompramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioClientesMaisCompramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioClientesMaisCompramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
