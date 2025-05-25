import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-produtos-mais-vendidos',
  imports: [
    NgIf,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  templateUrl: './relatorio-produtos-mais-vendidos.component.html',
  styleUrl: './relatorio-produtos-mais-vendidos.component.scss',
})
export class RelatorioProdutosMaisVendidosComponent {
  protected produtosMensal: any[] = [];
  protected mostrarTodosMensal: boolean = false;
  protected produtosAnual: any[] = [];
  protected mostrarTodosAnual: boolean = false;
  protected produtosGeral: any[] = [];
  protected mostrarTodosGeral: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<RelatorioProdutosMaisVendidosComponent>,
    private readonly relatoriosService: RelatoriosService,
    private readonly router: Router
  ) {}

  protected buscarRankingMensal() {
    const limite = this.mostrarTodosMensal ? 100 : 10;
    this.relatoriosService
      .buscarProdutosMaisVendidosMensal(limite)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.produtosMensal = res.objeto;
      });
  }

  protected expandirRankingMensal() {
    this.mostrarTodosMensal = true;
    this.buscarRankingMensal();
  }

  protected buscarRankingAnual() {
    const limite = this.mostrarTodosAnual ? 100 : 10;
    this.relatoriosService
      .buscarProdutosMaisVendidosAnual(limite)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.produtosAnual = res.objeto;
      });
  }

  protected expandirRankingAnual() {
    this.mostrarTodosAnual = true;
    this.buscarRankingAnual();
  }

  protected buscarRankingGeral() {
    const limite = this.mostrarTodosGeral ? 100 : 10;
    this.relatoriosService
      .buscarProdutosMaisVendidosGeral(limite)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.produtosGeral = res.objeto;
      });
  }

  protected expandirRankingGeral() {
    this.mostrarTodosGeral = true;
    this.buscarRankingGeral();
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }

  protected redirectToVisualizacaoProduto(urlPath: string, id: number) {
    this.fecharDialog();
    this.router.navigateByUrl(`${urlPath}/${id}`);
  }
}