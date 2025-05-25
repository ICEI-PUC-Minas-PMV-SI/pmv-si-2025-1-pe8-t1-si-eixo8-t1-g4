import { Component, Inject, inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfigDataDialog } from '../../../services/dialog.service';

@Component({
  selector: 'app-dialog-simple',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './dialog-simple.component.html',
  styleUrl: './dialog-simple.component.scss',
})
export class DialogSimpleComponent {
  readonly dialogRef = inject(MatDialogRef<DialogSimpleComponent>);

  protected title: string = '';
  protected message: string = '';
  protected labelButton1: string = '';
  protected labelButton2: string = '';

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    readonly configData: ConfigDataDialog
  ) {}

  ngOnInit(): void {
    this.title = this.configData.title ? this.configData.title : 'Atenção!';
    this.message = this.configData.message
      ? this.configData.message
      : 'Atenção!';
    this.labelButton1 = this.configData.labelButton1
      ? this.configData.labelButton1
      : 'Fechar';
    this.labelButton2 = this.configData.labelButton2
      ? this.configData.labelButton2
      : '';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
