import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceMask',
})
export class PriceMaskPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
}
