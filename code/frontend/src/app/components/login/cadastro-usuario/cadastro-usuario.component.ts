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
import { AuthService } from '../../../auth/auth.service';
import { DialogService } from '../../../common/services/dialog.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss',
})
export class CadastroUsuarioComponent {
  protected cadastroForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      usuario: ['', [Validators.required, Validators.maxLength(100)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const dialog = this.dialogService.openDialogSimple({
        title: 'Atenção!',
        message: 'Tem certeza que deseja cadastrar este usuário?',
        labelButton2: 'Não',
        labelButton1: 'Sim',
      });

      dialog.afterClosed().subscribe((rs) => {
        if (rs) {
          const dto: UsuarioDTO = {
            nome: this.cadastroForm.get('nome')?.value,
            usuario: this.cadastroForm.get('usuario')?.value,
            senha: this.cadastroForm.get('senha')?.value,
          };

          this.authService
            .cadastrarUsuario(dto)
            .pipe(take(1))
            .subscribe({
              next: (rs: any) => {
                if (rs.codigoMensagem === 200) {
                  this.openModalCadastroSucesso();
                }
              },
              error: (err) => {
                this.snackbarService.openSnackBar(
                  `Erro ao cadastrar usuário: ${err.error.mensagem}`
                );
              },
            });
        }
      });
    } else {
      this.cadastroForm.markAllAsTouched();
      this.snackbarService.openSnackBar(
        'Verique todos os campos antes de salvar.'
      );
    }
  }

  private openModalCadastroSucesso() {
    let message: string = 'Cadastro do usuário realizado.';

    const dialog = this.dialogService.openDialogSuccess(message);
    dialog.afterClosed().subscribe((rs) => {
      if (rs) {
        this.router.navigateByUrl('login');
      }
    });
  }
}

export interface UsuarioDTO {
  nome: string;
  usuario: string;
  senha: string;
}
