import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'
import { DataEngineerSalaryComponent } from './feature/data-engineer-salary/data-engineer-salary.component';

export const routes: Routes = [
  { path: "", loadComponent: () => import('./core/home/home.component').then(m => m.HomeComponent) },
  { path: "account", loadChildren: () => import("./feature/account/account.component").then(m => m.account_routes) },
  { path: 'data', loadChildren: () => import('./feature/data-engineer-salary/data-engineer-salary.component').then(m => m.data_routes), canActivate: [authGuard] }

];
