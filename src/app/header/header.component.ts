import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../blog.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this._auth.logoutUser();
  }

  get isUserLoggedIn(): boolean {
    return this._auth.isUserLoggedIn();
  }

}
