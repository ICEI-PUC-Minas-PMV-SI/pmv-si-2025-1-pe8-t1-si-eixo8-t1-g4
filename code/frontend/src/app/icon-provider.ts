import { inject, provideEnvironmentInitializer, EnvironmentProviders } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function provideCustomIcons(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    const icons = [
      { name: 'whatsapp', path: 'assets/icons/whatsapp.svg' },
    ];

    icons.forEach(icon => {
      iconRegistry.addSvgIcon(
        icon.name,
        sanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  });
}
