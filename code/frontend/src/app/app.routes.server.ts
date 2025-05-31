import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cliente/edicao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'cliente/visualizacao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'produto/edicao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'produto/visualizacao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'venda/edicao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'venda/visualizacao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'vacinacao/edicao/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'vacinacao/visualizacao/:id',
    renderMode: RenderMode.Server,
  },
];
