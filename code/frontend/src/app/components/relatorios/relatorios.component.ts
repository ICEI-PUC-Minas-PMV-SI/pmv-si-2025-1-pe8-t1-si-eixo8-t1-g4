import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../common/services/dialog.service';
import { RelatorioClientesMaisCompramComponent } from './relatorio-clientes-mais-compram/relatorio-clientes-mais-compram.component';
import { RelatorioDiasMesMaisVendidosComponent } from './relatorio-dias-mes-mais-vendidos/relatorio-dias-mes-mais-vendidos.component';
import { RelatorioDiasSemanaMaisVendidosComponent } from './relatorio-dias-semana-mais-vendidos/relatorio-dias-semana-mais-vendidos.component';
import { RelatorioIdadePetComponent } from './relatorio-idade-pet/relatorio-idade-pet.component';
import { RelatorioProdutosMaisVendidosComponent } from './relatorio-produtos-mais-vendidos/relatorio-produtos-mais-vendidos.component';
import { RelatorioRacaPetComponent } from './relatorio-raca-pet/relatorio-raca-pet.component';
import { RelatorioTipoPetComponent } from './relatorio-tipo-pet/relatorio-tipo-pet.component';

@Component({
  selector: 'app-relatorios',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss',
})
export class RelatoriosComponent {
  private readonly dialogService = inject(DialogService);

  protected openDialogProdutosMaisVendidos() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioProdutosMaisVendidosComponent,
      dialogConfig
    );
  }

  protected openDialogClientesMaisCompram() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioClientesMaisCompramComponent,
      dialogConfig
    );
  }

  protected openDialogDiasMesMaisVendidos() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioDiasMesMaisVendidosComponent,
      dialogConfig
    );
  }

  protected openDialogDiasSemanaMaisVendidos() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioDiasSemanaMaisVendidosComponent,
      dialogConfig
    );
  }

  protected openDialogIdadePet() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioIdadePetComponent,
      dialogConfig
    );
  }

  protected openDialogRacaPet() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioRacaPetComponent,
      dialogConfig
    );
  }

  protected openDialogTipoPet() {
    const dialogConfig: MatDialogConfig = {
      width: '95%',
      height: '95%',
    };
    this.dialogService.openDialogComponent(
      RelatorioTipoPetComponent,
      dialogConfig
    );
  }
}
