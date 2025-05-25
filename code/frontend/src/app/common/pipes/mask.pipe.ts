import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask',
})
export class MaskPipe implements PipeTransform {
  transform(value: string, tipo: string): string {
    if (!value) return value;

    value = value.replace(/\D/g, ''); // Remove tudo que não é número

    switch (tipo) {
      case 'cpf':
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      case 'cep':
        return value.replace(/(\d{5})(\d{3})/, '$1-$2');
      case 'celular':
        return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      default:
        return value; // Sem formatação caso o tipo não seja reconhecido
    }
  }
}
