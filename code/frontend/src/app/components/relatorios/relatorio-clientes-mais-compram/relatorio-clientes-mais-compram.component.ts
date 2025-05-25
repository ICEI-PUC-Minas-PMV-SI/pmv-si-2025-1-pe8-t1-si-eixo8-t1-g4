import { CurrencyPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UtilService } from '../../../common/services/util.service';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-clientes-mais-compram',
  imports: [
    NgIf,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    MatExpansionModule,
    MatTooltipModule,
  ],
  templateUrl: './relatorio-clientes-mais-compram.component.html',
  styleUrl: './relatorio-clientes-mais-compram.component.scss',
})
export class RelatorioClientesMaisCompramComponent {
  protected clientesMensal: any[] = [];
  protected mostrarTodosMensal: boolean = false;
  protected clientesAnual: any[] = [];
  protected mostrarTodosAnual: boolean = false;
  protected clientesGeral: any[] = [];
  protected mostrarTodosGeral: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<RelatorioClientesMaisCompramComponent>,
    private readonly relatoriosService: RelatoriosService,
    protected readonly utilService: UtilService,
    private readonly router: Router
  ) {}

  protected buscarRankingMensal() {
    const limite = this.mostrarTodosMensal ? 100 : 10;
    this.relatoriosService
      .buscarClientesMaisCompramMensal(limite)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.clientesMensal = res.objeto;
      });
  }

  protected expandirRankingMensal() {
    this.mostrarTodosMensal = true;
    this.buscarRankingMensal();
  }

  protected buscarRankingAnual() {
    const limite = this.mostrarTodosAnual ? 100 : 10;
    this.relatoriosService
      .buscarClientesMaisCompramAnual(limite)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.clientesAnual = res.objeto;
      });
  }

  protected expandirRankingAnual() {
    this.mostrarTodosAnual = true;
    this.buscarRankingAnual();
  }

  protected buscarRankingGeral() {
    const limite = this.mostrarTodosGeral ? 100 : 10;
    this.relatoriosService
      .buscarClientesMaisCompramGeral(limite)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.clientesGeral = res.objeto;
      });
  }

  protected expandirRankingGeral() {
    this.mostrarTodosGeral = true;
    this.buscarRankingGeral();
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }

  protected redirectToVisualizacaoCliente(urlPath: string, id: number) {
    this.fecharDialog();
    this.router.navigateByUrl(`${urlPath}/${id}`);
  }
}