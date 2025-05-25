import { Component, inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../common/components/title-page/title-page.component';
import { MaskPipe } from '../../common/pipes/mask.pipe';
import { DialogService } from '../../common/services/dialog.service';
import { UtilService } from '../../common/services/util.service';
import { ClientePesquisaDTO } from '../../models/dto/ClientePesquisaDTO';
import { ClientePetService } from './cliente-pet.service';
import { DialogVisualizacaoClientePetComponent } from './dialog-visualizacao-cliente-pet/dialog-visualizacao-cliente-pet.component';

@Component({
  selector: 'app-cliente-pet',
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
    MaskPipe,
    MatTooltipModule,
  ],
  templateUrl: './cliente-pet.component.html',
  styleUrl: './cliente-pet.component.scss',
})
export class ClientePetComponent {
  readonly utilService = inject(UtilService);

  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected pesquisaForm!: FormGroup;

  displayedColumns: string[] = ['nome', 'cpf', 'email', 'celular', 'acoes'];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;
  pageSize: number = 10;
  page: number = 0;

  constructor(
    private readonly clientePetService: ClientePetService,
    private readonly dialogService: DialogService,
    private readonly formBuilder: FormBuilder
  ) {
    this.buttonsTitlePage = [
      {
        name: 'Novo Cadastro',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: 'cliente/cadastro',
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.pesquisarClientes();
  }

  private initForm(): void {
    this.pesquisaForm = this.formBuilder.group({
      nome: new FormControl<string | null>(null),
      cpf: new FormControl<string | null>(null),
      genero: new FormControl<string | null>(null),
    });
  }

  protected pesquisarClientes() {
    const dto: ClientePesquisaDTO = {
      nome: this.pesquisaForm.get('nome')?.value,
      cpf: this.pesquisaForm.get('cpf')?.value,
      genero: this.pesquisaForm.get('genero')?.value,
      page: this.page,
      pageSize: this.pageSize,
      orderingField: 'nome',
      orderingDirection: 'asc',
    };

    this.clientePetService
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
    this.pesquisarClientes();
  }

  protected openModalVisualizacaoClientePets(idCliente: number) {
    const dialogConfig: MatDialogConfig = {
      width: '90%',
      data: {
        idCliente: idCliente,
      },
    };
    this.dialogService.openDialogComponent(
      DialogVisualizacaoClientePetComponent,
      dialogConfig
    );
  }

  protected excluirCliente(id: number) {
    const dialog = this.dialogService.openDialogSimple({
      title: 'Atenção!',
      message: 'Tem certeza que deseja excluir este cliente?',
      labelButton2: 'Não',
      labelButton1: 'Sim',
    });

    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.clientePetService
          .excluir(id)
          .pipe(take(1))
          .subscribe({
            next: (rs: any) => {
              if (rs.codigoMensagem === 200) {
                const dialog = this.dialogService.openDialogSuccess(
                  'Exclusão do cliente realizada.'
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
    this.pesquisarClientes();
  }
}
