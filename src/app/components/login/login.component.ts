import { Component, OnChanges, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  // widget = new OktaSignIn({
  //   baseUrl: 'https://zeotap-poc.okta.com',
  //   logo: 'https://content.zeotap.com/img/Zeotap%20Private%20Channel.png',
  //   authParams: {
  //     pkce: true
  //   },
  //   clientId: '0oaf0gkkrJhBDSiWT416',
  //   redirectUri: `${window.location.origin}/user-consent-preference`
  // });

  constructor(public oktaAuthService: OktaAuthService) { }
  ngOnInit() {
    this.login();
  }

  ngOnChanges(): void {
    this.login();
    // this.widget.showSignInToGetTokens({el: '#okta-signin-container'}).then(tokens => {
    //   this.widget.remove();

      // this.oktaAuthService.handleLoginRedirect(tokens);
    // }).catch(err => {
    //   throw err;
    // });
  }

  login() {
    this.oktaAuthService.signInWithRedirect({loginHint: window.document.location.search.replace(/^(.)|(.)$/g,'')});
  }

}
