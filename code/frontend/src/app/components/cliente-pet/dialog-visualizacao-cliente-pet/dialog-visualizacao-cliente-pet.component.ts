import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ClienteVO } from '../../../models/vo/ClienteVO';
import { PetVO } from '../../../models/vo/PetVO';
import { ClientePetService } from '../cliente-pet.service';
import { NgxMaskDirective } from 'ngx-mask';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-visualizacao-cliente-pet',
  imports: [
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    NgxMaskDirective,
  ],
  templateUrl: './dialog-visualizacao-cliente-pet.component.html',
  styleUrl: './dialog-visualizacao-cliente-pet.component.scss',
})
export class DialogVisualizacaoClientePetComponent {
  protected idCliente: number;
  protected petForm!: FormGroup;

  protected petIsNotRegistred: boolean = false;

  get petFormArray(): FormArray {
    return this.petForm.get('pets') as FormArray;
  }

  get petFormGroupList(): FormGroup[] {
    return this.petFormArray.controls as FormGroup[];
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogVisualizacaoClientePetComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly clientePetService: ClientePetService,
    private readonly snackbarService: SnackbarService,
    protected utilService: UtilService
  ) {
    this.idCliente = this.data.idCliente;
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarDadosCliente();
  }

  private initForm(): void {
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
    const petList: Array<PetVO> = cliente.pets;

    if (petList.length > 0) {
      petList.forEach((pet: PetVO) => {
        this.adicionarPet(pet);
      });
    } else {
      this.petIsNotRegistred = true;
    }
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

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
