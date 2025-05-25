import { Routes } from '@angular/router';
import { CadastroEdicaoProdutoEstoqueComponent } from './cadastro-edicao-produto-estoque/cadastro-edicao-produto-estoque.component';
import { ProdutoEstoqueComponent } from './produto-estoque.component';
import { VisualizacaoProdutoEstoqueComponent } from './visualizacao-produto-estoque/visualizacao-produto-estoque.component';

export const ProdutoEstoqueRoutes: Routes = [
  { path: '', component: ProdutoEstoqueComponent },
  { path: 'cadastro', component: CadastroEdicaoProdutoEstoqueComponent },
  { path: 'edicao/:id', component: CadastroEdicaoProdutoEstoqueComponent },
  { path: 'visualizacao/:id', component: VisualizacaoProdutoEstoqueComponent },
];
