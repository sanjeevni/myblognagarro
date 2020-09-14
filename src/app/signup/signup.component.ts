import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../blog.css']
})
export class SignupComponent implements OnInit {

  signupUserData: User=new User();

  constructor(private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {
  }
 
  registerUser()
  {
    // this.signupUserData.token=this._auth.getToken();
    // this.signupUserData.bio="I work at statefarm";
    // this.signupUserData.image=null;

    console.log(this.signupUserData);
    this._auth.signup(this.signupUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/login'])
          console.log(res)
         
        },
        err => console.log(err)
      );
  }

}
