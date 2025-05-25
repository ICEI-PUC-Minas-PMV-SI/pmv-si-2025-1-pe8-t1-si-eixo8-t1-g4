import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../../common/components/title-page/title-page.component';
import { DialogService } from '../../../common/services/dialog.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { VacinacaoCadastroDTO } from '../../../models/dto/VacinacaoCadastroDTO';
import { IdDescricao } from '../../../models/interface/IdDescricao';
import { ClienteVO } from '../../../models/vo/ClienteVO';
import { VacinacaoVO } from '../../../models/vo/VacinacaoVO';
import { ClientePetService } from '../../cliente-pet/cliente-pet.service';
import { ControleVacinacaoService } from '../controle-vacinacao.service';

@Component({
  selector: 'app-cadastro-edicao-controle-vacinacao',
  imports: [
    NgFor,
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cadastro-edicao-controle-vacinacao.component.html',
  styleUrl: './cadastro-edicao-controle-vacinacao.component.scss',
})
export class CadastroEdicaoControleVacinacaoComponent {
  private readonly idPet: number;
  private readonly currentPageIsCadastro: boolean = false;
  private readonly currentPageIsEdicao: boolean = false;

  protected titlePage!: string;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected vacinacaoForm!: FormGroup;

  protected clienteList: Array<IdDescricao> = [];
  protected petList: Array<IdDescricao> = [];

  // CONTROLES PARA AUTOCOMPLETE
  protected clienteFiltroControl = new FormControl<any>('');
  protected petFiltroControl = new FormControl<any>({
    value: '',
    disabled: true,
  });

  // LISTAS FILTRADAS
  protected clienteListFiltrado$!: Observable<IdDescricao[]>;
  protected petListFiltrado$!: Observable<IdDescricao[]>;

  get vacinaFormArray(): FormArray {
    return this.vacinacaoForm.get('vacinas') as FormArray;
  }

  get vacinaFormGroupList(): FormGroup[] {
    return this.vacinaFormArray.controls as FormGroup[];
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly route: ActivatedRoute,
    private readonly controleVacinacaoService: ControleVacinacaoService,
    private readonly clientePetService: ClientePetService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly snackbarService: SnackbarService
  ) {
    this.idPet = this.route?.snapshot?.params['id'];

    const currentPage: string = window.location.pathname
      .split('/')[2]
      .toUpperCase();

    if (currentPage === 'CADASTRO') {
      this.currentPageIsCadastro = true;
      this.titlePage = 'Cadastro - Vacinação';
    } else if (currentPage === 'EDICAO') {
      this.currentPageIsEdicao = true;
      this.titlePage = 'Edição - Vacinação';
    }

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'vacinacao',
      },
      {
        name: 'Salvar',
        action: ButtonAction.SAVE,
        primary: true,
        disabled: false,
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();

    // Cliente - Filtragem
    this.clienteListFiltrado$ = this.clienteFiltroControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCliente(value || ''))
    );

    // Pet - Filtragem
    this.petListFiltrado$ = this.petFiltroControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPet(value || ''))
    );

    this.buscarClienteList();

    if (this.currentPageIsEdicao) {
      this.buscarDadosVacinacao();
      this.buscarClientePorIdPet();
    }
  }

  private initForm(): void {
    this.vacinacaoForm = this.formBuilder.group({
      idCliente: new FormControl<number | null>(null, [Validators.required]),
      idPet: new FormControl<number | null>({ value: null, disabled: true }, [
        Validators.required,
      ]),
      vacinas: new FormArray([]),
    });

    if (this.currentPageIsCadastro) this.adicionarVacina();
  }

  protected adicionarVacina() {
    this.vacinaFormArray.push(
      this.formBuilder.group({
        id: new FormControl<number | null>(null),
        nome: new FormControl<string | null>(null, [Validators.required]),
        dataAplicacao: new FormControl<Date | null>(null, [
          Validators.required,
        ]),
        dataProximaDose: new FormControl<Date | null>(null),
        observacoes: new FormControl<string | null>(null),
      })
    );
  }

  private buscarClienteList() {
    this.clientePetService
      .buscarClienteList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.clienteList = rs.objeto;
            this.clienteFiltroControl.setValue('');
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private buscarPetClienteList(idCliente: number) {
    this.clientePetService
      .buscarClientePetsList(idCliente)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.petList = rs.objeto;

            if (this.currentPageIsEdicao) {
              if (this.currentPageIsEdicao) {
                const petIdDescricao: IdDescricao = this.petList.find(
                  (p) => p.id === this.vacinacaoForm.get('idPet')?.value
                ) as IdDescricao;
                this.petFiltroControl.setValue(petIdDescricao);
                this.petFiltroControl.disable();
              }
            } else {
              this.petFiltroControl.enable();
              this.petFiltroControl.setValue('');
            }
          }
        },
        error: (err: any) => {
          this.petList = [];
          this.petFiltroControl.reset();
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  protected clienteSelecionado(cliente: IdDescricao): void {
    if (cliente) {
      this.vacinacaoForm.get('idCliente')?.setValue(cliente.id);
      this.buscarPetClienteList(cliente.id);
    }
  }

  protected petSelecionado(pet: IdDescricao): void {
    if (pet) {
      this.vacinacaoForm.get('idPet')?.setValue(pet.id);
    }
  }

  private buscarDadosVacinacao() {
    this.controleVacinacaoService
      .buscarPorIdPet(this.idPet)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const vacinacaoList: Array<VacinacaoVO> = rs.objeto;
            this.preencherCampos(vacinacaoList);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCampos(vacinacaoList: Array<VacinacaoVO>) {
    if (vacinacaoList.length > 0) {
      this.vacinacaoForm.patchValue({
        idPet: vacinacaoList[0].pet.id,
      });

      this.petFiltroControl.setValue(vacinacaoList[0].pet.nome);

      vacinacaoList.forEach((vacinacao: VacinacaoVO) => {
        let dataAplicacao = null;
        if (
          vacinacao.dataAplicacao !== null &&
          vacinacao.dataAplicacao !== undefined
        ) {
          const [ano, mes, dia] = vacinacao?.dataAplicacao
            .split('-')
            .map(Number);
          dataAplicacao = new Date(ano, mes - 1, dia);
        }

        let dataProximaDose = null;
        if (
          vacinacao.dataProximaDose !== null &&
          vacinacao.dataProximaDose !== undefined
        ) {
          const [ano, mes, dia] = vacinacao?.dataProximaDose
            .split('-')
            .map(Number);
          dataProximaDose = new Date(ano, mes - 1, dia);
        }

        const vacinaFormGroup: FormGroup = this.formBuilder.group({
          id: new FormControl<number | null>({
            value: vacinacao?.id,
            disabled: true,
          }),
          nome: new FormControl<string | null>({
            value: vacinacao?.nomeVacina,
            disabled: true,
          }),
          dataAplicacao: new FormControl<Date | null>({
            value: dataAplicacao,
            disabled: true,
          }),
          dataProximaDose: new FormControl<Date | null>({
            value: dataProximaDose,
            disabled: true,
          }),
          observacoes: new FormControl<string | null>({
            value: vacinacao?.observacoes,
            disabled: true,
          }),
        });
        this.vacinaFormArray.push(vacinaFormGroup);
      });
    }
  }

  private buscarClientePorIdPet() {
    this.clientePetService
      .buscarClientePorIdPet(this.idPet)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const cliente: ClienteVO = rs.objeto;
            this.vacinacaoForm.get('cliente')?.setValue(cliente?.nome);

            const clienteIdDescricao: IdDescricao = this.clienteList.find(
              (c) => c.id === cliente.id
            ) as IdDescricao;
            this.clienteFiltroControl.setValue(clienteIdDescricao);
            this.clienteFiltroControl.disable();
            this.clienteSelecionado(clienteIdDescricao);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  protected excluirVacina(index: number) {
    const dialog = this.dialogService.openDialogSimple({
      title: 'Atenção!',
      message: 'Tem certeza que deseja excluir este pet?',
      labelButton2: 'Não',
      labelButton1: 'Sim',
    });

    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        const idVacinacao: number =
          this.vacinaFormGroupList[index].get('id')?.value;
        this.controleVacinacaoService
          .excluir(idVacinacao)
          .pipe(take(1))
          .subscribe({
            next: (rs: any) => {
              if (rs.codigoMensagem === 200) {
                this.vacinaFormArray.removeAt(index);
              }
            },
            error: (err: any) => {},
          });
      }
    });
  }

  protected salvar() {
    if (this.vacinacaoForm.valid) {
      const dialog = this.dialogService.openDialogSimple({
        title: 'Atenção!',
        message: 'Tem certeza que deseja salvar este cadastro?',
        labelButton2: 'Não',
        labelButton1: 'Sim',
      });

      dialog.afterClosed().subscribe((rs) => {
        if (rs) {
          this.controleVacinacaoService
            .salvar(this.getListVacinacaoCadastroDTO())
            .subscribe({
              next: (rs: any) => {
                if (rs.codigoMensagem === 200) {
                  this.openModalCadastroSucesso();
                }
              },
              error: (err: any) => {
                this.snackbarService.openSnackBar(err.error.mensagem);
              },
            });
        }
      });
    } else {
      this.vacinacaoForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Verique todos os campos antes de salvar.'
      );
    }
  }

  private getListVacinacaoCadastroDTO(): Array<VacinacaoCadastroDTO> {
    let listVacinacaoCadastroDTO: Array<VacinacaoCadastroDTO> = [];

    this.vacinaFormGroupList.forEach((vacinaFormGroup: FormGroup) => {
      listVacinacaoCadastroDTO.push({
        idVacinacao: vacinaFormGroup.get('id')?.value,
        idPet: this.vacinacaoForm.get('idPet')?.value,
        nomeVacina: vacinaFormGroup.get('nome')?.value,
        dataAplicacao: vacinaFormGroup.get('dataAplicacao')?.value,
        dataProximaDose: vacinaFormGroup.get('dataProximaDose')?.value,
        observacoes: vacinaFormGroup.get('observacoes')?.value,
      });
    });

    return listVacinacaoCadastroDTO;
  }

  private openModalCadastroSucesso() {
    let message: string = 'Cadastro de vacinação realizado.';

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.router.navigateByUrl('vacinacao');
      }
    });
  }

  private _filterCliente(value: any): IdDescricao[] {
    let filterValue: string = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object' && value?.descricao) {
      filterValue = value.descricao.toLowerCase();
    }

    return this.clienteList.filter((cliente) =>
      cliente.descricao.toLowerCase().includes(filterValue)
    );
  }

  private _filterPet(value: any): IdDescricao[] {
    let filterValue: string = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object' && value?.descricao) {
      filterValue = value.descricao.toLowerCase();
    }

    return this.petList.filter((pet) =>
      pet.descricao.toLowerCase().includes(filterValue)
    );
  }

  displayClienteFn(cliente: IdDescricao): string {
    return cliente && cliente.descricao ? cliente.descricao : '';
  }

  displayPetFn(pet: IdDescricao): string {
    return pet && pet.descricao ? pet.descricao : '';
  }
}
