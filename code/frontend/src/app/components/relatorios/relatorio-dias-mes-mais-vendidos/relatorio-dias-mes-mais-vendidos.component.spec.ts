import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDiasMesMaisVendidosComponent } from './relatorio-dias-mes-mais-vendidos.component';

describe('RelatorioDiasMesMaisVendidosComponent', () => {
  let component: RelatorioDiasMesMaisVendidosComponent;
  let fixture: ComponentFixture<RelatorioDiasMesMaisVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioDiasMesMaisVendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDiasMesMaisVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
