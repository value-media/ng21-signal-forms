import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideSignalFormsConfig({
        classes: NG_STATUS_CLASSES
    })
  ]
};

/*
provideSignalFormsConfig({
    classes: {
        ...,
        'app-touched': s => s.touched(),
        'app-untouched': s => !s.touched(),
        'app-dirty': s => s.dirty(),
        'app-pristine': s => !s.dirty(),
        'app-valid': s => s.valid(),
        'app-invalid': s => s.invalid(),
        'app-pending': s => s.pending()
    }
})
*/