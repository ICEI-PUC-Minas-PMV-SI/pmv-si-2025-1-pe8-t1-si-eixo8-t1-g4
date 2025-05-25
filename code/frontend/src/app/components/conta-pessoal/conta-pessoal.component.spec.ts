import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaPessoalComponent } from './conta-pessoal.component';

describe('ContaPessoalComponent', () => {
  let component: ContaPessoalComponent;
  let fixture: ComponentFixture<ContaPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaPessoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
