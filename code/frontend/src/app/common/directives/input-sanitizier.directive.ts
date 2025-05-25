import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputSanitizer]',
})
export class InputSanitizerDirective {
  constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value;
    const sanitizedValue = this.sanitize(originalValue);

    // Só atualiza se for diferente
    if (originalValue !== sanitizedValue) {
      input.value = sanitizedValue;
      input.dispatchEvent(new Event('input')); // Atualiza ngModel ou formControl
    }
  }

  private sanitize(value: string): string {
    // normalize('NFD'): separa caracteres acentuados em letras + acento;
    // replace(/[\u0300-\u036f]/g, ''): remove os acentos;
    const noAccents = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // replace(/[^a-zA-Z0-9\s]/g, ''): remove caracteres especiais e deixa só letras e números
    const onlyAlphanumeric = noAccents.replace(/[^a-zA-Z0-9\s]/g, '');

    // Transforma em maiúsculas
    return onlyAlphanumeric.toUpperCase();
  }
}
