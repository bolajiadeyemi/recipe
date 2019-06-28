import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe';
  active = 'recipe';
  constructor(private autService: AuthService) {}
  ngOnInit(): void {
    this.autService.autoLogin();
    //this.autService.autoLogout(this.);
  }
}
