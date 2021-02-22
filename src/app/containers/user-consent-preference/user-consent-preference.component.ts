import { UserConsentPreferenceService, SearchAPIResponse, isSuccess, isError, BaseAPIResponse } from './../../service/user-consent-preference.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  filter,
  map,
  share,
  tap,
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
  showConsentPreference$ = new BehaviorSubject<boolean>(false);
  userDetails$: Observable<{
    name: string;
    orgName: string;
  }>;

  constructor(public oktaAuthService: OktaAuthService, private userConsentPreferenceService: UserConsentPreferenceService) { }

  async ngOnInit() {
    if (await this.oktaAuthService.isAuthenticated()) {
      console.log('UserClaim:', await this.oktaAuthService.getUser());
    }

    this.userDetails$ = this.userConsentPreferenceService.getDetails(this.oktaAuthService.getIdToken())
    .pipe(
      map((res: BaseAPIResponse) => ({
        name: res.data.user.user_info.first_name,
        orgName: res.data.user.org_info.display_name
      })),
      tap(() => this.showConsentPreference$.next(true))
    );
  }

  onSubmit(): void {
    this.consentPreferenceForm.reset();
    const searchResponse$ =
      this.userConsentPreferenceService.search(this.consentPreferenceForm.value, this.oktaAuthService.getIdToken()).pipe(share());
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
