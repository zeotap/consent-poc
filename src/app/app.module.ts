import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserConsentPreferenceComponent } from './containers/user-consent-preference/user-consent-preference.component';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserConsentPreferenceService } from './service/user-consent-preference.service';

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
    UserConsentPreferenceComponent,
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
    },
    UserConsentPreferenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
