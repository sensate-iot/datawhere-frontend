import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function main() {
  if(environment.production) {
    enableProdMode();
    console.debug = function () { }
  }

  console.debug(`Path name : ${window.location.pathname}`);

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

main().then(() => {});
