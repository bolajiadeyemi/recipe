import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthtResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AuthtResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.loginUser(
        form.value.email,
        form.value.password
      );
    } else {
      authObs = this.authService.createUser(
        form.value.email,
        form.value.password
      );
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
    form.reset();
  }
}
