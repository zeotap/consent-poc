import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  userId: string;
  constructor(public oktaAuthService: OktaAuthService, private route: ActivatedRoute) { }
  ngOnInit() {
   this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.login();
  }

  ngOnChanges(): void {
    this.login();
  }

  login() {
    this.oktaAuthService.signInWithRedirect({loginHint: this.userId});
  }

}
