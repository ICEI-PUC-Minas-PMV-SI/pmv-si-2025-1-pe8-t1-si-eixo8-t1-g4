import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../common/services/util.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly utilService = inject(UtilService);
  private readonly homeService = inject(HomeService);

  ngOnInit() {
    this.homeService.emitirEventoAlertas('');
  }
}
