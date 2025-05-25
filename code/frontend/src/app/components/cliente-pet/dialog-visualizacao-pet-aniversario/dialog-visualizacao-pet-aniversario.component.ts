import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MaskPipe } from '../../../common/pipes/mask.pipe';
import { UtilService } from '../../../common/services/util.service';
import { PetVO } from '../../../models/vo/PetVO';
import { ClientePetService } from '../cliente-pet.service';

@Component({
  selector: 'app-dialog-visualizacao-pet-aniversario',
  imports: [
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe,
    MaskPipe,
  ],
  templateUrl: './dialog-visualizacao-pet-aniversario.component.html',
  styleUrl: './dialog-visualizacao-pet-aniversario.component.scss',
})
export class DialogVisualizacaoPetAniversarioProximoComponent {
  protected petsAniversarioProximoList: Array<PetVO> = [];

  displayedColumns: string[] = [
    'nomePet',
    'idade',
    'dataNascimento',
    'cliente',
    'acoes',
  ];
  dataSource = new MatTableDataSource();
  totalElements: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<DialogVisualizacaoPetAniversarioProximoComponent>,
    private readonly router: Router,
    private readonly clientePetService: ClientePetService,
    protected readonly utilService: UtilService
  ) {
    this.petsAniversarioProximoList = this.data.petsAniversarioProximoList;
    this.dataSource.data = this.petsAniversarioProximoList;
    this.totalElements = this.petsAniversarioProximoList.length;
  }

  protected calcularIdadePet(pet: PetVO) {
    return this.clientePetService.calcularIdadePet(pet);
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
