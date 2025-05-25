import { DatePipe, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../common/components/title-page/title-page.component';
import { PriceMaskPipe } from '../../common/pipes/price-mask.pipe';
import { DialogService } from '../../common/services/dialog.service';
import { UtilService } from '../../common/services/util.service';
import { RegistroVendaPesquisaDTO } from '../../models/dto/RegistroVendaPesquisaDTO';
import { DialogVisualizacaoRentabilidadeComponent } from './dialog-visualizacao-rentabilidade/dialog-visualizacao-rentabilidade.component';
import { VendaService } from './venda.service';

@Component({
  selector: 'app-venda',
  imports: [
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    DatePipe,
    PriceMaskPipe,
    PercentPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss',
})
export class VendaComponent {
  readonly utilService = inject(UtilService);

  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected pesquisaForm!: FormGroup;

  displayedColumns: string[] = [
    'nomeCliente',
    'valorTotal',
    'lucro',
    'dataVenda',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;
  pageSize: number = 10;
  page: number = 0;

  constructor(
    private readonly vendaService: VendaService,
    private readonly dialogService: DialogService,
    private readonly formBuilder: FormBuilder
  ) {
    this.buttonsTitlePage = [
      {
        name: 'Novo Cadastro',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: 'venda/cadastro',
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.pesquisarRegistrosVenda();
  }

  private initForm(): void {
    this.pesquisaForm = this.formBuilder.group({
      nomeCliente: new FormControl<string | null>(null),
      dataInicial: new FormControl<Date | null>(null),
      dataFinal: new FormControl<Date | null>(null),
    });
  }

  protected pesquisarRegistrosVenda() {
    const dto: RegistroVendaPesquisaDTO = {
      nomeCliente: this.pesquisaForm.get('nomeCliente')?.value,
      dataInicial: this.pesquisaForm.get('dataInicial')?.value,
      dataFinal: this.pesquisaForm.get('dataFinal')?.value,
      page: this.page,
      pageSize: this.pageSize,
      orderingField: 'dataVenda',
      orderingDirection: 'desc',
    };

    this.vendaService
      .buscarPaginado(dto)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.dataSource.data = rs.objeto;
            this.totalElements = rs.paginacao.totalElements;

            this.calcularLucroVenda();
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.dataSource.data = [];
          }
        },
      });
  }

  protected limparFiltro() {
    this.pesquisaForm.reset();
    this.pesquisarRegistrosVenda();
  }

  private calcularLucroVenda() {
    this.dataSource.data.forEach((element: any) => {
      element.porcentagemLucro = element.lucro / element.valorTotal;
    });
  }

  protected openModalVisualizacaoRentabilidade(idVenda: number) {
    const dialogConfig: MatDialogConfig = {
      width: '90%',
      height: '80%',
      data: {
        idVenda: idVenda,
      },
    };
    this.dialogService.openDialogComponent(
      DialogVisualizacaoRentabilidadeComponent,
      dialogConfig
    );
  }

  protected excluirRegistroVenda(id: number) {
    const dialog = this.dialogService.openDialogSimple({
      title: 'Atenção!',
      message: 'Tem certeza que deseja excluir este registro de venda?',
      labelButton2: 'Não',
      labelButton1: 'Sim',
    });

    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.vendaService
          .excluir(id)
          .pipe(take(1))
          .subscribe({
            next: (rs: any) => {
              if (rs.codigoMensagem === 200) {
                const dialog = this.dialogService.openDialogSuccess(
                  'Exclusão do registro de venda realizada.'
                );
                dialog.afterClosed().subscribe((rs) => {
                  if (rs) {
                    location.reload();
                  }
                });
              }
            },
            error: (err: any) => {},
          });
      }
    });
  }

  protected onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pesquisarRegistrosVenda();
  }
}
