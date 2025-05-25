import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-dias-mes-mais-vendidos',
  imports: [BaseChartDirective, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './relatorio-dias-mes-mais-vendidos.component.html',
  styleUrl: './relatorio-dias-mes-mais-vendidos.component.scss',
})
export class RelatorioDiasMesMaisVendidosComponent {
  labels: string[] = [];
  data: number[] = [];

  barChartData: any = {};

  constructor(
    private readonly dialogRef: MatDialogRef<RelatorioDiasMesMaisVendidosComponent>,
    private readonly relatoriosService: RelatoriosService
  ) {}

  ngOnInit() {
    this.relatoriosService
      .buscarDiasMesMaisVendidos()
      .pipe(take(1))
      .subscribe((res: any) => {
        const objetos = res.objeto;
        this.labels = objetos.map((obj: any) => obj.dia);
        this.data = objetos.map((obj: any) => obj.totalVendido);

        this.barChartData = {
          labels: this.labels,
          datasets: [{ data: this.data, label: 'Vendas (R$) por Dia do Mês' }],
        };
      });
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
