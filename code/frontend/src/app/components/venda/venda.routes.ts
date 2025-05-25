import { Routes } from '@angular/router';
import { VendaComponent } from './venda.component';
import { CadastroEdicaoVendaComponent } from './cadastro-edicao-venda/cadastro-edicao-venda.component';
import { VisualizacaoVendaComponent } from './visualizacao-venda/visualizacao-venda.component';

export const VendaRoutes: Routes = [
  { path: '', component: VendaComponent },
  { path: 'cadastro', component: CadastroEdicaoVendaComponent },
  { path: 'edicao/:id', component: CadastroEdicaoVendaComponent },
  { path: 'visualizacao/:id', component: VisualizacaoVendaComponent },
];
