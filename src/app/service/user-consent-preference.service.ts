import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum Status {
  Success = 'Success',
  Error = 'Error',
}

export interface SearchAPIResponse {
  status: Status;
  data: string;
  error?: string;
}
export const isSuccess = (status: Status) => status === Status.Success;
export const isError = (status: Status) => status === Status.Error;

@Injectable()
export class UserConsentPreferenceService {
  constructor() { }

  public search(
    payload: any,
    token: string
  ): Observable<SearchAPIResponse> {
    return of(
      { status: Status.Success, data: 'It Works!' }
    );
  }
}
