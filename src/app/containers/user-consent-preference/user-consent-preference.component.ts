import { UserConsentPreferenceService, SearchAPIResponse, isSuccess } from './../../service/user-consent-preference.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  filter,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'app-user-consent-preference',
  templateUrl: './user-consent-preference.component.html',
  styleUrls: ['./user-consent-preference.component.scss']
})
export class UserConsentPreferenceComponent implements OnInit {
  searchResult$: Observable<string>
  consentPreferenceForm = new FormGroup({
    firstPartyId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(public oktaAuthService: OktaAuthService, private userConsentPreferenceService: UserConsentPreferenceService) { }

  async ngOnInit() {
    if (await this.oktaAuthService.isAuthenticated()) {
      console.log('UserClaim:', await this.oktaAuthService.getUser());
    }
  }

  onSubmit() {
    this.consentPreferenceForm.reset();
    const searchResponse$ = this.userConsentPreferenceService.search(this.consentPreferenceForm.value, this.oktaAuthService.getIdToken());
    this.searchResult$ = searchResponse$.pipe(
      filter((res) => isSuccess(res.status)),
      map((res: SearchAPIResponse) => res.data)
    );
  }
}
