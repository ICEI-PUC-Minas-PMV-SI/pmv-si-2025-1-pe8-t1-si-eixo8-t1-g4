import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-idade-pet',
  imports: [BaseChartDirective, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './relatorio-idade-pet.component.html',
  styleUrl: './relatorio-idade-pet.component.scss',
})
export class RelatorioIdadePetComponent {
  labels: string[] = [];
  data: number[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<RelatorioIdadePetComponent>,
    private readonly relatoriosService: RelatoriosService
  ) {}

  ngOnInit() {
    this.relatoriosService
      .buscarPetsPorIdade()
      .pipe(take(1))
      .subscribe((response: any) => {
        const objetos = response.objeto;
        this.labels = objetos.map((obj: any) => obj.idade + ' anos');
        this.data = objetos.map((obj: any) => obj.quantidade);
      });
  }

  protected fecharDialog() {
    this.dialogRef.close();
  }
}
