import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment.dev';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr'; // ✅ import this

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),

    // ✅ HTTP support (required for API calls)
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ Required for toastr animations
    provideAnimations(),

    // ✅ Registers ToastConfig (fixes the "No provider for ToastConfig!" error)
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing', // nice animation
      newestOnTop: true,
      preventDuplicates: true,
      enableHtml: true, // allows HTML formatting
    }),
  ],
}).catch((err) => console.error(err));
