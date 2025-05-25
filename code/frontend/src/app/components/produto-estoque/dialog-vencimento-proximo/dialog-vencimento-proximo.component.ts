import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ProdutoVO } from '../../../models/vo/ProdutoVO';
import { DialogEstoqueBaixoComponent } from '../dialog-estoque-baixo/dialog-estoque-baixo.component';

@Component({
  selector: 'app-dialog-vencimento-proximo',
  imports: [MatTableModule, MatIconModule, MatTooltipModule, DatePipe],
  templateUrl: './dialog-vencimento-proximo.component.html',
  styleUrl: './dialog-vencimento-proximo.component.scss',
})
export class DialogVencimentoProximoComponent {
  protected produtosVencimentoProximoList: Array<ProdutoVO> = [];

  displayedColumns: string[] = [
    'nome',
    'medida',
    'categoria',
    'dataVencimento',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogEstoqueBaixoComponent>,
    private readonly router: Router
  ) {
    this.produtosVencimentoProximoList =
      this.data.produtosVencimentoProximoList;
    this.dataSource.data = this.produtosVencimentoProximoList;
    this.totalElements = this.produtosVencimentoProximoList.length;
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
