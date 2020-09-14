import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private _registerUrl = "https://conduit.productionready.io/api/users";
  private _loginUrl = "https://conduit.productionready.io/api/users/login";

  constructor(private http: HttpClient) { }

  signup(user: User) : Observable<any> {
    console.log(JSON.stringify(user));
    
    const userjson = {
      user
    }
    return this.http.post<any>(this._registerUrl, userjson);
  }

  loginUser(user) : Observable<any>{
    const userjson = {
      user
    }
    return this.http.post<any>(this._loginUrl, userjson);
  }

  logoutUser(){
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isUserLoggedIn() {
    if(localStorage.getItem('token')===null && localStorage.getItem('token')===undefined)
    {
      return false;
    }
    return true;
  }
}

