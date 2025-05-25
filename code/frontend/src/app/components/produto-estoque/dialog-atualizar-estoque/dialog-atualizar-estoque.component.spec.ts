import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAtualizarEstoqueComponent } from './dialog-atualizar-estoque.component';

describe('DialogAtualizarEstoqueComponent', () => {
  let component: DialogAtualizarEstoqueComponent;
  let fixture: ComponentFixture<DialogAtualizarEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAtualizarEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAtualizarEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
