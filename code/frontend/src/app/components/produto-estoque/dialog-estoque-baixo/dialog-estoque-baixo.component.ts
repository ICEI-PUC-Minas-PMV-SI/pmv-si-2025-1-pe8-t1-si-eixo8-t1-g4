import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogService } from '../../../common/services/dialog.service';
import { ProdutoVO } from '../../../models/vo/ProdutoVO';
import { DialogAtualizarEstoqueComponent } from '../dialog-atualizar-estoque/dialog-atualizar-estoque.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dialog-estoque-baixo',
  imports: [MatTableModule, MatIconModule, MatTooltipModule],
  templateUrl: './dialog-estoque-baixo.component.html',
  styleUrl: './dialog-estoque-baixo.component.scss',
})
export class DialogEstoqueBaixoComponent {
  protected produtosEstoqueBaixoList: Array<ProdutoVO> = [];

  displayedColumns: string[] = [
    'nome',
    'medida',
    'categoria',
    'quantidadeDisponivel',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogEstoqueBaixoComponent>,
    private readonly router: Router,
    private readonly dialogService: DialogService
  ) {
    this.produtosEstoqueBaixoList = this.data.produtosEstoqueBaixoList;
    this.dataSource.data = this.produtosEstoqueBaixoList;
    this.totalElements = this.produtosEstoqueBaixoList.length;
  }

  protected openModalAtualizarEstoque(idProduto: number) {
    this.fecharDialog();

    const dialogConfig: MatDialogConfig = {
      width: '90%',
      data: {
        idProduto: idProduto,
      },
    };
    this.dialogService.openDialogComponent(
      DialogAtualizarEstoqueComponent,
      dialogConfig
    );
  }

  protected redirectTo(urlPath: string, id?: string | number) {
    if (id) {
      this.router.navigateByUrl(`${urlPath}/${id}`);
    } else {
      this.router.navigateByUrl(`${urlPath}`);
    }

    this.fecharDialog();
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
