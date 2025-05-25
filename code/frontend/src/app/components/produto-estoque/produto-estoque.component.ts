import { PercentPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../common/components/title-page/title-page.component';
import { PriceMaskPipe } from '../../common/pipes/price-mask.pipe';
import { DialogService } from '../../common/services/dialog.service';
import { SnackbarService } from '../../common/services/snackbar.service';
import { UtilService } from '../../common/services/util.service';
import { ProdutoPesquisaDTO } from '../../models/dto/ProdutoPesquisaDTO';
import { CategoriaProdutoVO } from '../../models/vo/CategoriaProdutoVO';
import { HomeService } from '../home/home.service';
import { DialogAtualizarEstoqueComponent } from './dialog-atualizar-estoque/dialog-atualizar-estoque.component';
import { ProdutoEstoqueService } from './produto-estoque.service';

@Component({
  selector: 'app-produto-estoque',
  imports: [
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    PriceMaskPipe,
    MatTooltipModule,
    MatSortModule,
    MatProgressSpinnerModule,
    PercentPipe,
  ],
  templateUrl: './produto-estoque.component.html',
  styleUrl: './produto-estoque.component.scss',
})
export class ProdutoEstoqueComponent {
  readonly utilService = inject(UtilService);

  protected isLoading = false;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected pesquisaForm!: FormGroup;

  protected categoriaProdutoList: Array<CategoriaProdutoVO> = [];

  displayedColumns: string[] = [
    'nome',
    'categoria',
    'medida',
    'precoCusto',
    'margemLucro',
    'precoFinalVenda',
    'quantidadeDisponivel',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;
  pageSize: number = 10;
  page: number = 0;

  private readonly pesquisaSubject = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly produtoEstoqueService: ProdutoEstoqueService,
    private readonly dialogService: DialogService,
    private readonly formBuilder: FormBuilder,
    private readonly snackbarService: SnackbarService,
    private readonly homeService: HomeService
  ) {
    this.buttonsTitlePage = [
      {
        name: 'Novo Cadastro',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: 'produto/cadastro',
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarCategoriaProdutoList();

    this.pesquisaSubject.pipe(debounceTime(500)).subscribe(() => {
      this.pesquisarProdutos();
    });

    this.pesquisarProdutos();

    this.homeService.emitirEventoAlertas('');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe((sort: Sort) => {
      this.page = 0;
      this.onPesquisar();
    });
  }

  private initForm(): void {
    this.pesquisaForm = this.formBuilder.group({
      nomeProduto: new FormControl<string | null>(null),
      idCategoriaProduto: new FormControl<number | null>(null),
    });
  }

  private buscarCategoriaProdutoList() {
    this.produtoEstoqueService
      .buscarCategoriaProdutoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.categoriaProdutoList = rs.objeto;
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  protected onPesquisar() {
    this.page = 0;
    this.pesquisaSubject.next();
  }

  protected pesquisarProdutos() {
    this.isLoading = true;

    const dto: ProdutoPesquisaDTO = {
      nome: this.pesquisaForm.get('nomeProduto')?.value,
      idCategoria: this.pesquisaForm.get('idCategoriaProduto')?.value,
      page: this.page,
      pageSize: this.pageSize,
      orderingField: this.sort?.active || 'nome',
      orderingDirection: this.sort?.direction || 'asc',
    };

    this.produtoEstoqueService
      .buscarPaginado(dto)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.dataSource.data = rs.objeto;
            this.totalElements = rs.paginacao.totalElements;
          }

          this.isLoading = false;
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.dataSource.data = [];
          }

          this.isLoading = false;
        },
      });
  }

  protected limparFiltro() {
    this.pesquisaForm.reset();
    this.onPesquisar();
  }

  protected openModalAtualizarEstoque(idProduto: number) {
    const dialogConfig: MatDialogConfig = {
      width: '90%',
      data: {
        idProduto: idProduto,
      },
    };
    this.dialogService.openDialogComponent(
      DialogAtualizarEstoqueComponent,
      dialogConfig
    );
  }

  protected excluirProduto(id: number) {
    const dialog = this.dialogService.openDialogSimple({
      title: 'Atenção!',
      message: 'Tem certeza que deseja excluir este produto?',
      labelButton2: 'Não',
      labelButton1: 'Sim',
    });

    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.produtoEstoqueService
          .excluir(id)
          .pipe(take(1))
          .subscribe({
            next: (rs: any) => {
              if (rs.codigoMensagem === 200) {
                const dialog = this.dialogService.openDialogSuccess(
                  'Exclusão do produto realizada.'
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
    this.pesquisaSubject.next();
  }
}
