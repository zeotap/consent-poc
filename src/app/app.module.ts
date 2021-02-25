import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserConsentPreferenceComponent } from './containers/user-consent-preference/user-consent-preference.component';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserConsentPreferenceService } from './service/user-consent-preference.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config = {
  issuer: 'https://zeotap-poc.okta.com/oauth2/default',
  redirectUri: `${window.location.origin}/callback`,
  clientId: '0oaf0gkkrJhBDSiWT416',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserConsentPreferenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    OktaAuthModule
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
