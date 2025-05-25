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
import { SnackbarService } from '../../common/services/snackbar.service';
import { UtilService } from '../../common/services/util.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    protected readonly utilService: UtilService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.maxLength(100)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const dto: LoginDTO = {
        usuario: this.loginForm.get('usuario')?.value,
        senha: this.loginForm.get('senha')?.value,
      };

      this.authService
        .login(dto)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('home');
          },
          error: (err: any) => {
            this.snackbarService.openSnackBar('Credenciais inválidas.');
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackbarService.openSnackBar('Usuário e/ou senha inválidos.');
    }
  }
}

export interface LoginDTO {
  usuario: string;
  senha: string;
}
