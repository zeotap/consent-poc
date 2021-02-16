import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  widget = new OktaSignIn({
    baseUrl: 'https://zeotap-poc.okta.com',
    logo: 'https://content.zeotap.com/img/Zeotap%20Private%20Channel.png',
    authParams: {
      pkce: true
    },
    clientId: '0oafjchi7CsX3TgSw416',
    redirectUri: `${window.location.origin}/user-lookup`
  });

  constructor(public oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {

    this.widget.showSignInToGetTokens({el: '#okta-signin-container'}).then(tokens => {
      this.widget.remove();

      this.oktaAuthService.handleLoginRedirect(tokens);
    }).catch(err => {
      throw err;
    });
  }

}
