import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CwtaskListComponent } from './cwtask-list/cwtask-list.component';
import { CreateCwtaskComponent } from './create-cwtask/create-cwtask.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideHttpClient(),
    provideRouter([
      { path: '', component: CwtaskListComponent },
      { path: 'create-cwtask', component: CreateCwtaskComponent },
      // add other routes here if needed
    ]),
  ]
};
