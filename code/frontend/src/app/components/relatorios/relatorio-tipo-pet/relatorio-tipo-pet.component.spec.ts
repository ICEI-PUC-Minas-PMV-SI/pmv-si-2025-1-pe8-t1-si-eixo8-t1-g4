import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioTipoPetComponent } from './relatorio-tipo-pet.component';

describe('RelatorioTipoPetComponent', () => {
  let component: RelatorioTipoPetComponent;
  let fixture: ComponentFixture<RelatorioTipoPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioTipoPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioTipoPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
