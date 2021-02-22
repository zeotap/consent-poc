import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export enum Status {
  Success = 'Success',
  Error = 'Error',
}

export interface BaseAPIResponse {
  status: Status;
  data: any;
  error?: string;
}

export interface SearchAPIResponse extends BaseAPIResponse {
  data: string;
}

export const isSuccess = (status: Status) => status === Status.Success;
export const isError = (status: Status) => status === Status.Error;

const searchResponse = {
  ids: [
    {
      type: 'ucid',
      value: '<ucid1>',
      ttl: 180,
      updatedTs: 1612942279
    },
    {
      type: 'Google',
      value: '<gc1>',
      ttl: 180,
      updatedTs: 1612942279
    }
  ],
  profile: {
    gender: 'male',
    age: '15',
    customerType: 'prepaid',
    updatedTs: 1612942279
  },
  consents: [
    {
      regulation: 'gdpr',
      purpose: 'Advertising',
      value: 'yes',
      ttl: 750,
      updatedTs: 1612942279
    },
    {
      regulation: 'gdpr',
      purpose: 'marketing',
      value: 'no',
      ttl: 750,
      updatedTs: 1612942279
    }
  ],
  mktPreferences: [
    {
      preference: 'email',
      value: 'yes',
      ttl: 780,
      updatedTs: 1612942279
    },
    {
      preference: 'messaging',
      value: 'no',
      ttl: 780,
      updatedTs: 1612942279
    }
  ]
};

@Injectable()
export class UserConsentPreferenceService {
  constructor(public http: HttpClient) { }
  handleError<T extends BaseAPIResponse>(error: HttpErrorResponse): T {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      switch (error.status) {
        case 400:
        case 401:
        case 403: {
          return {
            status: Status.Error,
            error: error.error.error,
          } as T;
        }
      }
    }
    return {
      status: Status.Error,
      error: 'Something bad happened; please try again later.',
    } as T;
  }

  public search(
    payload: any,
    token: string
  ): Observable<BaseAPIResponse> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        `Bearer ${token}`
      );
    // return this.http.get(`https://unity-qa.zeotap.com/zeosphere/api/v2/countries`, { headers })
    return of([])
    .pipe(
      map((res: any) => ({
        status: Status.Success,
        data: searchResponse
      })
      ),
      catchError((err: HttpErrorResponse) =>
        of(this.handleError<BaseAPIResponse>(err))
      )
    );
  }

  public getDetails(idToken: string): Observable<BaseAPIResponse> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        `Bearer ${idToken}`
      );

    return this.http.get(`${environment.userServiceUrl}login/`, { headers }).pipe(
      map((res: any) => ({
        status: Status.Success,
        data: res
      })),
      catchError((err: HttpErrorResponse) =>
        of(this.handleError<BaseAPIResponse>(err))
      )
    );
  }
}
