import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { DialogService } from './common/services/dialog.service';
import { SnackbarService } from './common/services/snackbar.service';
import { UtilService } from './common/services/util.service';
import { ClientePetService } from './components/cliente-pet/cliente-pet.service';
import { DialogVisualizacaoPetAniversarioProximoComponent } from './components/cliente-pet/dialog-visualizacao-pet-aniversario/dialog-visualizacao-pet-aniversario.component';
import { ControleVacinacaoService } from './components/controle-vacinacao/controle-vacinacao.service';
import { DialogVacinacaoPetComponent } from './components/controle-vacinacao/dialog-vacinacao-pet/dialog-vacinacao-pet.component';
import { HomeService } from './components/home/home.service';
import { DialogEstoqueBaixoComponent } from './components/produto-estoque/dialog-estoque-baixo/dialog-estoque-baixo.component';
import { DialogVencimentoProximoComponent } from './components/produto-estoque/dialog-vencimento-proximo/dialog-vencimento-proximo.component';
import { ProdutoEstoqueService } from './components/produto-estoque/produto-estoque.service';
import { PetVO } from './models/vo/PetVO';
import { ProdutoVO } from './models/vo/ProdutoVO';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly authService = inject(AuthService);
  readonly utilService = inject(UtilService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly clientePetService = inject(ClientePetService);
  private readonly produtoEstoqueService = inject(ProdutoEstoqueService);
  private readonly homeService = inject(HomeService);
  private readonly dialogService = inject(DialogService);
  private readonly controleVacinacaoService = inject(ControleVacinacaoService);

  title = 'ANAGRO PETS';

  protected petsAniversarioProximoList: Array<PetVO> = [];
  protected produtosEstoqueBaixoList: Array<ProdutoVO> = [];
  protected produtosVencimentoProximoList: Array<ProdutoVO> = [];
  protected petsVacinaProximoList: Array<PetVO> = [];
  protected petsVacinaAtrasadaList: Array<PetVO> = [];

  ngOnInit() {
    this.homeService.eventoAlertasObservable.subscribe((evento) => {
      this.callMethods();
    });
  }

  private callMethods() {
    this.buscarPetsAniversarioProximo();
    this.buscarProdutosEstoqueBaixo();
    this.buscarProdutosVencimentoProximo();
    this.buscarPetsVacinaProximo();
    this.buscarPetsVacinaAtrasada();
  }

  private buscarPetsAniversarioProximo() {
    this.clientePetService
      .buscarPetsAniversarioProximoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.petsAniversarioProximoList = rs.objeto;
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.petsAniversarioProximoList = [];
          } else {
            this.snackbarService.openSnackBar(err.error.mensagem);
          }
        },
      });
  }

  private buscarProdutosEstoqueBaixo() {
    this.produtoEstoqueService
      .buscarProdutosEstoqueBaixoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.produtosEstoqueBaixoList = rs.objeto;
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.produtosEstoqueBaixoList = [];
          } else {
            this.snackbarService.openSnackBar(err.error.mensagem);
          }
        },
      });
  }

  private buscarProdutosVencimentoProximo() {
    this.produtoEstoqueService
      .buscarProdutosVencimentoProximoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.produtosVencimentoProximoList = rs.objeto;
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.produtosVencimentoProximoList = [];
          } else {
            this.snackbarService.openSnackBar(err.error.mensagem);
          }
        },
      });
  }

  private buscarPetsVacinaProximo() {
    this.controleVacinacaoService
      .buscarPetsVacinaProximoList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.petsVacinaProximoList = rs.objeto;
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.petsVacinaProximoList = [];
          } else {
            this.snackbarService.openSnackBar(err.error.mensagem);
          }
        },
      });
  }

  private buscarPetsVacinaAtrasada() {
    this.controleVacinacaoService
      .buscarPetsVacinaAtrasadaList()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            this.petsVacinaAtrasadaList = rs.objeto;
          }
        },
        error: (err: any) => {
          if (err.error.codigoMensagem === 404) {
            this.petsVacinaAtrasadaList = [];
          } else {
            this.snackbarService.openSnackBar(err.error.mensagem);
          }
        },
      });
  }

  protected openDialogPetsAniversarioProximo() {
    const dialogConfig: MatDialogConfig = {
      width: '70%',
      data: {
        petsAniversarioProximoList: this.petsAniversarioProximoList,
      },
    };
    this.dialogService.openDialogComponent(
      DialogVisualizacaoPetAniversarioProximoComponent,
      dialogConfig
    );
  }

  protected openDialogEstoqueBaixo() {
    const dialogConfig: MatDialogConfig = {
      width: '70%',
      data: {
        produtosEstoqueBaixoList: this.produtosEstoqueBaixoList,
      },
    };
    this.dialogService.openDialogComponent(
      DialogEstoqueBaixoComponent,
      dialogConfig
    );
  }

  protected openDialogVencimentoProximo() {
    const dialogConfig: MatDialogConfig = {
      width: '70%',
      data: {
        produtosVencimentoProximoList: this.produtosVencimentoProximoList,
      },
    };
    this.dialogService.openDialogComponent(
      DialogVencimentoProximoComponent,
      dialogConfig
    );
  }

  protected openDialogVacinacaoPet(tipo: string) {
    let titleDialog: string = '';
    let dataDialog: any;

    switch (tipo) {
      case 'VACINA-PROXIMO':
        titleDialog = 'Pets com Vacina Próxima';
        dataDialog = this.petsVacinaProximoList;
        break;
      case 'VACINA-ATRASADA':
        titleDialog = 'Pets com Vacina Atrasada';
        dataDialog = this.petsVacinaAtrasadaList;
        break;
    }

    const dialogConfig: MatDialogConfig = {
      width: '80%',
      data: {
        title: titleDialog,
        list: dataDialog,
      },
    };
    this.dialogService.openDialogComponent(
      DialogVacinacaoPetComponent,
      dialogConfig
    );
  }
}