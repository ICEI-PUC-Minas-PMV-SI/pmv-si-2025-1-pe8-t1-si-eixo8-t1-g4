import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioRacaPetComponent } from './relatorio-raca-pet.component';

describe('RelatorioRacaPetComponent', () => {
  let component: RelatorioRacaPetComponent;
  let fixture: ComponentFixture<RelatorioRacaPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioRacaPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioRacaPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
