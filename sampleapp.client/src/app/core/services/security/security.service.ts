import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first, tap } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { AppUserAuth } from '../../interfaces/security/app-user-auth';
import { UserAuthBase } from '../../interfaces/security/user-auth-base';
import { LoginResp } from '../../models/account-response-models';
import { LoginRequest } from '../../models/account-request-models';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements OnInit{
  securityObject: AppUserAuth = new AppUserAuth();
  isRefreshing: boolean = false;
  authKey = env.authKey.toString() // name of key from environments. References key that auth is stored in local storage
  
  /* ---- Constructor ---- */
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.getAuth();
   }
  ngOnInit(): void {
  }
  /* ---- API Calls ---- */
  login(entity: LoginRequest): Observable<LoginResp> {
    return this._http.post<LoginResp>(env.baseUrl + env.loginUrl,
      entity).pipe(
        tap((resp: LoginResp) => {
          //collect response from call and assign to security object
          this.securityObject.isAuthenticated = true;
          this.securityObject.accessToken = resp.accessToken;
          this.securityObject.refreshToken = resp.refreshToken;
          this.securityObject.userName = entity.email;
          this.securityObject.expiration = this.setExpiration(resp.expiresIn);

          this.storeAuth();
        }),
      );
  }

  logout() {
    this.securityObject.init(); // reset security object
    localStorage.removeItem(this.authKey); //remove auth obj from local storage
    return;
  }

  //register new user
  register(entity: LoginRequest) {
    return this._http.post<LoginResp>(env.baseUrl + env.registerUrl, entity);
  }

  //forgot password - to send email code
  forgotPwd(email: object) {
    return this._http.post<object>(env.baseUrl + env.forgotPwdUrl, email);
  }

  //reset password using code sent in email from forgotPwd email
  resetPwd(resetForm: object) {
    return this._http.post<object>(env.baseUrl + env.resetPwdUrl, resetForm);
  }

  refreshToken() {
    let refreshObject = {
      refreshToken: this.securityObject.refreshToken
    }
    return this._http.post<LoginResp>(env.baseUrl + env.refreshUrl, refreshObject)
      .pipe(
        tap((resp: LoginResp) => {
          if (resp && resp.accessToken) {
            this.securityObject.isAuthenticated = true;
            this.securityObject.accessToken = resp.accessToken;
            this.securityObject.refreshToken = resp.refreshToken;
            this.securityObject.expiration = this.setExpiration(resp.expiresIn);
            this.storeAuth();
          }
        })
      )
  }
  /* ---- Helper Functions ---- */
  storeAuth() {
    let localS = new UserAuthBase();
    localS.userName = this.securityObject.userName,
      localS.refreshToken = this.securityObject.refreshToken,
      localS.isAuthenticated = this.securityObject.isAuthenticated,

      localStorage.setItem(this.authKey, JSON.stringify(localS));
  }
  getAuth() {
    
    const storedAuth = localStorage.getItem("Auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      this.securityObject.accessToken = parsedAuth.accessToken;
      this.securityObject.refreshToken = parsedAuth.refreshToken;
      this.securityObject.isAuthenticated = parsedAuth.isAuthenticated;
      this.securityObject.userName = parsedAuth.userName;
    }
    console.log(this.securityObject + " : ")
  }
  setExpiration(expiresIn: number): Date {
    //expiration used by refresh token to determine when to request new token set
    let date = new Date();
    date.setSeconds(date.getSeconds() + expiresIn);

    return date;
  }
  // used by auth interceptor
  addAuth( request: HttpRequest<any> ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.securityObject.accessToken}`
      }
    })
  }
  
}
