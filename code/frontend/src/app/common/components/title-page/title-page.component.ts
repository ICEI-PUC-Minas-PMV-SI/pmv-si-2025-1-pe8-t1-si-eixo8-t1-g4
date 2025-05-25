import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-title-page',
  imports: [MatButtonModule, NgClass],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.scss',
})
export class TitlePageComponent {
  @Input() title: string = '';
  @Input() subtitle?: string = '';
  @Input() buttons?: Array<ButtonTitlePage> = [];

  @Output() buttonSaveEvent = new EventEmitter();
  @Output() buttonRedirectEvent = new EventEmitter();

  protected executeButtonAction(button: ButtonTitlePage) {
    switch (button.action) {
      case ButtonAction.SAVE:
        this.buttonSaveEvent.emit();
        break;

      case ButtonAction.REDIRECT:
        this.buttonRedirectEvent.emit(button.route);
        break;
    }
  }
}

export interface ButtonTitlePage {
  name: string;
  action: ButtonAction;
  primary: boolean;
  disabled: boolean;
  route?: string;
}

export enum ButtonAction {
  SAVE,
  REDIRECT,
}
