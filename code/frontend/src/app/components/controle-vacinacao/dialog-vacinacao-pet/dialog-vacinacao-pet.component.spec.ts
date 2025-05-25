import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVacinacaoPetComponent } from './dialog-vacinacao-pet.component';

describe('DialogVacinacaoPetComponent', () => {
  let component: DialogVacinacaoPetComponent;
  let fixture: ComponentFixture<DialogVacinacaoPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVacinacaoPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVacinacaoPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
