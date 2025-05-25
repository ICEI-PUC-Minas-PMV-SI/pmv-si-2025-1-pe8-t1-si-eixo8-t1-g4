import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../../common/components/title-page/title-page.component';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ProdutoVO } from '../../../models/vo/ProdutoVO';
import { ProdutoEstoqueService } from '../produto-estoque.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-visualizacao-produto-estoque',
  imports: [
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatDividerModule,
  ],
  templateUrl: './visualizacao-produto-estoque.component.html',
  styleUrl: './visualizacao-produto-estoque.component.scss',
})
export class VisualizacaoProdutoEstoqueComponent {
  private readonly idProduto: number;

  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected produtoForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly route: ActivatedRoute,
    private readonly produtoEstoqueService: ProdutoEstoqueService,
    private readonly snackbarService: SnackbarService
  ) {
    this.idProduto = this.route?.snapshot?.params['id'];

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'produto',
      },
      {
        name: 'Editar',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: `produto/edicao/${this.idProduto}`,
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarDadosProduto();
  }

  private initForm(): void {
    this.produtoForm = this.formBuilder.group({
      id: new FormControl<number | null>({ value: null, disabled: true }),
      nome: new FormControl<string>({ value: '', disabled: true }),
      precoCusto: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      margemLucro: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      precoFinalVenda: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      categoria: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      quantidadeDisponivel: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      quantidadeMinima: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      unidadeMedida: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      quantidadePorMedida: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      medidaCompleta: new FormControl<string>({
        value: '',
        disabled: true,
      }),
      dataVencimento: new FormControl<Date | null>({
        value: null,
        disabled: true,
      }),
      codigoBarras: new FormControl<string>({ value: '', disabled: true }),
    });
  }

  private buscarDadosProduto() {
    this.produtoEstoqueService
      .buscarPorId(this.idProduto)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const produto: ProdutoVO = rs.objeto;
            this.preencherCampos(produto);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCampos(produto: ProdutoVO) {
    let dataVencimento = null;
    if (
      produto.dataVencimento !== null &&
      produto.dataVencimento !== undefined
    ) {
      const [ano, mes, dia] = produto.dataVencimento.split('-').map(Number);
      dataVencimento = new Date(ano, mes - 1, dia).toLocaleDateString('pt-br');
    }

    this.produtoForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      precoCusto: produto.precoCusto,
      margemLucro: produto.margemLucro,
      precoFinalVenda: produto.precoFinalVenda,
      categoria: produto.categoria.descricao,
      quantidadeDisponivel: produto.estoque.quantidadeDisponivel,
      quantidadeMinima: produto.estoque.quantidadeMinima,
      unidadeMedida: produto.unidadeMedida.sigla,
      quantidadePorMedida: produto.quantidadePorMedida,
      dataVencimento: dataVencimento,
      codigoBarras: produto.codigoBarras,
    });

    this.preencherCampoMedidaCompleta();
  }

  protected preencherCampoMedidaCompleta() {
    const unidadeMedida: number = this.produtoForm.get('unidadeMedida')?.value;
    const quantidadePorMedida: number = this.produtoForm.get(
      'quantidadePorMedida'
    )?.value;

    if (unidadeMedida !== null && quantidadePorMedida !== null) {
      this.produtoForm
        .get('medidaCompleta')
        ?.setValue(`${quantidadePorMedida} ${unidadeMedida}`);
    }
  }
}
