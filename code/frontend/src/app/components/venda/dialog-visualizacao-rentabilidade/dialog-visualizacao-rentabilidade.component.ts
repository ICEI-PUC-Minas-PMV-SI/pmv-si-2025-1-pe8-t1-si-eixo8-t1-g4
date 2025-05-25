import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { take } from 'rxjs';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ItemVendaVO } from '../../../models/vo/ItemVendaVO';
import { RegistroVendaVO } from '../../../models/vo/RegistroVendaVO';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-dialog-visualizacao-rentabilidade',
  imports: [
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './dialog-visualizacao-rentabilidade.component.html',
  styleUrl: './dialog-visualizacao-rentabilidade.component.scss',
})
export class DialogVisualizacaoRentabilidadeComponent {
  protected idRegistroVenda: number;
  protected registroVendaForm!: FormGroup;

  get itemVendaFormArray(): FormArray {
    return this.registroVendaForm.get('itensVenda') as FormArray;
  }

  get itemVendaFormGroupList(): FormGroup[] {
    return this.itemVendaFormArray.controls as FormGroup[];
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogVisualizacaoRentabilidadeComponent>,
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly vendaService: VendaService,
    private readonly snackbarService: SnackbarService
  ) {
    this.idRegistroVenda = this.data.idVenda;
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarDadosRegistroVenda();
  }

  private initForm(): void {
    this.registroVendaForm = this.formBuilder.group({
      id: new FormControl<number | null>({ value: null, disabled: true }),
      valorTotal: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      lucro: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      porcentagemLucro: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      itensVenda: new FormArray([]),
    });
  }

  private buscarDadosRegistroVenda() {
    this.vendaService
      .buscarPorId(this.idRegistroVenda)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const registroVenda: RegistroVendaVO = rs.objeto;
            this.preencherCampos(registroVenda);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCampos(registroVenda: RegistroVendaVO) {
    this.registroVendaForm.patchValue({
      id: registroVenda.id,
      valorTotal: registroVenda.valorTotal,
      lucro: registroVenda.lucro,
      porcentagemLucro: (
        (registroVenda.lucro / registroVenda.valorTotal) *
        100
      ).toFixed(2),
    });

    const itensVenda: Array<ItemVendaVO> = registroVenda.itens;
    itensVenda.forEach((item) => this.adicionarItemVenda(item));
  }

  protected adicionarItemVenda(itemVenda: ItemVendaVO | null) {
    if (itemVenda !== null) {
      const itemVendaFormGroup: FormGroup = this.formBuilder.group({
        produto: new FormControl<string | null>(
          {
            value: itemVenda.produto.nome,
            disabled: true,
          },

          [Validators.required]
        ),
        quantidadeVenda: new FormControl<number | null>(
          {
            value: itemVenda.quantidade,
            disabled: true,
          },
          [Validators.required]
        ),
        precoUnitarioVenda: new FormControl<number | null>(
          {
            value: itemVenda.precoUnitarioVenda,
            disabled: true,
          },
          [Validators.required]
        ),
        subtotal: new FormControl<number | null>(
          {
            value: itemVenda.subtotal,
            disabled: true,
          },
          [Validators.required]
        ),
        precoUnitarioCusto: new FormControl<number | null>(
          {
            value: itemVenda.precoUnitarioCusto,
            disabled: true,
          },
          [Validators.required]
        ),
        margemLucro: new FormControl<number | null>(
          {
            value: itemVenda.margemLucro,
            disabled: true,
          },
          [Validators.required]
        ),
        lucro: new FormControl<number | null>(
          {
            value: itemVenda.lucro,
            disabled: true,
          },
          [Validators.required]
        ),
      });
      this.itemVendaFormArray.push(itemVendaFormGroup);
    }
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
