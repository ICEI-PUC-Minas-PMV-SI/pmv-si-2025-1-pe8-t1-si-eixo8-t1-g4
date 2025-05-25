import { DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, Subject, take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../common/components/title-page/title-page.component';
import { DialogService } from '../../common/services/dialog.service';
import { UtilService } from '../../common/services/util.service';
import { VacinacaoPesquisaDTO } from '../../models/dto/VacinacaoPesquisaDTO';
import { ControleVacinacaoService } from './controle-vacinacao.service';

@Component({
  selector: 'app-controle-vacinacao',
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
    MatTooltipModule,
    MatSortModule,
    DatePipe,
  ],
  templateUrl: './controle-vacinacao.component.html',
  styleUrl: './controle-vacinacao.component.scss',
})
export class ControleVacinacaoComponent {
  readonly utilService = inject(UtilService);

  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected pesquisaForm!: FormGroup;

  displayedColumns: string[] = [
    'nomePet',
    'nomeCliente',
    'dataProximaVacinacao',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;
  pageSize: number = 10;
  page: number = 0;

  private readonly pesquisaSubject = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly controleVacinacaoService: ControleVacinacaoService,
    private readonly dialogService: DialogService,
    private readonly formBuilder: FormBuilder
  ) {
    this.buttonsTitlePage = [
      {
        name: 'Novo Cadastro',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: 'vacinacao/cadastro',
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();

    this.pesquisaSubject.pipe(debounceTime(500)).subscribe(() => {
      this.pesquisarPets();
    });

    this.pesquisarPets();
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
      nomePet: new FormControl<string | null>(null),
      nomeCliente: new FormControl<string | null>(null),
    });
  }

  protected onPesquisar() {
    this.page = 0;
    this.pesquisaSubject.next();
  }

  protected pesquisarPets() {
    const dto: VacinacaoPesquisaDTO = {
      nomePet: this.pesquisaForm.get('nomePet')?.value,
      nomeCliente: this.pesquisaForm.get('nomeCliente')?.value,
      page: this.page,
      pageSize: this.pageSize,
    };

    this.controleVacinacaoService
      .buscarPaginado(dto)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.dataSource.data = rs.objeto;
            this.totalElements = rs.paginacao.totalElements;
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
    this.onPesquisar();
  }

  protected onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pesquisaSubject.next();
  }
}