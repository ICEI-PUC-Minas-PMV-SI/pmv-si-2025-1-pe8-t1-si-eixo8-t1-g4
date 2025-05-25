import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-raca-pet',
  imports: [BaseChartDirective, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './relatorio-raca-pet.component.html',
  styleUrl: './relatorio-raca-pet.component.scss',
})
export class RelatorioRacaPetComponent {
  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType: ChartType = 'pie';
  chartDataset = [{ data: this.chartData }];

  constructor(
    private readonly dialogRef: MatDialogRef<RelatorioRacaPetComponent>,
    private readonly relatoriosService: RelatoriosService
  ) {}

  ngOnInit() {
    this.relatoriosService
      .buscarPetsPorRaca()
      .pipe(take(1))
      .subscribe((res: any) => {
        const objetos = res.objeto;
        this.chartLabels = objetos.map((obj: any) => obj.raca);
        this.chartData = objetos.map((obj: any) => obj.quantidade);
        this.chartDataset = [{ data: this.chartData }];
      });
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
