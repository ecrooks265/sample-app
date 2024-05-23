import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { CommonModule } from '@angular/common';
import { AppUserAuth } from 'src/app/core/interfaces/security/app-user-auth';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { AppUser } from 'src/app/core/interfaces/security/app-user';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  securityObject!: AppUserAuth; //user info resides here

  constructor(
    private _securityService: SecurityService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.securityObject = this._securityService.securityObject;
    
  }
  logout(): void {
    this._securityService.logout();
    this._router.navigateByUrl('');
  }

}

/* ---- Account Routes ---- */
export const account_routes: Routes = [
  { path: "", component: AccountComponent, canActivate: [authGuard] },
  { path: "login", loadComponent: () => import("./security/login/login.component").then(p => p.LoginComponent) },
  { path: "register", loadComponent: () => import("./security/register/register.component").then(p => p.RegisterComponent) },
  { path: "logout", loadComponent: () => import("./security/logout/logout.component").then(p => p.LogoutComponent) },
  { path: "forgot", loadComponent: () => import("./security/forgot-password/forgot-password.component").then(p => p.ForgotPasswordComponent) },
  { path: "change-password", loadComponent: () => import("./security/change-password/change-password.component").then(p => p.ChangePasswordComponent) },
  { path: "confirm-email", loadComponent: () => import("./security/confirm-email/confirm-email.component").then(p => p.ConfirmEmailComponent) },
]
