import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent {
  constructor(public oktaAuthService: OktaAuthService, private router: Router) {
    this.oktaAuthService.closeSession().then(() => this.router.navigateByUrl('login'));
   }
}
