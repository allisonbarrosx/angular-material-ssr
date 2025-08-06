import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { enableAkitaProdMode } from '@datorama/akita';
import { environment } from './environments/environment';

if (environment.production) {
  enableAkitaProdMode();
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
