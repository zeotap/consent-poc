import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLookupComponent } from './containers/lookup/user-lookup.component';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const config = {
  issuer: 'https://zeotap-poc.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  clientId: '0oafjchi7CsX3TgSw416',
  pkce: true,
  scopes: ['openid', 'profile', 'email']
};

@NgModule({
  declarations: [
    AppComponent,
    UserLookupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG, useValue: config
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
