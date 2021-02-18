import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

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
  constructor(public http: HttpClient) { }
  handleError<T extends SearchAPIResponse>(error: HttpErrorResponse): T {
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
  ): Observable<SearchAPIResponse> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        `Bearer ${token}`
      );
    return this.http.get(`https://unity-qa.zeotap.com/zeosphere/api/v2/countries`, { headers }).pipe(
      map((res: any) => ({
        status: Status.Success,
        data: 'It Works!'
      })
      ),
      catchError((err: HttpErrorResponse) =>
        of(this.handleError<SearchAPIResponse>(err))
      )
    );
  }
}
