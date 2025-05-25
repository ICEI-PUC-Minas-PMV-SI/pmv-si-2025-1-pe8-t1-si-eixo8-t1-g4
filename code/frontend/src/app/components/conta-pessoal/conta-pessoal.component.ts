import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DialogService } from '../../common/services/dialog.service';
import { SnackbarService } from '../../common/services/snackbar.service';
import { UtilService } from '../../common/services/util.service';

@Component({
  selector: 'app-conta-pessoal',
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './conta-pessoal.component.html',
  styleUrl: './conta-pessoal.component.scss',
})
export class ContaPessoalComponent {
  protected usuarioForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    protected readonly utilService: UtilService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.initForm();
    this.buscarDadosLogin();
  }

  private initForm() {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      usuario: ['', [Validators.required, Validators.maxLength(100)]],
      senhaAtual: ['', [Validators.required, Validators.minLength(5)]],
      novaSenha: ['', [Validators.required]],
    });
  }

  private buscarDadosLogin() {
    this.authService
      .buscarDadosUsuario()
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          this.usuarioForm.patchValue({
            nome: rs.nome,
            usuario: rs.usuario,
          });
        },
        error: () => {
          this.snackbarService.openSnackBar(
            'Erro ao carregar dados do usuário.'
          );
        },
      });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const dialog = this.dialogService.openDialogSimple({
        title: 'Atenção!',
        message: 'Tem certeza que deseja atualizar este usuário?',
        labelButton2: 'Não',
        labelButton1: 'Sim',
      });

      dialog.afterClosed().subscribe((rs) => {
        if (rs) {
          const dto: AtualizacaoUsuarioDTO = {
            nome: this.usuarioForm.get('nome')?.value,
            usuario: this.usuarioForm.get('usuario')?.value,
            senhaAtual: this.usuarioForm.get('senhaAtual')?.value,
            novaSenha: this.usuarioForm.get('novaSenha')?.value,
          };

          this.authService
            .atualizarUsuario(dto)
            .pipe(take(1))
            .subscribe({
              next: (rs: any) => {
                if (rs.codigoMensagem === 200) {
                  this.openModalAtualizacaoSucesso();
                }
              },
              error: (err: any) => {
                if (err.error) {
                  this.snackbarService.openSnackBar(
                    `Erro ao atualizar usuário: ${err.error.mensagem}`
                  );
                } else {
                  this.snackbarService.openSnackBar(
                    'Erro ao atualizar usuário.'
                  );
                }
              },
            });
        }
      });
    } else {
      this.usuarioForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Preencha todos os campos obrigatórios.'
      );
    }
  }

  private openModalAtualizacaoSucesso() {
    let message: string = 'Cadastro do usuário atualizado.';

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.authService.logout();
        this.router.navigateByUrl('login');
      }
    });
  }
}

export interface AtualizacaoUsuarioDTO {
  nome: string;
  usuario: string;
  senhaAtual: string;
  novaSenha: string;
}
