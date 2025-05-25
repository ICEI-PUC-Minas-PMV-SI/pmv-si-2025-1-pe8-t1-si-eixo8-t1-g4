import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSimpleComponent } from '../components/dialog/dialog-simple/dialog-simple.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly router = inject(Router);

  constructor(private readonly dialog: MatDialog) {}

  openDialogComponent<T, D = any, R = any>(
    component: ComponentType<T>,
    dialogConfig?: MatDialogConfig
  ): MatDialogRef<T, R> {
    return this.dialog.open(
      component,
      dialogConfig ? dialogConfig : this.getDefaultConfig()
    );
  }

  openDialogSimple(configDataDialog: ConfigDataDialog): MatDialogRef<any> {
    let dialogDefaultConfig = this.getDefaultConfig();
    if (configDataDialog.width) {
      dialogDefaultConfig.width = configDataDialog.width;
    }

    dialogDefaultConfig.data = configDataDialog;

    return this.dialog.open(DialogSimpleComponent, dialogDefaultConfig);
  }

  openDialogSuccess(message: string): MatDialogRef<any> {
    let configDataDialog: ConfigDataDialog = {
      title: 'Sucesso!',
      message: `${message}`,
      labelButton1: 'Ok',
    };

    return this.openDialogSimple(configDataDialog);
  }

  openDialogWarning(message: string): MatDialogRef<any> {
    let configDataDialog: ConfigDataDialog = {
      title: 'Atenção!',
      message: `${message}`,
      labelButton1: 'Ok',
    };

    return this.openDialogSimple(configDataDialog);
  }

  private getDefaultConfig(): MatDialogConfig {
    let dialogConfigDefault: MatDialogConfig = new MatDialogConfig();
    dialogConfigDefault.disableClose = true;
    dialogConfigDefault.width = '50%';
    dialogConfigDefault.panelClass = '';
    dialogConfigDefault.data = null;

    return dialogConfigDefault;
  }
}

export interface ConfigDataDialog {
  title: string;
  message: string;
  width?: string;
  labelButton1: string;
  labelButton2?: string;
}
