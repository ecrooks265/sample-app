import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap, throwError } from 'rxjs';
import { SecurityService } from '../services/security/security.service';
import { AppUserAuth } from '../interfaces/security/app-user-auth';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let securityService = inject(SecurityService);
  let securityObject: AppUserAuth = securityService.securityObject;

  if( securityObject.isAuthenticated ) {
    //check access token expiration
    let rightNow = new Date();
    if( !securityService.isRefreshing && securityObject.expiration < rightNow ){
      //use refresh token to get new access token
      securityService.isRefreshing = true;
      return securityService.refreshToken().pipe(
        switchMap((resp) => {
          securityService.isRefreshing = false;
          if( resp && resp.accessToken ){
            //reauth request
            let reqAuth = securityService.addAuth( req );
            return next(reqAuth);
          } else {
            securityService.logout();
            return throwError(() => 'reauthentication failed.');
          }
        })
      );
    } else {
      //continue with current access token
      const authReq = securityService.addAuth(req);
      return next(authReq);
    }

  } else {
    return next(req);
  }
};
