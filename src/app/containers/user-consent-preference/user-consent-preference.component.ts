import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-consent-preference',
  templateUrl: './user-consent-preference.component.html',
  styleUrls: ['./user-consent-preference.component.scss']
})
export class UserConsentPreferenceComponent implements OnInit {
  consentPreferenceForm = new FormGroup({
    firstPartyId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(public oktaAuthService: OktaAuthService) { }

  async ngOnInit() {
    if (await this.oktaAuthService.isAuthenticated()) {
      console.log('UserClaim:', await this.oktaAuthService.getUser());
    }
  }

  onSubmit() {
    console.log(this.consentPreferenceForm.value);
    this.consentPreferenceForm.reset();
  }
}
