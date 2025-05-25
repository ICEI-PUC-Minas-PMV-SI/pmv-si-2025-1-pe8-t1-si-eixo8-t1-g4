import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { forkJoin, map, take } from 'rxjs';
import { MaskPipe } from '../../../common/pipes/mask.pipe';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ClienteVO } from '../../../models/vo/ClienteVO';
import { VacinacaoVO } from '../../../models/vo/VacinacaoVO';
import { ClientePetService } from '../../cliente-pet/cliente-pet.service';

@Component({
  selector: 'app-dialog-vacinacao-pet',
  imports: [
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MaskPipe,
    DatePipe,
  ],
  templateUrl: './dialog-vacinacao-pet.component.html',
  styleUrl: './dialog-vacinacao-pet.component.scss',
})
export class DialogVacinacaoPetComponent {
  protected vacinacaoList: Array<VacinacaoVO> = [];

  protected titleDialog: string = '';

  displayedColumns: string[] = [
    'nomePet',
    'nomeCliente',
    'celularCliente',
    'dataProximaVacinacao',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogVacinacaoPetComponent>,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly clientePetService: ClientePetService,
    protected readonly utilService: UtilService
  ) {
    this.titleDialog = data.title;
    this.vacinacaoList = this.data.list;
  }

  ngOnInit() {
    this.montarDataSource();
  }

  private async montarDataSource() {
    try {
      const list = await this.buscarClientePorIdPet();
      this.dataSource.data = list;
      this.totalElements = list.length;
    } catch (err) {
      if (err) {
        this.snackbarService.openSnackBar('Erro ao buscar clientes.');
      }
    }
  }

  private buscarClientePorIdPet(): Promise<Array<any>> {
    const observables = this.vacinacaoList.map((vacinacao: VacinacaoVO) =>
      this.clientePetService.buscarClientePorIdPet(vacinacao.pet.id).pipe(
        map((rs: any) => {
          if (rs.codigoMensagem === 200) {
            const cliente: ClienteVO = rs.objeto;
            return { ...vacinacao, cliente };
          } else {
            throw new Error('Erro ao buscar cliente');
          }
        })
      )
    );

    return new Promise((resolve, reject) => {
      forkJoin(observables)
        .pipe(take(1))
        .subscribe({
          next: (result) => resolve(result),
          error: (err) => reject(err),
        });
    });
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