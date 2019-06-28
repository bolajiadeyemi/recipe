import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

const API_KEY = "AIzaSyDfkpuKQNTuZTcY0K0uNApLwM7yxR56qWc";

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
  providedIn: "root"
})
export class AuthService {
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
        catchError(errorRes => {
          let errorMessage = "An error occurred!!";

          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage =
                "The email address is already in use by another account.";
              break;
            case "OPERATION_NOT_ALLOWED":
              errorMessage = "Password sign-in is disabled for this project.";
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              errorMessage =
                "We have blocked all requests from this device due to unusual activity. Try again later.";
              break;
            default:
              errorMessage = "An error occurred!!";
          }

          return throwError(errorMessage);
        })
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
      .pipe(catchError(errRes => {}));
  }
}
