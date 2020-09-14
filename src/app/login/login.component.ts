import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../blog.css']
})
export class LoginComponent implements OnInit {

  loginUserData = new User();

  constructor(private _auth: AuthService,
    private _router: Router) { }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.user.token)
        this._router.navigate(['/home'])
      },
      err => console.log(err)
    ) 
  }

  ngOnInit(): void {
  }

}
