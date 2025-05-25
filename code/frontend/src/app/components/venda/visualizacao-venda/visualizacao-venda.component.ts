import { NgFor } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
import { ItemVendaVO } from '../../../models/vo/ItemVendaVO';
import { RegistroVendaVO } from '../../../models/vo/RegistroVendaVO';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-visualizacao-venda',
  imports: [
    NgFor,
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskDirective,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './visualizacao-venda.component.html',
  styleUrl: './visualizacao-venda.component.scss',
})
export class VisualizacaoVendaComponent {
  private readonly idRegistroVenda: number;

  protected titlePage!: string;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected registroVendaForm!: FormGroup;

  get itemVendaFormArray(): FormArray {
    return this.registroVendaForm.get('itensVenda') as FormArray;
  }

  get itemVendaFormGroupList(): FormGroup[] {
    return this.itemVendaFormArray.controls as FormGroup[];
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly route: ActivatedRoute,
    private readonly vendaService: VendaService,
    private readonly snackbarService: SnackbarService
  ) {
    this.idRegistroVenda = this.route?.snapshot?.params['id'];

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'venda',
      },
      {
        name: 'Editar',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: `venda/edicao/${this.idRegistroVenda}`,
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarDadosRegistroVenda();
  }

  private initForm(): void {
    this.registroVendaForm = this.formBuilder.group({
      id: new FormControl<number | null>({ value: null, disabled: true }),
      cliente: new FormControl<number | null>({ value: null, disabled: true }),
      valorTotal: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      itensVenda: new FormArray([]),
      metodoPagamento: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      parcelasPagamento: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
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
      cliente: registroVenda.cliente.nome,
      valorTotal: registroVenda.valorTotal,
      metodoPagamento: registroVenda.pagamento.metodoPagamento.descricao,
      parcelasPagamento: registroVenda.pagamento.parcelas,
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
        medidaProduto: new FormControl<string | null>(
          {
            value: `${itemVenda.produto.quantidadePorMedida} ${itemVenda.produto.unidadeMedida.sigla}`,
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
        precoUnitario: new FormControl<number | null>(
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
      });
      this.itemVendaFormArray.push(itemVendaFormGroup);
    }
  }
}
