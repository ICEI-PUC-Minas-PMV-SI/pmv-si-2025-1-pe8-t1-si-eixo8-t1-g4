import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ButtonTitlePage } from '../../../common/components/title-page/title-page.component';
import { DialogService } from '../../../common/services/dialog.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ProdutoEstoqueAtualizacaoDTO } from '../../../models/dto/ProdutoEstoqueAtualizacaoDTO';
import { ProdutoVO } from '../../../models/vo/ProdutoVO';
import { ProdutoEstoqueService } from '../produto-estoque.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-atualizar-estoque',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dialog-atualizar-estoque.component.html',
  styleUrl: './dialog-atualizar-estoque.component.scss',
})
export class DialogAtualizarEstoqueComponent {
  protected idProduto: number;
  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected produtoForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogAtualizarEstoqueComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly produtoEstoqueService: ProdutoEstoqueService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
    protected utilService: UtilService
  ) {
    this.idProduto = this.data.idProduto;
  }

  ngOnInit() {
    this.initForm();
    this.buscarDadosProduto();
  }

  private initForm(): void {
    this.produtoForm = this.formBuilder.group({
      idProduto: new FormControl<number | null>({
        value: null,
        disabled: true,
      }),
      nomeProduto: new FormControl<string>({ value: '', disabled: true }),
      medida: new FormControl<string>({ value: '', disabled: true }),
      quantidadeDisponivel: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      quantidadeMinima: new FormControl<number | null>(null),
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
    this.produtoForm.patchValue({
      idProduto: produto.id,
      nomeProduto: produto.nome,
      medida: `${produto.quantidadePorMedida} ${produto.unidadeMedida.sigla}`,
      quantidadeDisponivel: produto.estoque.quantidadeDisponivel,
      quantidadeMinima: produto.estoque.quantidadeMinima,
    });
  }

  protected salvar() {
    if (this.produtoForm.valid) {
      const dialog = this.dialogService.openDialogSimple({
        title: 'Atenção!',
        message: 'Tem certeza que deseja atualizar o estoque deste produto?',
        labelButton2: 'Não',
        labelButton1: 'Sim',
      });

      dialog.afterClosed().subscribe((rs) => {
        if (rs) {
          this.produtoEstoqueService
            .atualizarEstoque(this.getProdutoEstoqueAtualizacaoDTO())
            .subscribe({
              next: (rs: any) => {
                if (rs.codigoMensagem === 200) {
                  this.openModalAtualizacaoSucesso();
                }
              },
              error: (err: any) => {
                this.snackbarService.openSnackBar(err.error.mensagem);
              },
            });
        }
      });
    } else {
      this.produtoForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Verique todos os campos antes de salvar.'
      );
    }
  }

  private getProdutoEstoqueAtualizacaoDTO(): ProdutoEstoqueAtualizacaoDTO {
    return {
      idProduto: this.produtoForm.get('idProduto')?.value,
      quantidadeDisponivelEstoque: this.produtoForm.get('quantidadeDisponivel')
        ?.value,
      quantidadeMinimaEstoque: this.produtoForm.get('quantidadeMinima')?.value,
    };
  }

  private openModalAtualizacaoSucesso() {
    let message: string = 'Atualização do estoque realizada.';

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.fecharDialog();
        location.reload();
      }
    });
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
