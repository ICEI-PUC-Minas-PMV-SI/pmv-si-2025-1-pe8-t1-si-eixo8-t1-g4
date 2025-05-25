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
import { MatDialogConfig } from '@angular/material/dialog';
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
import { DialogService } from '../../../common/services/dialog.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ItemVendaCadastroDTO } from '../../../models/dto/ItemVendaCadastroDTO';
import { ItemVendaEdicaoDTO } from '../../../models/dto/ItemVendaEdicaoDTO';
import { RegistroVendaCadastroDTO } from '../../../models/dto/RegistroVendaCadastroDTO';
import { RegistroVendaEdicaoDTO } from '../../../models/dto/RegistroVendaEdicaoDTO';
import { IdDescricao } from '../../../models/interface/IdDescricao';
import { ItemVendaVO } from '../../../models/vo/ItemVendaVO';
import { ProdutoVO } from '../../../models/vo/ProdutoVO';
import { RegistroVendaVO } from '../../../models/vo/RegistroVendaVO';
import { UnidadeMedidaVO } from '../../../models/vo/UnidadeMedidaVO';
import { ClientePetService } from '../../cliente-pet/cliente-pet.service';
import { DialogVisualizacaoClientePetComponent } from '../../cliente-pet/dialog-visualizacao-cliente-pet/dialog-visualizacao-cliente-pet.component';
import { ProdutoEstoqueService } from '../../produto-estoque/produto-estoque.service';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-cadastro-edicao-venda',
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
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './cadastro-edicao-venda.component.html',
  styleUrl: './cadastro-edicao-venda.component.scss',
})
export class CadastroEdicaoVendaComponent {
  private readonly idRegistroVenda: number;
  protected readonly currentPageIsCadastro: boolean = false;
  protected readonly currentPageIsEdicao: boolean = false;

  protected titlePage!: string;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected registroVendaForm!: FormGroup;

  protected produtoList: Array<IdDescricao> = [];
  protected produtoSelectedList: Array<ProdutoVO> = [];
  protected clienteList: Array<IdDescricao> = [];
  protected unidadeMedidaList: Array<UnidadeMedidaVO> = [];
  protected metodoPagamentoList: Array<IdDescricao> = [];

  protected buttonVisualizacaoPetsClienteIsShowed: boolean = false;

  // CONTROLES PARA AUTOCOMPLETE
  protected clienteFiltroControl = new FormControl<any>('');
  protected produtoFiltroControlList: Array<FormControl> = [];

  // LISTAS FILTRADAS
  protected clienteListFiltrado$!: Observable<IdDescricao[]>;
  protected produtoListFiltradoList$: Array<Observable<IdDescricao[]>> = [];

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
    private readonly produtoEstoqueService: ProdutoEstoqueService,
    private readonly clientePetService: ClientePetService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly snackbarService: SnackbarService
  ) {
    this.idRegistroVenda = this.route?.snapshot?.params['id'];

    const currentPage: string = window.location.pathname
      .split('/')[2]
      .toUpperCase();

    if (currentPage === 'CADASTRO') {
      this.currentPageIsCadastro = true;
      this.titlePage = 'Cadastro - Registro de Venda';
    } else if (currentPage === 'EDICAO') {
      this.currentPageIsEdicao = true;
      this.titlePage = 'Edição - Registro de Venda';
    }

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'venda',
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

    if (this.currentPageIsEdicao) {
      this.buscarDadosRegistroVenda();
    }
  }

  private initForm(): void {
    this.registroVendaForm = this.formBuilder.group({
      id: new FormControl<number | null>(null),
      idCliente: new FormControl<number | null>(null, [Validators.required]),
      valorTotal: new FormControl<number | null>(
        { value: null, disabled: true },
        [Validators.required]
      ),
      itensVenda: new FormArray([]),
      idMetodoPagamento: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      parcelasPagamento: new FormControl<number | null>(
        { value: null, disabled: true },
        [Validators.required]
      ),
    });

    this.buscarProdutoList();
    this.buscarClienteProdutoList();
    this.buscarUnidadeMedidaList();
    this.buscarMetodoPagamentoList();
  }

  private buscarProdutoList() {
    this.produtoEstoqueService
      .buscarProdutoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.produtoList = rs.objeto;
            this.adicionarItemVenda(null);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private buscarClienteProdutoList() {
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

  private buscarMetodoPagamentoList() {
    this.vendaService
      .buscarMetodoPagamentoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.metodoPagamentoList = rs.objeto;
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  protected adicionarItemVenda(itemVenda: ItemVendaVO | null) {
    if (itemVenda === null) {
      this.itemVendaFormArray.push(
        this.formBuilder.group({
          id: new FormControl<number | null>(null),
          idProduto: new FormControl<number | null>(null, [
            Validators.required,
          ]),
          medidaProduto: new FormControl<string | null>(
            { value: null, disabled: true },
            [Validators.required]
          ),
          quantidadeTotalDisponivelEstoque: new FormControl<string | null>(
            { value: null, disabled: true },
            [Validators.required]
          ),
          idUnidadeMedidaVenda: new FormControl<number | null>(
            { value: null, disabled: true },
            [Validators.required]
          ),
          quantidadeVenda: new FormControl<number | null>(
            { value: null, disabled: true },
            [Validators.required]
          ),
          precoUnitario: new FormControl<number | null>(
            { value: null, disabled: true },
            [Validators.required]
          ),
          subtotal: new FormControl<number | null>(
            { value: null, disabled: true },
            [Validators.required]
          ),
        })
      );
    } else {
      const itemVendaFormGroup: FormGroup = this.formBuilder.group({
        id: new FormControl<number | null>(itemVenda.id),
        idProduto: new FormControl<number | null>(itemVenda.produto.id, [
          Validators.required,
        ]),
        medidaProduto: new FormControl<string | null>(
          {
            value: `${itemVenda.produto.quantidadePorMedida} ${itemVenda.produto.unidadeMedida.sigla}`,
            disabled: true,
          },
          [Validators.required]
        ),
        quantidadeTotalDisponivelEstoque: new FormControl<string | null>(
          {
            value: null,
            disabled: true,
          },
          [Validators.required]
        ),
        idUnidadeMedidaVenda: new FormControl<number | null>(
          {
            value: itemVenda.unidadeMedidaVenda.id,
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
      this.produtoSelectedList.push(itemVenda.produto);

      this.calcularQuantidadeTotalDisponivelEstoque(
        itemVenda.produto,
        itemVendaFormGroup
      );
    }

    // CRIAR UM FILTRO PARA CADA ITEM VENDA
    const index = this.itemVendaFormArray.length - 1;

    const produtoFiltroControl = new FormControl({
      value:
        this.currentPageIsCadastro || itemVenda === null
          ? ''
          : this.produtoList.find(
              (produto) => produto.id === itemVenda?.produto.id
            ),
      disabled: itemVenda !== null,
    });
    this.produtoFiltroControlList.push(produtoFiltroControl);

    this.produtoListFiltradoList$.push(
      produtoFiltroControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProduto(value || '', index))
      )
    );

    if (this.currentPageIsCadastro) produtoFiltroControl.setValue('');
  }

  protected removerItemVenda(index: number) {
    if (this.itemVendaFormArray.length === 1) {
      this.dialogService.openDialogWarning(
        'É obrigatório inserir, no mínimo, 1 (um) item.'
      );
    } else {
      const dialog = this.dialogService.openDialogSimple({
        title: 'Atenção!',
        message: 'Tem certeza que deseja excluir este item?',
        labelButton2: 'Não',
        labelButton1: 'Sim',
      });

      dialog.afterClosed().subscribe((rs) => {
        if (rs) {
          this.produtoSelectedList = this.produtoSelectedList.filter(
            (produtoSelected) =>
              produtoSelected.id !==
              this.itemVendaFormGroupList[index].get('idProduto')?.value
          );

          this.itemVendaFormArray.removeAt(index);
          this.produtoFiltroControlList.splice(index, 1);
          this.produtoListFiltradoList$.splice(index, 1);

          this.calcularValorTotalRegistroVenda();
        }
      });
    }
  }

  private buscarDadosRegistroVenda() {
    this.vendaService
      .buscarPorId(this.idRegistroVenda)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const registroVenda: RegistroVendaVO = rs.objeto;
            this.preencherCamposEdicao(registroVenda);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCamposEdicao(registroVenda: RegistroVendaVO) {
    this.registroVendaForm.patchValue({
      id: registroVenda.id,
      idCliente: registroVenda.cliente.id,
      valorTotal: registroVenda.valorTotal,
      idMetodoPagamento: registroVenda.pagamento.metodoPagamento.id,
      parcelasPagamento: registroVenda.pagamento.parcelas,
    });
    this.clienteFiltroControl?.setValue(
      this.clienteList.find(
        (cliente) => cliente.id === registroVenda.cliente.id
      )
    );
    this.clienteFiltroControl?.disable();
    this.registroVendaForm.get('idCliente')?.disable();

    this.itemVendaFormArray.clear();
    this.produtoFiltroControlList = [];

    const itensVenda: Array<ItemVendaVO> = registroVenda.itens;
    itensVenda.forEach((item) => this.adicionarItemVenda(item));

    this.registroVendaForm.get('parcelasPagamento')?.enable();
  }

  protected clienteSelecionado(cliente: IdDescricao): void {
    if (cliente) {
      this.registroVendaForm.get('idCliente')?.setValue(cliente.id);
      this.buttonVisualizacaoPetsClienteIsShowed = true;
    }
  }

  protected produtoSelecionado(
    produto: IdDescricao,
    itemVendaFormGroup: FormGroup
  ): void {
    if (produto) {
      itemVendaFormGroup.get('idProduto')?.setValue(produto.id);
      this.selectProduto(itemVendaFormGroup);
    }
  }

  protected selectProduto(itemVendaFormGroup: FormGroup) {
    this.resetarCamposProduto(itemVendaFormGroup);
    const idProduto: number = itemVendaFormGroup.get('idProduto')?.value;

    if (this.produtoSelectedList.length === 0) {
      this.buscarProduto(itemVendaFormGroup, idProduto);
    } else {
      if (
        this.produtoSelectedList.some((produto) => produto.id === idProduto)
      ) {
        this.dialogService.openDialogWarning('Este produto já foi adicionado');
        itemVendaFormGroup.reset();
      } else {
        this.buscarProduto(itemVendaFormGroup, idProduto);
      }
    }
  }

  private buscarProduto(itemVendaFormGroup: FormGroup, idProduto: number) {
    this.produtoEstoqueService
      .buscarPorId(idProduto)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const produto: ProdutoVO = rs.objeto;
            this.produtoSelectedList.push(produto);
            this.preencherCamposProdutoSelecionado(produto, itemVendaFormGroup);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCamposProdutoSelecionado(
    produto: ProdutoVO,
    itemVendaFormGroup: FormGroup
  ) {
    itemVendaFormGroup.get('precoUnitario')?.setValue(produto.precoFinalVenda);
    itemVendaFormGroup
      .get('medidaProduto')
      ?.setValue(
        `${produto.quantidadePorMedida} ${produto.unidadeMedida.sigla}`
      );
    itemVendaFormGroup
      .get('idUnidadeMedidaVenda')
      ?.setValue(
        this.unidadeMedidaList.find(
          (unidade) => unidade.id === produto.unidadeMedida.id
        )?.id
      );
    itemVendaFormGroup.get('idProduto')?.disable();
    itemVendaFormGroup.get('quantidadeVenda')?.enable();

    this.calcularQuantidadeTotalDisponivelEstoque(produto, itemVendaFormGroup);
  }

  private calcularQuantidadeTotalDisponivelEstoque(
    produto: ProdutoVO,
    itemVendaFormGroup: FormGroup
  ) {
    const quantidadeTotalDisponivelEstoque: number =
      produto.quantidadePorMedida * produto.estoque.quantidadeDisponivel;

    itemVendaFormGroup
      .get('quantidadeTotalDisponivelEstoque')
      ?.setValue(
        `${quantidadeTotalDisponivelEstoque} ${produto.unidadeMedida.sigla}`
      );
  }

  protected verificarQuantidadeProdutoEstoque(itemVendaFormGroup: FormGroup) {
    const produtoSelecionado: ProdutoVO | undefined =
      this.produtoSelectedList.find(
        (produto) => produto.id === itemVendaFormGroup.get('idProduto')?.value
      );

    if (produtoSelecionado) {
      const idUnidadeMedidaProduto: number =
        produtoSelecionado.unidadeMedida.id;
      const idUnidadeMedidaVenda: number = itemVendaFormGroup.get(
        'idUnidadeMedidaVenda'
      )?.value;

      const quantidadeVenda: number =
        itemVendaFormGroup.get('quantidadeVenda')?.value;

      if (idUnidadeMedidaProduto === idUnidadeMedidaVenda) {
        const quantidadeTotalDisponivelEstoque: number =
          produtoSelecionado.estoque.quantidadeDisponivel;

        if (quantidadeVenda > quantidadeTotalDisponivelEstoque) {
          this.dialogService.openDialogWarning(
            'Não há quantidade suficiente disponível no estoque.'
          );
          itemVendaFormGroup.get('quantidadeVenda')?.reset();
        } else {
          this.calcularSubtotalItem(itemVendaFormGroup);
        }
      } else {
        this.snackbarService.openSnackBar('Erro ao verificar estoque.');
      }
    } else {
      this.snackbarService.openSnackBar('Erro ao obter produto.');
    }
  }

  private calcularSubtotalItem(itemVendaFormGroup: FormGroup) {
    const produtoSelecionado: ProdutoVO | undefined =
      this.produtoSelectedList.find(
        (produto) => produto.id === itemVendaFormGroup.get('idProduto')?.value
      );

    if (produtoSelecionado) {
      const quantidade: number =
        itemVendaFormGroup.get('quantidadeVenda')?.value;
      const precoUnitario: number = produtoSelecionado.precoFinalVenda;

      if (quantidade !== null && precoUnitario !== null) {
        const subtotal: number = this.utilService.formatarValorVenda(
          quantidade * precoUnitario
        );
        itemVendaFormGroup.get('subtotal')?.setValue(subtotal);

        this.calcularValorTotalRegistroVenda();
      } else {
        this.dialogService.openDialogWarning(
          'Ocorreu um erro ao calcular o subtotal do item.'
        );
        itemVendaFormGroup.get('subtotal')?.reset();
        this.calcularValorTotalRegistroVenda();
      }
    } else {
      this.snackbarService.openSnackBar('Erro ao obter produto.');
    }
  }

  private calcularValorTotalRegistroVenda() {
    let valorTotal: number = 0;

    this.itemVendaFormGroupList.forEach((itemVendaFormGroup: FormGroup) => {
      const subtotalItemVenda: number =
        itemVendaFormGroup.get('subtotal')?.value;

      if (subtotalItemVenda !== null) {
        valorTotal += subtotalItemVenda;
        this.registroVendaForm
          .get('valorTotal')
          ?.setValue(this.utilService.formatarValorVenda(valorTotal));
      } else {
        this.registroVendaForm.get('valorTotal')?.reset();
      }
    });
  }

  protected selectMetodoPagamento() {
    const idMetodoPagamentoSelecionado: number =
      this.registroVendaForm.get('idMetodoPagamento')?.value;

    if (
      idMetodoPagamentoSelecionado ===
      this.metodoPagamentoList.find(
        (metodo) => metodo.descricao.toUpperCase() === 'CARTÃO DE CRÉDITO'
      )!.id
    ) {
      this.registroVendaForm.get('parcelasPagamento')?.enable();
    } else {
      this.registroVendaForm.get('parcelasPagamento')?.setValue(1);
    }
  }

  protected salvar() {
    if (this.registroVendaForm.valid) {
      if (this.currentPageIsCadastro) {
        const dialog = this.dialogService.openDialogSimple({
          title: 'Atenção!',
          message: 'Tem certeza que deseja salvar este cadastro?',
          labelButton2: 'Não',
          labelButton1: 'Sim',
        });

        dialog.afterClosed().subscribe((rs) => {
          if (rs) {
            this.vendaService
              .salvar(this.getRegistroVendaCadastroDTO())
              .subscribe({
                next: (rs: any) => {
                  if (rs.codigoMensagem === 200) {
                    this.openModalCadastroEdicaoSucesso();
                  }
                },
                error: (err: any) => {
                  this.dialogService.openDialogWarning(
                    'Não foi possível concluir a venda. Recarrege a página e tente novamente.'
                  );
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
            this.vendaService
              .atualizar(this.getRegistroVendaEdicaoDTO())
              .subscribe({
                next: (rs: any) => {
                  if (rs.codigoMensagem === 200) {
                    this.openModalCadastroEdicaoSucesso();
                  }
                },
                error: (err: any) => {
                  this.dialogService.openDialogWarning(
                    'Não foi possível concluir a venda. Recarrege a página e tente novamente.'
                  );
                },
              });
          }
        });
      }
    } else {
      this.registroVendaForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Verique todos os campos antes de salvar.'
      );
    }
  }

  private getRegistroVendaCadastroDTO(): RegistroVendaCadastroDTO {
    return {
      idCliente: this.registroVendaForm.get('idCliente')?.value,
      valorTotal: this.registroVendaForm.get('valorTotal')?.value,
      itemVendaList: this.getListItemVendaCadastroDTO(),
      idMetodoPagamento: this.registroVendaForm.get('idMetodoPagamento')?.value,
      parcelasPagamento: this.registroVendaForm.get('parcelasPagamento')?.value,
    };
  }

  private getRegistroVendaEdicaoDTO(): RegistroVendaEdicaoDTO {
    return {
      id: this.registroVendaForm.get('id')?.value,
      idCliente: this.registroVendaForm.get('idCliente')?.value,
      valorTotal: this.registroVendaForm.get('valorTotal')?.value,
      itemVendaAtualizadoList: this.getListItemVendaEdicaoDTO(),
      idMetodoPagamento: this.registroVendaForm.get('idMetodoPagamento')?.value,
      parcelasPagamento: this.registroVendaForm.get('parcelasPagamento')?.value,
    };
  }

  private getListItemVendaCadastroDTO(): Array<ItemVendaCadastroDTO> {
    let listItemVendaCadastroDTO: Array<ItemVendaCadastroDTO> = [];

    this.itemVendaFormGroupList.forEach((itemVendaFormGroup: FormGroup) => {
      listItemVendaCadastroDTO.push({
        idProduto: itemVendaFormGroup.get('idProduto')?.value,
        idUnidadeMedidaVenda: itemVendaFormGroup.get('idUnidadeMedidaVenda')
          ?.value,
        quantidade: itemVendaFormGroup.get('quantidadeVenda')?.value,
        precoUnitario: itemVendaFormGroup.get('precoUnitario')?.value,
        subtotal: itemVendaFormGroup.get('subtotal')?.value,
      });
    });

    return listItemVendaCadastroDTO;
  }

  private getListItemVendaEdicaoDTO(): Array<ItemVendaEdicaoDTO> {
    let listItemVendaEdicaoDTO: Array<ItemVendaEdicaoDTO> = [];

    this.itemVendaFormGroupList.forEach((itemVendaFormGroup: FormGroup) => {
      listItemVendaEdicaoDTO.push({
        id: itemVendaFormGroup.get('id')?.value,
        idProduto: itemVendaFormGroup.get('idProduto')?.value,
        idUnidadeMedidaVenda: itemVendaFormGroup.get('idUnidadeMedidaVenda')
          ?.value,
        quantidade: itemVendaFormGroup.get('quantidadeVenda')?.value,
        precoUnitario: itemVendaFormGroup.get('precoUnitario')?.value,
        subtotal: itemVendaFormGroup.get('subtotal')?.value,
      });
    });

    return listItemVendaEdicaoDTO;
  }

  private openModalCadastroEdicaoSucesso() {
    let message: string = '';

    if (this.currentPageIsCadastro) {
      message = 'Cadastro do registro de venda realizado.';
    } else if (this.currentPageIsEdicao) {
      message = 'Edição dos dados do registro de venda realizada.';
    }

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.router.navigateByUrl('venda');
      }
    });
  }

  protected openModalVisualizacaoClientePets() {
    const dialogConfig: MatDialogConfig = {
      width: '90%',
      data: {
        idCliente: this.registroVendaForm.get('idCliente')?.value,
      },
    };
    this.dialogService.openDialogComponent(
      DialogVisualizacaoClientePetComponent,
      dialogConfig
    );
  }

  private resetarCamposProduto(itemVendaFormGroup: FormGroup) {
    itemVendaFormGroup.get('medidaProduto')?.reset();
    itemVendaFormGroup.get('quantidadeTotalDisponivelEstoque')?.reset();
    itemVendaFormGroup.get('idUnidadeMedidaVenda')?.reset();
    itemVendaFormGroup.get('quantidadeVenda')?.reset();
    itemVendaFormGroup.get('precoUnitario')?.reset();
    itemVendaFormGroup.get('subtotal')?.reset();

    this.calcularValorTotalRegistroVenda();
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

  private _filterProduto(value: any, index: number): IdDescricao[] {
    let filterValue: string = '';

    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object' && value?.descricao) {
      filterValue = value.descricao.toLowerCase();
    }

    return this.produtoList.filter((produto) =>
      produto.descricao.toLowerCase().includes(filterValue)
    );
  }

  displayClienteFn(cliente: IdDescricao): string {
    return cliente && cliente.descricao ? cliente.descricao : '';
  }

  displayProdutoFn(produto: IdDescricao): string {
    return produto && produto.descricao ? produto.descricao : '';
  }
}
