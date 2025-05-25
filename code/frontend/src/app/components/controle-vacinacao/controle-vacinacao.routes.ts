import { Routes } from '@angular/router';
import { CadastroEdicaoControleVacinacaoComponent } from './cadastro-edicao-controle-vacinacao/cadastro-edicao-controle-vacinacao.component';
import { ControleVacinacaoComponent } from './controle-vacinacao.component';
import { VisualizacaoControleVacinacaoComponent } from './visualizacao-controle-vacinacao/visualizacao-controle-vacinacao.component';

export const VacinacaoRoutes: Routes = [
  { path: '', component: ControleVacinacaoComponent },
  { path: 'cadastro', component: CadastroEdicaoControleVacinacaoComponent },
  { path: 'edicao/:id', component: CadastroEdicaoControleVacinacaoComponent },
  {
    path: 'visualizacao/:id',
    component: VisualizacaoControleVacinacaoComponent,
  },
];
