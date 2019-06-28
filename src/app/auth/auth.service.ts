import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  private tokenExiprationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

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
        catchError(this.handleError),
        tap(response => {
          console.log(response);

          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn || 3600
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
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
        catchError(this.handleError),
        tap(response => {
          console.log(response);
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn || 3600
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExiprationTimer) {
      clearTimeout(this.tokenExiprationTimer);
    }

    this.tokenExiprationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExiprationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
