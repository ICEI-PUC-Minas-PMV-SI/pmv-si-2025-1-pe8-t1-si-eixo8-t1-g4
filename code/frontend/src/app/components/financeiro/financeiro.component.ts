import {
  CurrencyPipe,
  DatePipe,
  NgClass,
  NgIf,
  PercentPipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { addDays, addMonths, format } from 'date-fns';
import { take } from 'rxjs/operators';
import { FinanceiroService } from './financeiro.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DialogService } from '../../common/services/dialog.service';
import { FinanceiroDiarioDTO } from '../../models/dto/FinanceiroDiarioDTO';
import { FinanceiroMensalDTO } from '../../models/dto/FinanceiroMensalDTO';

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CurrencyPipe,
    DatePipe,
    PercentPipe,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BaseChartDirective,
    MatExpansionModule,
    MatTooltipModule,
  ],
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
})
export class FinanceiroComponent {
  dataSelecionada: Date = new Date();
  resumoFinanceiroDiario: FinanceiroDiarioDTO | null = null;
  resumoFinanceiroMensal: FinanceiroMensalDTO | null = null;

  ticketMedioDiario!: number;
  margemLucroDiario!: number;
  faturamentoBrutoDiario!: number;
  faturamentoLiquidoDiario!: number;
  variacaoFaturamentoDiario!: number;

  ticketMedioMensal!: number;
  margemLucroMensal!: number;
  faturamentoBrutoMensal!: number;
  faturamentoLiquidoMensal!: number;
  variacaoFaturamentoMensal!: number;

  graficoLabels: string[] = [];
  graficoDadosFaturamento: number[] = [];
  graficoDadosLucro: number[] = [];

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
  };

  lineChartDataFaturamento: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  lineChartDataLucro: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  constructor(
    private readonly financeiroService: FinanceiroService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.buscarDadosFinanceiroDiario();
  }

  protected buscarDadosFinanceiroDiario(): void {
    const dataFormatada = format(this.dataSelecionada, 'yyyy-MM-dd');

    this.financeiroService
      .buscarResumoDiario(dataFormatada)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.resumoFinanceiroDiario = rs.objeto;

            const totalVendas = this.resumoFinanceiroDiario!.totalVendas;
            const totalValor = this.resumoFinanceiroDiario!.totalValorVendas;
            const totalLucro = this.resumoFinanceiroDiario!.totalLucro;

            this.ticketMedioDiario =
              totalVendas > 0 ? totalValor / totalVendas : 0;
            this.margemLucroDiario =
              totalValor > 0 ? (totalLucro / totalValor) * 100 : 0;
            this.faturamentoBrutoDiario = totalValor;
            this.faturamentoLiquidoDiario = totalLucro;

            const diaAnterior = addDays(this.dataSelecionada, -1);
            const diaAnteriorStr = format(diaAnterior, 'yyyy-MM-dd');

            this.financeiroService
              .buscarResumoDiario(diaAnteriorStr)
              .pipe(take(1))
              .subscribe({
                next: (resAnterior: any) => {
                  const anterior = resAnterior.objeto;
                  const anteriorValor = anterior?.totalValorVendas ?? 0;
                  if (anteriorValor > 0) {
                    const variacao =
                      ((totalValor - anteriorValor) / anteriorValor) * 100;
                    this.variacaoFaturamentoDiario = parseFloat(
                      variacao.toFixed(2)
                    );
                  } else {
                    this.variacaoFaturamentoDiario = 0;
                  }
                },
              });
          }
        },
        error: () => {
          this.resumoFinanceiroDiario = null;
          this.dialogService.openDialogWarning(
            'Não foi possível carregar os dados financeiros diário. Recarrege a página e tente novamente.'
          );
        },
      });
  }

  protected buscarDadosFinanceiroMensal(): void {
    const mesFormatado = format(this.dataSelecionada, 'yyyy-MM');

    this.financeiroService
      .buscarResumoMensal(mesFormatado)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.resumoFinanceiroMensal = rs.objeto;

            const totalVendas = this.resumoFinanceiroMensal!.totalVendas;
            const totalValor = this.resumoFinanceiroMensal!.totalValorVendas;
            const totalLucro = this.resumoFinanceiroMensal!.totalLucro;

            this.ticketMedioMensal =
              totalVendas > 0 ? totalValor / totalVendas : 0;
            this.margemLucroMensal =
              totalValor > 0 ? (totalLucro / totalValor) * 100 : 0;
            this.faturamentoBrutoMensal = totalValor;
            this.faturamentoLiquidoMensal = totalLucro;

            const mesAnterior = addMonths(this.dataSelecionada, -1);
            const mesAnteriorStr = format(mesAnterior, 'yyyy-MM');

            this.financeiroService
              .buscarResumoMensal(mesAnteriorStr)
              .pipe(take(1))
              .subscribe({
                next: (resAnterior: any) => {
                  const anterior = resAnterior.objeto;
                  const anteriorValor = anterior?.totalValorVendas ?? 0;
                  if (anteriorValor > 0) {
                    const variacao =
                      ((totalValor - anteriorValor) / anteriorValor) * 100;
                    this.variacaoFaturamentoMensal = parseFloat(
                      variacao.toFixed(2)
                    );
                  } else {
                    this.variacaoFaturamentoMensal = 0;
                  }
                },
              });
          }
        },
        error: () => {
          this.resumoFinanceiroMensal = null;
          this.dialogService.openDialogWarning(
            'Não foi possível carregar os dados financeiros mensal. Recarrege a página e tente novamente.'
          );
        },
      });
  }

  protected buscarDadosGraficoFaturamento(): void {
    const ano = this.dataSelecionada.getFullYear();

    this.financeiroService
      .buscarFaturamentoGrafico(ano)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const dados = rs.objeto;
            this.graficoLabels = dados.map((d: any) => d.mes);
            this.graficoDadosFaturamento = dados.map(
              (d: any) => d.totalVendido
            );
            this.graficoDadosLucro = dados.map((d: any) => d.totalLucro);

            this.lineChartDataFaturamento = {
              labels: this.graficoLabels,
              datasets: [
                {
                  data: this.graficoDadosFaturamento,
                  label: 'Faturamento',
                  fill: false,
                  tension: 0.4,
                },
              ],
            };

            this.lineChartDataLucro = {
              labels: this.graficoLabels,
              datasets: [
                {
                  data: this.graficoDadosLucro,
                  label: 'Lucro',
                  fill: false,
                  tension: 0.4,
                  borderColor: 'green',
                },
              ],
            };
          }
        },
        error: () => {
          this.graficoLabels = [];
          this.graficoDadosFaturamento = [];
          this.graficoDadosLucro = [];
          this.dialogService.openDialogWarning(
            'Não foi possível carregar os gráficos. Recarrege a página e tente novamente.'
          );
        },
      });
  }

  protected voltarMes(): void {
    this.dataSelecionada = addMonths(this.dataSelecionada, -1);
    this.buscarDadosFinanceiroMensal();
  }

  protected avancarMes(): void {
    this.dataSelecionada = addMonths(this.dataSelecionada, 1);
    this.buscarDadosFinanceiroMensal();
  }

  protected voltarDia(): void {
    this.dataSelecionada = addDays(this.dataSelecionada, -1);
    this.buscarDadosFinanceiroDiario();
  }

  protected avancarDia(): void {
    this.dataSelecionada = addDays(this.dataSelecionada, 1);
    this.buscarDadosFinanceiroDiario();
  }
}
