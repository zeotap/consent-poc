import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean;

  constructor(public router: Router, public oktaAuthService: OktaAuthService) {
    this.oktaAuthService.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuthService.signOut();
    this.router.navigateByUrl('/');
  }
}
