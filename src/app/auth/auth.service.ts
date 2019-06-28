import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

const API_KEY = 'AIzaSyDfkpuKQNTuZTcY0K0uNApLwM7yxR56qWc';

export interface AuthtResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    return this.http
      .post<AuthtResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
        {
          email,
          password,
          returnSecuredToken: true
        }
      )
      .pipe(
        tap(response => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthtResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecuredToken: true
        }
      )
      .pipe(
        tap(response => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  private handleAuthentication(
    email: string,
    id,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'An error occurred!!';

    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      default:
        errorMessage = 'An error occurred!!';
    }

    return throwError(errorMessage);
  }
}
