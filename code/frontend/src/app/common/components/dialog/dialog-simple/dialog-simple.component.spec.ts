import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSimpleComponent } from './dialog-simple.component';

describe('DialogSimpleComponent', () => {
  let component: DialogSimpleComponent;
  let fixture: ComponentFixture<DialogSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
