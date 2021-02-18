import { UserConsentPreferenceService, SearchAPIResponse, isSuccess, isError } from './../../service/user-consent-preference.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  share,
} from 'rxjs/operators';

@Component({
  selector: 'app-user-consent-preference',
  templateUrl: './user-consent-preference.component.html',
  styleUrls: ['./user-consent-preference.component.scss']
})
export class UserConsentPreferenceComponent implements OnInit {
  searchResult$: Observable<string>;
  error$: Observable<string>;
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
    const searchResponse$ = this.userConsentPreferenceService.search(this.consentPreferenceForm.value, this.oktaAuthService.getIdToken()).pipe(share());
    this.searchResult$ = searchResponse$.pipe(
      filter((res) => isSuccess(res.status)),
      map((res: SearchAPIResponse) => res.data)
    );
    this.error$ = searchResponse$.pipe(
      filter((res) => isError(res.status)),
      map((res: SearchAPIResponse) => res.error)
    );
  }
}
