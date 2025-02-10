import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './component/user/user.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {userReducer} from './store/user/user.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {UnauthorizedComponent} from './component/shared/unauthorized/unauthorized.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    NavbarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    StoreModule.forRoot({ user: userReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
