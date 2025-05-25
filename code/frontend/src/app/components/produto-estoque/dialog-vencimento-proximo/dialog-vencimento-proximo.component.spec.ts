import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVencimentoProximoComponent } from './dialog-vencimento-proximo.component';

describe('DialogVencimentoProximoComponent', () => {
  let component: DialogVencimentoProximoComponent;
  let fixture: ComponentFixture<DialogVencimentoProximoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogVencimentoProximoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVencimentoProximoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
