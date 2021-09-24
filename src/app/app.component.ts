import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.isUserData.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  
}
