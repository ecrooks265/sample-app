import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { PermissionService } from '../services/permission.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  return inject(PermissionService).canActivate().pipe(
    tap((value) => {
      return !value ? router.navigate(['/account/login']) : true;
    })
  );
  
};
