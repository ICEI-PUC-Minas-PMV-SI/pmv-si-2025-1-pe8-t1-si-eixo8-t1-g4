import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../../common/components/title-page/title-page.component';
import { InputSanitizerDirective } from '../../../common/directives/input-sanitizier.directive';
import { DialogService } from '../../../common/services/dialog.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ProdutoCadastroDTO } from '../../../models/dto/ProdutoCadastroDTO';
import { ProdutoEdicaoDTO } from '../../../models/dto/ProdutoEdicaoDTO';
import { CategoriaProdutoVO } from '../../../models/vo/CategoriaProdutoVO';
import { ProdutoVO } from '../../../models/vo/ProdutoVO';
import { UnidadeMedidaVO } from '../../../models/vo/UnidadeMedidaVO';
import { HomeService } from '../../home/home.service';
import { ProdutoEstoqueService } from '../produto-estoque.service';

@Component({
  selector: 'app-cadastro-edicao-produto-estoque',
  imports: [
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskDirective,
    MatDividerModule,
    MatDatepickerModule,
    MatIconModule,
    InputSanitizerDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cadastro-edicao-produto-estoque.component.html',
  styleUrl: './cadastro-edicao-produto-estoque.component.scss',
})
export class CadastroEdicaoProdutoEstoqueComponent {
  private readonly idProduto: number;
  private readonly currentPageIsCadastro: boolean = false;
  private readonly currentPageIsEdicao: boolean = false;

  protected titlePage!: string;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected produtoForm!: FormGroup;

  protected categoriaProdutoList: Array<CategoriaProdutoVO> = [];
  protected unidadeMedidaList: Array<UnidadeMedidaVO> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly route: ActivatedRoute,
    private readonly produtoEstoqueService: ProdutoEstoqueService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly snackbarService: SnackbarService,
    private readonly homeService: HomeService
  ) {
    this.idProduto = this.route?.snapshot?.params['id'];

    const currentPage: string = window.location.pathname
      .split('/')[2]
      .toUpperCase();

    if (currentPage === 'CADASTRO') {
      this.currentPageIsCadastro = true;
      this.titlePage = 'Cadastro - Produto';
    } else if (currentPage === 'EDICAO') {
      this.currentPageIsEdicao = true;
      this.titlePage = 'Edição - Produto';
    }

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'produto',
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
    this.buscarCategoriaProdutoList();
    this.buscarUnidadeMedidaList();
    this.initForm();

    if (this.currentPageIsEdicao) {
      this.buscarDadosProduto();
    }
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

  private buscarUnidadeMedidaList() {
    this.produtoEstoqueService
      .buscarUnidadeMedidaList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.unidadeMedidaList = rs.objeto;
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private initForm(): void {
    this.produtoForm = this.formBuilder.group({
      id: new FormControl<number | null>(null),
      nome: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      precoCusto: new FormControl<number | null>(null, [Validators.required]),
      margemLucro: new FormControl<number | null>(null, [Validators.required]),
      precoVenda: new FormControl<number | null>(
        { value: null, disabled: true },
        [Validators.required]
      ),
      precoFinalVenda: new FormControl<number | null>(
        { value: null, disabled: true },
        [Validators.required]
      ),
      idCategoria: new FormControl<number | null>(null, [Validators.required]),
      quantidadeDisponivel: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      quantidadeMinima: new FormControl<number | null>(null, [
        Validators.min(0),
      ]),
      idUnidadeMedida: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      quantidadePorMedida: new FormControl<number | null>(null, [
        Validators.min(1),
      ]),
      medidaCompleta: new FormControl<string>({ value: '', disabled: true }, [
        Validators.required,
      ]),
      dataVencimento: new FormControl<Date | null>(null),
      codigoBarras: new FormControl<string>('', [Validators.maxLength(20)]),
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
            this.preencherCamposEdicao(produto);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCamposEdicao(produto: ProdutoVO) {
    let dataVencimento = null;
    if (
      produto.dataVencimento !== null &&
      produto.dataVencimento !== undefined
    ) {
      const [ano, mes, dia] = produto.dataVencimento.split('-').map(Number);
      dataVencimento = new Date(ano, mes - 1, dia);
    }

    this.produtoForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      precoCusto: produto.precoCusto,
      margemLucro: produto.margemLucro,
      precoFinalVenda: produto.precoFinalVenda,
      idCategoria: produto.categoria.id,
      quantidadeDisponivel: produto.estoque.quantidadeDisponivel,
      quantidadeMinima: produto.estoque.quantidadeMinima,
      idUnidadeMedida: produto.unidadeMedida.id,
      quantidadePorMedida: produto.quantidadePorMedida,
      dataVencimento: dataVencimento,
      codigoBarras: produto.codigoBarras,
    });

    this.preencherCampoMedidaCompleta();
  }

  protected preencherCampoMedidaCompleta() {
    const idUnidadeMedida: number =
      this.produtoForm.get('idUnidadeMedida')?.value;
    const quantidadePorMedida: number = this.produtoForm.get(
      'quantidadePorMedida'
    )?.value;

    if (idUnidadeMedida !== null && quantidadePorMedida !== null) {
      const siglaUnidadeMedida: string = this.unidadeMedidaList.find(
        (unidade) => unidade.id === idUnidadeMedida
      )!.sigla;
      this.produtoForm
        .get('medidaCompleta')
        ?.setValue(`${quantidadePorMedida} ${siglaUnidadeMedida}`);
    }
  }

  protected calcularPrecoVenda() {
    const precoCusto: number = this.produtoForm.get('precoCusto')?.value;
    const margemLucro: number = this.produtoForm.get('margemLucro')?.value;

    if (precoCusto !== null && margemLucro !== null) {
      const precoVenda: number = precoCusto * (1 + margemLucro / 100);
      this.produtoForm.get('precoFinalVenda')?.setValue(precoVenda);
    }
  }

  protected salvar() {
    if (this.produtoForm.valid) {
      if (this.currentPageIsCadastro) {
        const dialog = this.dialogService.openDialogSimple({
          title: 'Atenção!',
          message: 'Tem certeza que deseja salvar este cadastro?',
          labelButton2: 'Não',
          labelButton1: 'Sim',
        });

        dialog.afterClosed().subscribe((rs) => {
          if (rs) {
            this.produtoEstoqueService
              .salvar(this.getProdutoCadastroDTO())
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
            this.produtoEstoqueService
              .atualizar(this.getProdutoEdicaoDTO())
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
      this.produtoForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Verique todos os campos antes de salvar.'
      );
    }
  }

  private getProdutoCadastroDTO(): ProdutoCadastroDTO {
    return {
      nome: this.produtoForm.get('nome')?.value,
      precoCusto: this.produtoForm.get('precoCusto')?.value,
      margemLucro: this.produtoForm.get('margemLucro')?.value,
      precoFinalVenda: this.produtoForm.get('precoFinalVenda')?.value,
      idCategoria: this.produtoForm.get('idCategoria')?.value,
      quantidadeDisponivelEstoque: this.produtoForm.get('quantidadeDisponivel')
        ?.value,
      quantidadeMinimaEstoque: this.produtoForm.get('quantidadeMinima')?.value,
      idUnidadeMedida: this.produtoForm.get('idUnidadeMedida')?.value,
      quantidadePorMedida: this.produtoForm.get('quantidadePorMedida')?.value,
      dataVencimento: this.produtoForm.get('dataVencimento')?.value,
      codigoBarras: this.produtoForm.get('codigoBarras')?.value,
    };
  }

  private getProdutoEdicaoDTO(): ProdutoEdicaoDTO {
    return {
      id: this.produtoForm.get('id')?.value,
      nome: this.produtoForm.get('nome')?.value,
      precoCusto: this.produtoForm.get('precoCusto')?.value,
      margemLucro: this.produtoForm.get('margemLucro')?.value,
      precoFinalVenda: this.produtoForm.get('precoFinalVenda')?.value,
      idCategoria: this.produtoForm.get('idCategoria')?.value,
      quantidadeDisponivelEstoque: this.produtoForm.get('quantidadeDisponivel')
        ?.value,
      quantidadeMinimaEstoque: this.produtoForm.get('quantidadeMinima')?.value,
      idUnidadeMedida: this.produtoForm.get('idUnidadeMedida')?.value,
      quantidadePorMedida: this.produtoForm.get('quantidadePorMedida')?.value,
      dataVencimento: this.produtoForm.get('dataVencimento')?.value,
      codigoBarras: this.produtoForm.get('codigoBarras')?.value,
    };
  }

  private openModalCadastroEdicaoSucesso() {
    let message: string = '';

    if (this.currentPageIsCadastro) {
      message = 'Cadastro do produto realizado.';
    } else if (this.currentPageIsEdicao) {
      message = 'Edição dos dados do produto realizada.';
    }

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.homeService.emitirEventoAlertas('');
        this.router.navigateByUrl('produto');
      }
    });
  }
}
