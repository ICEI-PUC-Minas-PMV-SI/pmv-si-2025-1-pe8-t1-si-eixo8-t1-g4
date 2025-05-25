import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePetComponent } from './cliente-pet.component';

describe('ClientePetComponent', () => {
  let component: ClientePetComponent;
  let fixture: ComponentFixture<ClientePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
