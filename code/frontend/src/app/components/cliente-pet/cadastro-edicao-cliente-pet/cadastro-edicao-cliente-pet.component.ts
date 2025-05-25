import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
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
import { NgxMaskDirective } from 'ngx-mask';
import { map, Observable, startWith, take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../../common/components/title-page/title-page.component';
import { CepService, CepVO } from '../../../common/services/cep.service';
import { DialogService } from '../../../common/services/dialog.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ClienteCadastroDTO } from '../../../models/dto/ClienteCadastroDTO';
import { ClienteEdicaoDTO } from '../../../models/dto/ClienteEdicaoDTO';
import { PetCadastroDTO } from '../../../models/dto/PetCadastroDTO';
import { PetEdicaoDTO } from '../../../models/dto/PetEdicaoDTO';
import { IdDescricao } from '../../../models/interface/IdDescricao';
import { ClienteVO } from '../../../models/vo/ClienteVO';
import { PetVO } from '../../../models/vo/PetVO';
import { RacaPetVO } from '../../../models/vo/RacaPetVO';
import { ClientePetService } from '../cliente-pet.service';

@Component({
  selector: 'app-cadastro-edicao-cliente-pet',
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
    NgxMaskDirective,
    MatDividerModule,
    MatExpansionModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cadastro-edicao-cliente-pet.component.html',
  styleUrl: './cadastro-edicao-cliente-pet.component.scss',
})
export class CadastroEdicaoClientePetComponent {
  private readonly idCliente: number;
  private readonly currentPageIsCadastro: boolean = false;
  private readonly currentPageIsEdicao: boolean = false;

  protected titlePage!: string;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected clienteForm!: FormGroup;
  protected petForm!: FormGroup;
  protected enderecoSemNumero: boolean = false;

  protected tipoPetList: Array<IdDescricao> = [];
  protected racaPetOriginalList: Array<RacaPetVO> = [];
  protected racaPetList: Array<RacaPetVO> = [];
  protected portePetList: Array<IdDescricao> = [];

  // CONTROLE PARA AUTOCOMPLETE
  protected racaPetFiltroControlList: Array<FormControl> = [];

  // LISTA FILTRADA
  protected racaPetListFiltradoList$: Array<Observable<IdDescricao[]>> = [];

  get enderecoForm() {
    return this.clienteForm.get('endereco') as FormGroup;
  }

  get petFormArray(): FormArray {
    return this.petForm.get('pets') as FormArray;
  }

  get petFormGroupList(): FormGroup[] {
    return this.petFormArray.controls as FormGroup[];
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly route: ActivatedRoute,
    private readonly clientePetService: ClientePetService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly snackbarService: SnackbarService,
    private readonly cepService: CepService
  ) {
    this.idCliente = this.route?.snapshot?.params['id'];

    const currentPage: string = window.location.pathname
      .split('/')[2]
      .toUpperCase();

    if (currentPage === 'CADASTRO') {
      this.currentPageIsCadastro = true;
      this.titlePage = 'Cadastro - Cliente & Pets';
    } else if (currentPage === 'EDICAO') {
      this.currentPageIsEdicao = true;
      this.titlePage = 'Edição - Cliente & Pets';
    }

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'cliente',
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
    this.buscarTipoPetList();
    this.buscarRacaPetList();
    this.buscarPortePetList();
    this.initForm();

    if (this.currentPageIsEdicao) {
      this.buscarDadosCliente();
    }
  }

  private buscarTipoPetList() {
    this.clientePetService
      .buscarTipoPetList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.tipoPetList = rs.objeto;
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private buscarRacaPetList() {
    this.clientePetService
      .buscarRacaPetList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.racaPetOriginalList = rs.objeto;
            this.racaPetList = rs.objeto;
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private buscarPortePetList() {
    this.clientePetService
      .buscarPortePetList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.portePetList = rs.objeto;
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private initForm(): void {
    this.clienteForm = this.formBuilder.group({
      id: new FormControl<number | null>(null),
      nome: new FormControl<string>('', [Validators.required]),
      cpf: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      email: new FormControl<string>(''),
      celular: new FormControl<string>('', [Validators.maxLength(13)]),
      dataNascimento: new FormControl<Date | null>(null),
      genero: new FormControl<string>(''),
      endereco: this.formBuilder.group({
        id: new FormControl<number | null>(null),
        cep: new FormControl<string>('', [
          Validators.required,
          Validators.maxLength(8),
        ]),
        logradouro: new FormControl<string>({ value: '', disabled: true }, [
          Validators.required,
        ]),
        numero: new FormControl<string | null>({ value: '', disabled: true }),
        semNumero: new FormControl<boolean>({
          value: this.enderecoSemNumero,
          disabled: true,
        }),
        bairro: new FormControl<string>({ value: '', disabled: true }, [
          Validators.required,
        ]),
        complemento: new FormControl<string>({ value: '', disabled: true }),
        cidade: new FormControl<string>({ value: '', disabled: true }, [
          Validators.required,
        ]),
        uf: new FormControl<string>({ value: '', disabled: true }, [
          Validators.required,
          Validators.maxLength(2),
        ]),
      }),
    });

    this.petForm = this.formBuilder.group({
      pets: new FormArray([]),
    });

    this.adicionarPet(null);
  }

  protected verificarClienteCadastrado() {
    const cpf: string = this.clienteForm.get('cpf')?.value;

    this.clientePetService
      .buscarPorCpf(cpf)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const cliente: ClienteVO = rs.objeto;

            const dialog = this.dialogService.openDialogSimple({
              title: 'Atenção!',
              message:
                'Este cliente já está cadastrado. Deseja editar os dados?',
              labelButton2: 'Não',
              labelButton1: 'Sim',
            });

            dialog.afterClosed().subscribe((rs) => {
              if (rs) {
                this.router.navigateByUrl(`cliente/edicao/${cliente.id}`);
              } else {
                this.router.navigateByUrl(`cliente`);
              }
            });
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem != 404) {
            this.snackbarService.openSnackBar(err.error.mensagem);
          }
        },
      });
  }

  protected async consultarCep() {
    const cep: string = this.enderecoForm.get('cep')?.value;
    const dados: CepVO | null = await this.cepService.consultarCEP(cep);
    this.preencherDadosEndereco(dados);
  }

  private preencherDadosEndereco(dados: CepVO | null) {
    if (dados != null) {
      this.enderecoForm.patchValue({
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf,
        complemento: dados.complemento,
      });
    }

    this.habilitarCamposEndereco();
  }

  private habilitarCamposEndereco() {
    const controls = this.enderecoForm.controls;

    for (const key in controls) {
      const control: AbstractControl = controls[key];

      if (
        control.value === '' ||
        control.value === null ||
        control.value === false
      ) {
        control.enable();
      }
    }
  }

  protected checkSemNumero() {
    this.enderecoForm.get('semNumero')?.setValue(!this.enderecoSemNumero);

    this.enderecoSemNumero = this.enderecoForm.get('semNumero')?.value;

    this.enderecoSemNumero
      ? this.enderecoForm.get('numero')?.disable()
      : this.enderecoForm.get('numero')?.enable();

    if (
      this.enderecoSemNumero &&
      (this.enderecoForm.get('numero')?.value !== '' ||
        this.enderecoForm.get('numero')?.value !== null)
    ) {
      this.enderecoForm.get('numero')?.reset();
    }
  }

  protected tipoPetSelecionado(petFormGroup: FormGroup, index: number): void {
    // Resetar a lista de raça
    this.racaPetList = this.racaPetOriginalList;

    const idTipoPetSelecionado: number = petFormGroup.get('idTipo')?.value;

    if (idTipoPetSelecionado !== null) {
      this.racaPetList = this.racaPetList.filter(
        (racaPet) => racaPet.tipoPet.id === idTipoPetSelecionado
      );

      this.racaPetFiltroControlList[index].enable();
    }
  }

  protected racaPetSelecionado(
    raca: RacaPetVO,
    petFormGroup: FormGroup,
    index: number
  ): void {
    if (raca) {
      const idTipoSelecionado: number = petFormGroup.get('idTipo')?.value;
      if (idTipoSelecionado) {
        if (raca.tipoPet.id === idTipoSelecionado) {
          petFormGroup.get('idRaca')?.setValue(raca.id);
        } else {
          this.snackbarService.openSnackBar(
            'A raça selecionada não corresponde ao tipo de Pet escolhido.'
          );
          this.racaPetFiltroControlList[index].reset();
        }
      } else {
        this.snackbarService.openSnackBar('Selecione o tipo do Pet primeiro.');
      }
    }
  }

  protected adicionarPet(pet: PetVO | null) {
    if (pet === null) {
      this.petFormArray.push(
        this.formBuilder.group({
          id: new FormControl<number | null>(null),
          nome: new FormControl<string | null>(null),
          idTipo: new FormControl<number | null>(null),
          idRaca: new FormControl<number | null>({
            value: null,
            disabled: true,
          }),
          idPorte: new FormControl<number | null>(null),
          dataNascimento: new FormControl<Date | null>(null),
          peso: new FormControl<number | null>(null),
        })
      );
    } else {
      let dataNascimento = null;
      if (pet.dataNascimento !== null && pet.dataNascimento !== undefined) {
        const [ano, mes, dia] = pet?.dataNascimento.split('-').map(Number);
        dataNascimento = new Date(ano, mes - 1, dia);
      }

      const petFormGroup: FormGroup = this.formBuilder.group({
        id: new FormControl<number | null>(pet?.id),
        nome: new FormControl<string | null>(pet?.nome),
        idTipo: new FormControl<number | null>(pet?.tipo?.id),
        idRaca: new FormControl<number | null>(pet?.raca?.id),
        idPorte: new FormControl<number | null>(pet?.porte?.id),
        dataNascimento: new FormControl<Date | null>(dataNascimento),
        peso: new FormControl<number | null>(pet?.peso),
      });
      this.petFormArray.push(petFormGroup);
    }

    // CRIAR UM FILTRO PARA CADA PET
    const index = this.petFormArray.length - 1;

    const racaPetFiltroControl = new FormControl(
      {
        value: this.currentPageIsCadastro || pet === null ? '' : pet?.raca,
        disabled: true,
      },
      [Validators.required]
    );
    this.racaPetFiltroControlList.push(racaPetFiltroControl);

    this.racaPetListFiltradoList$.push(
      racaPetFiltroControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterRacaPet(value || '', index))
      )
    );
  }

  protected removerPet(index: number) {
    const dialog = this.dialogService.openDialogSimple({
      title: 'Atenção!',
      message: 'Tem certeza que deseja excluir este pet?',
      labelButton2: 'Não',
      labelButton1: 'Sim',
    });

    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.petFormArray.removeAt(index);
        this.racaPetFiltroControlList.splice(index, 1);
        this.racaPetListFiltradoList$.splice(index, 1);
      }
    });
  }

  private buscarDadosCliente() {
    this.clientePetService
      .buscarPorId(this.idCliente)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const cliente: ClienteVO = rs.objeto;
            this.preencherCamposClienteEdicao(cliente);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCamposClienteEdicao(cliente: ClienteVO) {
    let dataNascimento = null;
    if (
      cliente.dataNascimento !== null &&
      cliente.dataNascimento !== undefined
    ) {
      const [ano, mes, dia] = cliente?.dataNascimento.split('-').map(Number);
      dataNascimento = new Date(ano, mes - 1, dia);
    }

    this.clienteForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      celular: cliente.celular,
      dataNascimento: dataNascimento,
      genero: cliente.genero,
      endereco: {
        id: cliente.endereco.id,
        cep: cliente.endereco.cep,
        logradouro: cliente.endereco.logradouro,
        numero: cliente.endereco.numero,
        semNumero: cliente.endereco.semNumero,
        complemento: cliente.endereco.complemento,
        bairro: cliente.endereco.bairro,
        cidade: cliente.endereco.cidade,
        uf: cliente.endereco.uf,
      },
    });

    this.enderecoSemNumero = this.enderecoForm.get('semNumero')?.value;
    this.enderecoSemNumero
      ? this.enderecoForm.get('numero')?.disable()
      : this.enderecoForm.get('numero')?.enable();

    this.preencherCamposPetEdicao(cliente);
  }

  private preencherCamposPetEdicao(cliente: ClienteVO) {
    this.petFormArray.clear();
    this.racaPetFiltroControlList = [];

    const petList: Array<PetVO> = cliente.pets;

    petList.forEach((pet: PetVO) => {
      this.adicionarPet(pet);
    });
  }

  protected salvar() {
    if (this.clienteForm.valid && this.petForm.valid) {
      if (this.currentPageIsCadastro) {
        const dialog = this.dialogService.openDialogSimple({
          title: 'Atenção!',
          message: 'Tem certeza que deseja salvar este cadastro?',
          labelButton2: 'Não',
          labelButton1: 'Sim',
        });

        dialog.afterClosed().subscribe((rs) => {
          if (rs) {
            this.clientePetService
              .salvar(this.getClienteCadastroDTO())
              .subscribe({
                next: (rs: any) => {
                  if (rs.codigoMensagem === 200) {
                    this.openModalCadastroEdicaoSucesso();
                  }
                },
                error: (err: any) => {
                  this.snackbarService.openSnackBar(err.error.mensagem);
                },
              });
          }
        });
      } else if (this.currentPageIsEdicao) {
        const dialog = this.dialogService.openDialogSimple({
          title: 'Atenção!',
          message: 'Tem certeza que deseja atualizar os dados?',
          labelButton2: 'Não',
          labelButton1: 'Sim',
        });

        dialog.afterClosed().subscribe((rs) => {
          if (rs) {
            this.clientePetService
              .atualizar(this.getClienteEdicaoDTO())
              .subscribe({
                next: (rs: any) => {
                  if (rs.codigoMensagem === 200) {
                    this.openModalCadastroEdicaoSucesso();
                  }
                },
                error: (err: any) => {
                  this.snackbarService.openSnackBar(err.error.mensagem);
                },
              });
          }
        });
      }
    } else {
      this.clienteForm.markAllAsTouched();
      this.petForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Verique todos os campos antes de salvar.'
      );
    }
  }

  private getClienteCadastroDTO(): ClienteCadastroDTO {
    return {
      nome: this.clienteForm.get('nome')?.value,
      cpf: this.clienteForm.get('cpf')?.value,
      email: this.clienteForm.get('email')?.value,
      celular: this.clienteForm.get('celular')?.value,
      dataNascimento: this.clienteForm.get('dataNascimento')?.value,
      genero: this.clienteForm.get('genero')?.value,
      endereco: {
        cep: this.enderecoForm.get('cep')?.value,
        logradouro: this.enderecoForm.get('logradouro')?.value,
        numero: this.enderecoForm.get('numero')?.value,
        semNumero: this.enderecoForm.get('semNumero')?.value,
        bairro: this.enderecoForm.get('bairro')?.value,
        cidade: this.enderecoForm.get('cidade')?.value,
        complemento: this.enderecoForm.get('complemento')?.value,
        uf: this.enderecoForm.get('uf')?.value,
      },
      pets: this.getPetCadastroDTOList(),
    };
  }

  private getPetCadastroDTOList(): Array<PetCadastroDTO> {
    let petCadastroDTOList: Array<PetCadastroDTO> = [];

    if (
      this.petFormGroupList.length >= 1 &&
      this.petFormGroupList[0].get('nome')?.value !== null
    ) {
      this.petFormGroupList.forEach((petFormGroup) => {
        const petCadastroDTO: PetCadastroDTO = {
          nome: petFormGroup.get('nome')?.value,
          idTipo: petFormGroup.get('idTipo')?.value,
          idRaca: petFormGroup.get('idRaca')?.value,
          idPorte: petFormGroup.get('idPorte')?.value,
          dataNascimento: petFormGroup.get('dataNascimento')?.value,
          peso: petFormGroup.get('peso')?.value,
        };

        petCadastroDTOList.push(petCadastroDTO);
      });
    }

    return petCadastroDTOList;
  }

  private getClienteEdicaoDTO(): ClienteEdicaoDTO {
    return {
      id: this.clienteForm.get('id')?.value,
      nome: this.clienteForm.get('nome')?.value,
      cpf: this.clienteForm.get('cpf')?.value,
      email: this.clienteForm.get('email')?.value,
      celular: this.clienteForm.get('celular')?.value,
      dataNascimento: this.clienteForm.get('dataNascimento')?.value,
      genero: this.clienteForm.get('genero')?.value,
      endereco: {
        id: this.enderecoForm.get('id')?.value,
        cep: this.enderecoForm.get('cep')?.value,
        logradouro: this.enderecoForm.get('logradouro')?.value,
        numero: this.enderecoForm.get('numero')?.value,
        semNumero: this.enderecoForm.get('semNumero')?.value,
        bairro: this.enderecoForm.get('bairro')?.value,
        cidade: this.enderecoForm.get('cidade')?.value,
        complemento: this.enderecoForm.get('complemento')?.value,
        uf: this.enderecoForm.get('uf')?.value,
      },
      petsAtualizados: this.getPetEdicaoDTOList(),
    };
  }

  private getPetEdicaoDTOList(): Array<PetEdicaoDTO> {
    let petEdicaoDTOList: Array<PetEdicaoDTO> = [];

    if (
      this.petFormGroupList.length >= 1 &&
      this.petFormGroupList[0].get('nome')?.value !== null
    ) {
      this.petFormGroupList.forEach((petFormGroup) => {
        const petEdicaoDTO: PetEdicaoDTO = {
          id: petFormGroup.get('id')?.value,
          nome: petFormGroup.get('nome')?.value,
          idTipo: petFormGroup.get('idTipo')?.value,
          idRaca: petFormGroup.get('idRaca')?.value,
          idPorte: petFormGroup.get('idPorte')?.value,
          dataNascimento: petFormGroup.get('dataNascimento')?.value,
          peso: petFormGroup.get('peso')?.value,
        };

        petEdicaoDTOList.push(petEdicaoDTO);
      });
    }

    return petEdicaoDTOList;
  }

  private openModalCadastroEdicaoSucesso() {
    let message: string = '';

    if (this.currentPageIsCadastro) {
      message = 'Cadastro do cliente realizado.';
    } else if (this.currentPageIsEdicao) {
      message = 'Edição dos dados do cliente realizada.';
    }

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.router.navigateByUrl('cliente');
      }
    });
  }

  private _filterRacaPet(value: any, index: number): IdDescricao[] {
    let filterValue: string = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object' && value?.descricao) {
      filterValue = value.descricao.toLowerCase();
    }

    return this.racaPetList.filter((raca) =>
      raca.descricao.toLowerCase().includes(filterValue)
    );
  }

  displayRacaPetFn(raca: IdDescricao): string {
    return raca && raca.descricao ? raca.descricao : '';
  }
}
