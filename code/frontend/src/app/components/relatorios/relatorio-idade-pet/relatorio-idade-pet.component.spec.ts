import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioIdadePetComponent } from './relatorio-idade-pet.component';

describe('RelatorioIdadePetComponent', () => {
  let component: RelatorioIdadePetComponent;
  let fixture: ComponentFixture<RelatorioIdadePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioIdadePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioIdadePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
