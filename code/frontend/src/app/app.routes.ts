import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { ContaPessoalComponent } from './components/conta-pessoal/conta-pessoal.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroUsuarioComponent } from './components/login/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/cadastro', component: CadastroUsuarioComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'conta', component: ContaPessoalComponent, canActivate: [authGuard] },
  {
    path: 'cliente',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/cliente-pet/cliente-pet.routes').then(
        (m) => m.ClientePetRoutes
      ),
  },
  {
    path: 'produto',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/produto-estoque/produto-estoque.routes').then(
        (m) => m.ProdutoEstoqueRoutes
      ),
  },
  {
    path: 'financeiro',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/financeiro/financeiro.routes').then(
        (m) => m.FinanceiroRoutes
      ),
  },
  {
    path: 'venda',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/venda/venda.routes').then((m) => m.VendaRoutes),
  },
  {
    path: 'vacinacao',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/controle-vacinacao/controle-vacinacao.routes').then(
        (m) => m.VacinacaoRoutes
      ),
  },
  {
    path: 'relatorios',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/relatorios/relatorios.routes').then(
        (m) => m.RelatoriosRoutes
      ),
  },
];
