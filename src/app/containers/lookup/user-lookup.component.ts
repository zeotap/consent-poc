import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-lookup',
  templateUrl: './user-lookup.component.html',
  styleUrls: ['./user-lookup.component.scss']
})
export class UserLookupComponent implements OnInit {
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
    console.warn(this.consentPreferenceForm.value);
    this.consentPreferenceForm.reset();
  }
}
