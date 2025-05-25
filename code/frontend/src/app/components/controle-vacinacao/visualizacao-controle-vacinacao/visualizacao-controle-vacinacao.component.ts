import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import {
  ButtonAction,
  ButtonTitlePage,
  TitlePageComponent,
} from '../../../common/components/title-page/title-page.component';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { UtilService } from '../../../common/services/util.service';
import { ClienteVO } from '../../../models/vo/ClienteVO';
import { VacinacaoVO } from '../../../models/vo/VacinacaoVO';
import { ClientePetService } from '../../cliente-pet/cliente-pet.service';
import { ControleVacinacaoService } from '../controle-vacinacao.service';

@Component({
  selector: 'app-visualizacao-controle-vacinacao',
  imports: [
    NgFor,
    TitlePageComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './visualizacao-controle-vacinacao.component.html',
  styleUrl: './visualizacao-controle-vacinacao.component.scss',
})
export class VisualizacaoControleVacinacaoComponent {
  private readonly idPet: number;

  protected buttonsTitlePage: Array<ButtonTitlePage> = [];
  protected vacinacaoForm!: FormGroup;

  get vacinaFormArray(): FormArray {
    return this.vacinacaoForm.get('vacinas') as FormArray;
  }

  get vacinaFormGroupList(): FormGroup[] {
    return this.vacinaFormArray.controls as FormGroup[];
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    protected utilService: UtilService,
    private readonly route: ActivatedRoute,
    private readonly controleVacinacaoService: ControleVacinacaoService,
    private readonly clientePetService: ClientePetService,
    private readonly snackbarService: SnackbarService
  ) {
    this.idPet = this.route?.snapshot?.params['id'];

    this.buttonsTitlePage = [
      {
        name: 'Voltar',
        action: ButtonAction.REDIRECT,
        primary: false,
        disabled: false,
        route: 'vacinacao',
      },
      {
        name: 'Editar',
        action: ButtonAction.REDIRECT,
        primary: true,
        disabled: false,
        route: `vacinacao/edicao/${this.idPet}`,
      },
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.buscarDadosVacinacao();
    this.buscarClientePorIdPet();
  }

  private initForm(): void {
    this.vacinacaoForm = this.formBuilder.group({
      id: new FormControl<number | null>({ value: null, disabled: true }),
      cliente: new FormControl<string | null>({ value: null, disabled: true }),
      pet: new FormControl<string | null>({ value: null, disabled: true }),
      vacinas: new FormArray([]),
    });
  }

  private buscarDadosVacinacao() {
    this.controleVacinacaoService
      .buscarPorIdPet(this.idPet)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const vacinacaoList: Array<VacinacaoVO> = rs.objeto;
            this.preencherCampos(vacinacaoList);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }

  private preencherCampos(vacinacaoList: Array<VacinacaoVO>) {
    if (vacinacaoList.length > 0) {
      this.vacinacaoForm.patchValue({
        id: vacinacaoList[0].id,
        pet: vacinacaoList[0].pet.nome,
      });

      vacinacaoList.forEach((vacinacao: VacinacaoVO) => {
        let dataAplicacao = null;
        if (
          vacinacao.dataAplicacao !== null &&
          vacinacao.dataAplicacao !== undefined
        ) {
          const [ano, mes, dia] = vacinacao?.dataAplicacao
            .split('-')
            .map(Number);
          dataAplicacao = new Date(ano, mes - 1, dia).toLocaleDateString(
            'pt-br'
          );
        }

        let dataProximaDose = null;
        if (
          vacinacao.dataProximaDose !== null &&
          vacinacao.dataProximaDose !== undefined
        ) {
          const [ano, mes, dia] = vacinacao?.dataProximaDose
            .split('-')
            .map(Number);
          dataProximaDose = new Date(ano, mes - 1, dia).toLocaleDateString(
            'pt-br'
          );
        }

        const vacinaFormGroup: FormGroup = this.formBuilder.group({
          id: new FormControl<number | null>({
            value: vacinacao?.id,
            disabled: true,
          }),
          nome: new FormControl<string | null>({
            value: vacinacao?.nomeVacina,
            disabled: true,
          }),
          dataAplicacao: new FormControl<string | null>({
            value: dataAplicacao,
            disabled: true,
          }),
          dataProximaDose: new FormControl<string | null>({
            value: dataProximaDose,
            disabled: true,
          }),
          observacoes: new FormControl<string | null>({
            value: vacinacao?.observacoes,
            disabled: true,
          }),
        });
        this.vacinaFormArray.push(vacinaFormGroup);
      });
    }
  }

  private buscarClientePorIdPet() {
    this.clientePetService
      .buscarClientePorIdPet(this.idPet)
      .pipe(take(1))
      .subscribe({
        next: (rs: any) => {
          if (rs.codigoMensagem === 200) {
            const cliente: ClienteVO = rs.objeto;
            this.vacinacaoForm.get('cliente')?.setValue(cliente?.nome);
          }
        },
        error: (err: any) => {
          this.snackbarService.openSnackBar(err.error.mensagem);
        },
      });
  }
}
