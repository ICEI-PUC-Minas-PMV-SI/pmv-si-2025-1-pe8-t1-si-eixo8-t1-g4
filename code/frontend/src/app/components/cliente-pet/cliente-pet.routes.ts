import { Routes } from '@angular/router';
import { CadastroEdicaoClientePetComponent } from './cadastro-edicao-cliente-pet/cadastro-edicao-cliente-pet.component';
import { ClientePetComponent } from './cliente-pet.component';
import { VisualizacaoClientePetComponent } from './visualizacao-cliente-pet/visualizacao-cliente-pet.component';

export const ClientePetRoutes: Routes = [
  { path: '', component: ClientePetComponent },
  { path: 'cadastro', component: CadastroEdicaoClientePetComponent },
  { path: 'edicao/:id', component: CadastroEdicaoClientePetComponent },
  { path: 'visualizacao/:id', component: VisualizacaoClientePetComponent },
];
