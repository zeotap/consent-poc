import { path } from 'ramda';
import { UserConsentPreferenceService, SearchAPIResponse, isSuccess, isError, BaseAPIResponse } from './../../service/user-consent-preference.service';
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, from, Subject, merge } from 'rxjs';
import {
  filter,
  map,
  share,
  takeUntil,
  tap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

@Component({
  selector: 'app-user-consent-preference',
  templateUrl: './user-consent-preference.component.html',
  styleUrls: ['./user-consent-preference.component.scss']
})
export class UserConsentPreferenceComponent implements OnInit {
  displayedColumns: string[] = ['regulation', 'purpose', 'value', 'ttl', 'updatedTs'];
  searchResult$: Observable<any>;
  error$: Observable<string>;
  consentPreferenceForm = new FormGroup({
    firstPartyId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });
  showConsentPreference$ = new BehaviorSubject<boolean>(false);
  userDetails$: Observable<{ name: string }>;
  unsubscribe$ = new Subject();
  onSubmit$ = new Subject<boolean>();
  userOrg$: Observable<string>;

  constructor(public oktaAuthService: OktaAuthService, private userConsentPreferenceService: UserConsentPreferenceService) { }

  async ngOnInit() {
    const userInfo$ = this.userConsentPreferenceService.getDetails(this.oktaAuthService.getIdToken()).pipe(share());

    if (await this.oktaAuthService.isAuthenticated()) {
      this.userDetails$ = from(this.oktaAuthService.getUser()).pipe(
        map((res) => ({ name: res.name }))
      )
    }
    this.userOrg$ = userInfo$
      .pipe(
        filter((res) => isSuccess(res.status)),
        map((usrInfo) => path(['user', 'org_info', 'name'], usrInfo.data)),
        tap(() => this.showConsentPreference$.next(true))
      );

    const searchResponse$ = this.onSubmit$.pipe(
      switchMap(_ => this.userConsentPreferenceService.search(this.consentPreferenceForm.value, this.oktaAuthService.getIdToken()).pipe(share()))
    )
    this.searchResult$ = searchResponse$.pipe(
      filter((res) => isSuccess(res.status)),
      map((res: BaseAPIResponse) => res.data)
    );

    this.error$ = merge(
      searchResponse$.pipe(
        filter((res) => isError(res.status)),
        map((res: BaseAPIResponse) => res.error)
      ),
      userInfo$.pipe(
        filter((res) => isError(res.status)),
        map((res: BaseAPIResponse) => res.error))
    )
  }

  onSubmit(): void {
    this.consentPreferenceForm.reset();
    this.onSubmit$.next(true);
  }
}
