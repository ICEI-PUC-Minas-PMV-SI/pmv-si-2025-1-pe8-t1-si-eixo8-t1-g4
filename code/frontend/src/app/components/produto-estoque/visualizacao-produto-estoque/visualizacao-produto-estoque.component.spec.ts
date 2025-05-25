import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoProdutoEstoqueComponent } from './visualizacao-produto-estoque.component';

describe('VisualizacaoProdutoEstoqueComponent', () => {
  let component: VisualizacaoProdutoEstoqueComponent;
  let fixture: ComponentFixture<VisualizacaoProdutoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoProdutoEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacaoProdutoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
