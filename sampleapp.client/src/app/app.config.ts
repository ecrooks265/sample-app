import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import { APP_ID, ApplicationConfig, enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from "src/environments/environment.development";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingInterceptor } from "./core/interceptors/loading.interceptor";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
     AuthInterceptor
    ])),
    { provide: APP_ID, useValue: 'ng-cli-universal' },
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
