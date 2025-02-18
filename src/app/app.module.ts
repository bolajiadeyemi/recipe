import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule {}

/*

Alternative Lazy Loading Syntax
If you're using Angular 8+, you can use an alternative syntax for specifying lazy-loaded routes:

Instead of

const routes: Routes = [{
  path: 'your-path',
  loadChildren: './your-module-path/module-name.module#ModuleName'
}];
you can use

const routes: Routes = [{
  path: 'your-path',
  loadChildren: () => import('./your-module-path/module-name.module').then(m => m.ModuleName)
}];
Please note, that you need to ensure that in your tsconfig.json file, you use

"module": "esnext",
instead of

"module": "es2015",
Why would you use this syntax? In the future, it'll replace the "string-only" approach (i.e. the first alternative mentioned here). It also will give you better IDE support.

*/
