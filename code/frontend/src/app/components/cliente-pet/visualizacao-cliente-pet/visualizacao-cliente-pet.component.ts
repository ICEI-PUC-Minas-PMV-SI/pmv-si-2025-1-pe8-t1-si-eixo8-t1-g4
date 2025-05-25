import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../../common/components/title-page/title-page.component';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ClienteVO } from '../../../models/vo/ClienteVO';
import { PetVO } from '../../../models/vo/PetVO';
import { ClientePetService } from '../cliente-pet.service';

@Component({
  selector: 'app-visualizacao-cliente-pet',
  imports: [
    NgFor,
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMaskDirective,
    MatExpansionModule,
  ],
  templateUrl: './visualizacao-cliente-pet.component.html',
  styleUrl: './visualizacao-cliente-pet.component.scss',
})
export class VisualizacaoClientePetComponent {
  private readonly idCliente: number;

  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected clienteForm!: FormGroup;
  protected petForm!: FormGroup;

  protected enderecoSemNumero: boolean = false;
  protected petIsNotRegistred: boolean = false;

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
    private readonly snackbarService: SnackbarService
  ) {
    this.idCliente = this.route?.snapshot?.params['id'];

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'cliente',
      },
      {
        name: 'Editar',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: `cliente/edicao/${this.idCliente}`,
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarDadosCliente();
  }

  private initForm(): void {
    this.clienteForm = this.formBuilder.group({
      id: new FormControl<number | null>(null),
      nome: new FormControl<string>({ value: '', disabled: true }),
      cpf: new FormControl<string>({ value: '', disabled: true }),
      email: new FormControl<string>({ value: '', disabled: true }),
      celular: new FormControl<string>({ value: '', disabled: true }),
      dataNascimento: new FormControl<Date | null>({
        value: null,
        disabled: true,
      }),
      genero: new FormControl<string>({ value: '', disabled: true }),
      endereco: this.formBuilder.group({
        id: new FormControl<number | null>({ value: null, disabled: true }),
        cep: new FormControl<string>({ value: '', disabled: true }),
        logradouro: new FormControl<string>({ value: '', disabled: true }),
        numero: new FormControl<string | null>({ value: null, disabled: true }),
        semNumero: new FormControl<boolean>({
          value: this.enderecoSemNumero,
          disabled: true,
        }),
        bairro: new FormControl<string>({ value: '', disabled: true }),
        complemento: new FormControl<string>({ value: '', disabled: true }),
        cidade: new FormControl<string>({ value: '', disabled: true }),
        uf: new FormControl<string>({ value: '', disabled: true }),
      }),
    });

    this.petForm = this.formBuilder.group({
      pets: new FormArray([]),
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
            this.preencherCampos(cliente);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCampos(cliente: ClienteVO) {
    let dataNascimento = null;
    if (
      cliente.dataNascimento !== null &&
      cliente.dataNascimento !== undefined
    ) {
      const [ano, mes, dia] = cliente?.dataNascimento.split('-').map(Number);
      dataNascimento = new Date(ano, mes - 1, dia).toLocaleDateString('pt-br');
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

    const petList: Array<PetVO> = cliente.pets;

    if (petList.length > 0) {
      petList.forEach((pet: PetVO) => {
        this.adicionarPet(pet);
      });
    } else {
      this.petIsNotRegistred = true;
    }

    this.enderecoSemNumero = this.enderecoForm.get('semNumero')?.value;
  }

  private adicionarPet(pet: PetVO) {
    let dataNascimento = null;
    if (pet.dataNascimento !== null && pet.dataNascimento !== undefined) {
      const [ano, mes, dia] = pet?.dataNascimento.split('-').map(Number);
      dataNascimento = new Date(ano, mes - 1, dia).toLocaleDateString('pt-br');
    }

    const petFormGroup: FormGroup = this.formBuilder.group({
      id: new FormControl<number | null>({ value: pet?.id, disabled: true }),
      nome: new FormControl<string>({ value: pet?.nome, disabled: true }),
      tipo: new FormControl<string | null>({
        value: pet?.tipo?.descricao,
        disabled: true,
      }),
      raca: new FormControl<string | null>({
        value: pet?.raca?.descricao,
        disabled: true,
      }),
      porte: new FormControl<string | null>({
        value: pet?.porte?.descricao,
        disabled: true,
      }),
      dataNascimento: new FormControl<string | null>({
        value: dataNascimento,
        disabled: true,
      }),
      idade: new FormControl<string | null>({
        value: this.clientePetService.calcularIdadePet(pet),
        disabled: true,
      }),
      peso: new FormControl<number | null>({
        value: pet?.peso,
        disabled: true,
      }),
    });
    this.petFormArray.push(petFormGroup);
  }
}
