import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEstoqueBaixoComponent } from './dialog-estoque-baixo.component';

describe('DialogEstoqueBaixoComponent', () => {
  let component: DialogEstoqueBaixoComponent;
  let fixture: ComponentFixture<DialogEstoqueBaixoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEstoqueBaixoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEstoqueBaixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
