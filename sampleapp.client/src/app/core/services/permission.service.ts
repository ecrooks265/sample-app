import { Injectable } from '@angular/core';
import { AppUserAuth } from '../interfaces/security/app-user-auth';
import { SecurityService } from './security/security.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  securityObject!: AppUserAuth;

  constructor(
    private _securityService: SecurityService
  ){
    this.securityObject = this._securityService.securityObject;
  }

  canActivate(){
    return of(this.securityObject.isAuthenticated);
  }
}