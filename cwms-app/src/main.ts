import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { CwtaskListComponent } from './app/cwtask-list/cwtask-list.component';
import { CreateCwtaskComponent } from './app/create-cwtask/create-cwtask.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));




