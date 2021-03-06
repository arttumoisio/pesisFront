import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmr, BootstrapModuleFn as Bootstrap, WebpackModule } from '@ngxs/hmr-plugin';

declare const module: WebpackModule;

if (environment.production) {
  enableProdMode();
}

const bootstrap: Bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmr(module, bootstrap).catch(e => console.log(e));
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}